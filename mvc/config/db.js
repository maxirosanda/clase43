import mongoose from 'mongoose'
import logger from 'pino'
import  config from './config.js'

const loggerInfo = logger()
const loggerError = logger('./logs/error.log')

export const conectarDB = async () => {
  try {

    await mongoose.connect(config.BASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    loggerInfo.info(`base de datos conectada`)
  } catch (e) {
    loggerError.error(`error ${e}`)
    process.exit(1)
  }
}
