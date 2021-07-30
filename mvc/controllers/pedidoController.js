import Carrito from '../models/carrito.js'
import Pedido from '../models/pedidos.js'
import logger from 'pino'
const loggerError = logger('./logs/error.log')
const loggerWarn = logger('./logs/warn.log')

export const getPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({ id_comprador: req.user._id }).lean()
    await res.json(pedidos)
  } catch (e) { loggerError.error(e) }
}

export const getPendientes = async (req, res, next) => {
  try {
    const pendientes = await Pedido.find({}).lean()
    loggerWarn.warn(pendientes)
    await res.json(pendientes)
  } catch (e) { loggerError.error(e) }
}

export const createPedido = async (req, res, next) => {
  try {
    const encontrados = await Carrito.find({ id_comprador: req.user._id }).lean()
    if (!(Object.entries(encontrados).length === 0)) {
      let total = 0
      encontrados.forEach(element => {
        total += element.cant_compra * element.precio
      })
      const json = { id_comprador: encontrados[0].id_comprador, id_vendedor: 'no asignado', estado: false, productos: encontrados, datos_comprador: req.user, importe: total }
      const pedido = new Pedido(json)
      await pedido.save()
      await Carrito.deleteMany({ id_comprador: encontrados[0].id_comprador })
      await res.send('pedido en camino')
    } else {
      await res.redirect('/')
    }
  } catch (e) { loggerError.error(e) }
}
