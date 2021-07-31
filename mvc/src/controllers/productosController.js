import logger from 'pino'
import ProductoDAO from "../services/productoDAO.js"
const loggerError = logger('./logs/error.log')
const productoDAO = new ProductoDAO();

export const agregar = async (req, res, next) => {
  try {
    const producto = await productoDAO.getAll()
    res.json(producto)
  } catch (e) { loggerError.error(e) }
}

export const getProductos = async (req, res, next) => {
  try {
    const producto = await productoDAO.getAll()
    await res.json({ productos: producto, id_usuario: req.user._id, activo: req.isAuthenticated() })
  } catch (e) { loggerError.error(e) }
}

export const getProducto = async (req, res, next) => {
  const id = req.params.id
  try {
    const respuesta = await productoDAO.getByid(id)
    await res.json({ producto: respuesta[0], mensaje: respuesta[1], id_usuario: req.user._id })
  } catch (e) { loggerError.error(e) }
}

export const createProductos = async (req, res, next) => {
  try {
    const producto = await productoDAO.insert(req.body)
    await res.status(200).send('Producto agregado a la bases de datos')
  } catch (e) { console.log(e) }
}

export const updateProducto = async (req, res, next) => {
 
  try {
    const producto = await productoDAO.updateByid(req.params.id,req.body)
    await res.status(200).send('Producto actualizado en la base de datos')
  } catch (e) { loggerError.error(e) }
}

export const deleteProductos = async (req, res, next) => {
  const producto = await productoDAO.deleteByid(req.params.id)
  try {
    await res.status(200).send('Producto borrado de la base de datos')
  } catch (e) { loggerError.error(e) }
}
