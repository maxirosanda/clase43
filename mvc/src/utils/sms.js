import twilio from 'twilio'
import logger from 'pino'

const sId = 'AC9a41f30c56970a3e1a2f00b29c54c757'
const authToken = '2c4f146a8f3fe5efabea21a7cee4b576'
const loggerInfo = logger()
const loggerError = logger('./logs/error.log')
const client = twilio(sId, authToken)

export const enviarsms = (text) => {
  client.messages.create({
    body: text,
    from: '+16466811823',
    to: '+541168179706'
  }).then(message => {
    loggerInfo.info(message.accountSid)
  }).catch((err) => {
    loggerError.error('error: ', err)
  })
}
