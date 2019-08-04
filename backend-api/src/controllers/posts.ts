import * as _ from 'lodash'
import * as joi from 'joi'
import knex from '../knex'
import { NextFunction, Request, Response, Router } from 'express'
import { error } from '../utils'

const router = Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {

  const schema = joi.object().keys({
    title: joi.string().required(),
    body: joi.string().required(),
    tags: joi.array().items(joi.string()).required()
  })

  const result = joi.validate(req.body, schema)
  if (result.error) {
    next(error(400, result.error.toString()))
    return
  }

  const { title, body, tags } = req.body

  const post: any = {
    title, body, publishedDate: new Date()
  }

  const uniqueTags = [...new Set(tags)]

  try {
    const postIdList = await knex('posts').insert(post)
    post.id = postIdList[0]
    post.tags = uniqueTags

    for (const tag of uniqueTags) {
      const hashTag = await knex('hash_tags').where('title', tag).first()
      let hashTagId
      if (!hashTag) {
        const hashTagIdList = await knex('hash_tags').insert({ title: tag })
        hashTagId = hashTagIdList[0]
      } else {
        hashTagId = hashTag.id
      }
      const postHashTag = {
        postId: post.id, hashTagId
      }
      await knex('post_hash_tags').insert(postHashTag)
    }

    res.json(post)
  } catch (e) {
    next(error(500, e.toString()))
  }
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page || 1, 10)

  if (page < 1) {
    next(error(400, 'invalid page'))
    return
  }

  try {
    // const posts = await new Post().orderBy('id', 'desc').fetchPage({ page: page, pageSize: 10 })
    const paginater = await knex('posts')
      .orderBy('id', 'desc')
      // @ts-ignore
      .paginate(10, page)
    const posts = paginater.data

    const countQueryResult = await knex('posts').count('*').first()
    const postCount = _.get(countQueryResult, 'count(*)', 0)

    // @ts-ignore
    res.set('Last-Page', Math.ceil(postCount / 10))
    res.json(await Promise.all(posts.map(mergeTags)))
  } catch (e) {
    next(error(500, e.toString()))
  }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const post = await knex('posts').where('id', id).first()
    if (!post) {
      next(error(404, `Not found`))
    } else {
      res.json(await mergeTags(post))
    }
  } catch (e) {
    next(error(e.status, e.toString()))
  }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    await knex('posts').del().where('id', id)
    await knex('post_hash_tags').del().where('postId', id)
    res.status(204)
    res.json()
  } catch (e) {
    next(error(500, e.toString()))
  }
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { title, body } = req.body

  try {
    const post = await knex('posts').where('id', id).first()
    if (!post) {
      next(error(404, `Not found`))
    } else {
      if (title) {
        post.title = title
      }
      if (body) {
        post.body = body
      }
      await knex('posts').update(post).where('id', id)
      res.json(post)
    }
  } catch (e) {
    next(error(500, e.toString()))
  }
})

const mergeTags = async (post) => {
  const postHashTags = await knex('post_hash_tags').where('postId', post.id)
  let tags = await Promise.all(postHashTags.map(async postHashTag => {
    const hashTag = await knex('hash_tags').where('id', postHashTag.hashTagId).first()
    return hashTag.title
  }))
  return {
    ...post,
    body: post.body.length < 200 ? post.body
      : `${post.body.slice(0, 200)}...`,
    tags
  }
}

module.exports = router
