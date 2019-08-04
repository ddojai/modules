import { Router } from 'express'

const router = Router()

router.use('/', require('./controllers/home'))
router.use('/posts', require('./controllers/posts'))

module.exports = router
