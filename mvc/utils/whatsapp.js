import twilio from 'twilio'
import logger from 'pino'

const sId = 'AC9a41f30c56970a3e1a2f00b29c54c757'
const authToken = '7f4b745c97d5eda7ddde753c03c0df77'
const loggerInfo = logger()
const loggerError = logger('./logs/error.log')
const client = twilio(sId, authToken)

export const enviarws = (usuario, text) => {
  client.messages.create({
    body: `el usuario: ${usuario} te nombro en el mensaje : ${text}`,
    from: 'whatsapp:+16466811823',
    to: 'whatsapp:+541168179706'
  }).then(message => {
    loggerInfo.info(message.accountSid)
  }).catch((err) => {
    loggerError.error('error: ', err)
  })
}
