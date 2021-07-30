 
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
// import path from 'path'
import http from 'http'
import MongoStore from 'connect-mongo'
import morgan from 'morgan'
import methodOverride from 'method-override'
import cluster from 'cluster'
import logger from 'pino'
import { ecommerceRoutes } from './routes/ecommerceRoutes.js'
import { conectarDB } from './config/db.js'
import { ConectarPassport } from './passport/passport.js'
import os from 'os'
import  config from './config/config.js'



const numCpu = os.cpus().length
const app = express()
const server = http.createServer(app)
const loggerInfo = logger()
// const loggerWarn = logger('./logs/warn.log')

const loggerError = logger('./logs/error.log')

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(express.static(path.join(__dirname, 'public')));

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://maxirosanda:dalma123@cluster0.cawk2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    collectionName: 'sessions',
    ttl: 10 * 60
  })
}))
conectarDB()
ConectarPassport()
app.use(passport.initialize())
app.use(passport.session())
ecommerceRoutes(app)

app.disable('x-powered-by')

if (cluster.isMaster && config.MODO === 'CLUSTER') {
  loggerInfo.info(numCpu)
  loggerInfo.info(`process ID: ${process.pid} `)
  for (let i = 0; i < numCpu; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    loggerInfo.info(`Worker, ${worker.process.pid} died ${new Date()}`)
    cluster.fork()
  })
} else {
  const port = config.PORT|| '5000'
  app.set('port', port)
  server.listen(port).on('error', error => {
    loggerError.error(`error en el servidor:${error}`)
  })
  loggerInfo.info('Server listening  on port ' + port + ' pid:' + process.pid)
}
