import Carrito from '../models/carrito.js'
import logger from 'pino'
const loggerError = logger('./logs/error.log')

export const getCarritos = async (req, res, next) => {
  try {
    const carrito = await Carrito.find({ idComprador: req.user._id }).lean()
    await res.json({ productos: carrito })
  } catch (e) { loggerError.error(e) }
}
export const createCarrito = async (req, res, next) => {
  try {
    const encontrado = await Carrito.find({ codigo: req.body.codigo }).lean()
    if (!(Object.entries(encontrado).length === 0)) {
      const user = req.user._id.toString()
      if (encontrado[0].idComprador === user) {
        const nuevoproducto = {}
        nuevoproducto.cantCompra = encontrado[0].cantCompra + parseInt(req.body.cantCompra)
        await Carrito.findOneAndUpdate(
          { _id: encontrado[0]._id },
          { $set: nuevoproducto },
          { new: true }
        )
        await res.redirect('/carrito')
      } else {
        req.body.idComprador = req.user._id
        const carrito = new Carrito(req.body)
        await carrito.save()
        await res.redirect('/carrito')
      }
    } else {
      req.body.idComprador = req.user._id
      const carrito = new Carrito(req.body)
      await carrito.save()
      await res.redirect('/carrito')
    }
  } catch (e) { loggerError.error(e) }
}

export const updateCarrito = async (req, res, next) => {
  const id = req.params.id
  const { nombre, codigo, descripcion, url, precio, cantCompra } = req.body
  const nuevoproducto = {}
  if (nombre) nuevoproducto.nombre = nombre
  if (codigo) nuevoproducto.codigo = codigo
  if (descripcion) nuevoproducto.descripcion = descripcion
  if (url) nuevoproducto.url = url
  if (precio) nuevoproducto.precio = precio
  if (cantCompra) nuevoproducto.cantCompra = cantCompra
  try {
    const carrito = await Carrito.findOneAndUpdate(
      { _id: id },
      { $set: nuevoproducto },
      { new: true }
    )
    await res.status(200).json(carrito)
  } catch (e) { loggerError.error(e) }
}
export const deleteCarrito = async (req, res, next) => {
  const id = req.params.id
  try {
    const carrito = await Carrito.deleteOne({ _id: id })
    await res.json(carrito)
  } catch (e) { loggerError.error(e) }
}
