require('dotenv').config()

import app from './app'

const {
  PORT: port = 3000
} = process.env

app.listen(port, () => {
  console.log('App listening on port', port)
})
