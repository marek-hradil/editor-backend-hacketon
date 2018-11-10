import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as bearerToken from 'express-bearer-token'

const app = express()

app.use(cors())
app.use(bearerToken())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! Maxn'
  })
})

export default app
