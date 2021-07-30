import Mensaje from '../models/mensajes.js'
import { enviarsms } from '../utils/sms.js'
import logger from 'pino'
const loggerError = logger('./logs/error.log')

export const createMensajes = async (req, res, next) => {
  try {
    const mensaje = new Mensaje(req.body)
    const posicion = req.body.mensaje.indexOf('@administrador')
    if (posicion !== -1) {
      enviarsms(req.body.mail, req.body.mensaje)
    }
    await mensaje.save()
    await res.redirect('/producto/' + mensaje.articulo)
  } catch (e) { loggerError.error(e) }
}
