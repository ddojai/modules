import * as express from 'express'
import { Err } from './interfaces'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./router'))

// cache 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  let err = new Error('Not Found') as Err
  err.status = 404
  next(err)
})

// error handler
app.use(function (err: Err, req: express.Request, res: express.Response, next: express.NextFunction) {
  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    data: err.data
  })
})

export default app
