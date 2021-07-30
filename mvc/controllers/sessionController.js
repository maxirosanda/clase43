
import User from '../models/usuarios.js'
import logger from 'pino'

const loggerError = logger('./logs/error.log')

export const vistadatos = (req, res) => {
  const datos = [req.user]
  res.json({ datos: datos })
}

export const updateDatos = async (req, res, next) => {
  const { nombre, mail, direccion, edad, preTel, tel, _id } = req.body
  const nuevodatos = {}
  if (nombre) nuevodatos.nombre = nombre
  if (mail) nuevodatos.mail = mail
  if (direccion) nuevodatos.direccion = direccion
  if (edad) nuevodatos.edad = edad
  if (preTel) nuevodatos.pre_tel = preTel
  if (tel) nuevodatos.tel = tel
  try {
    const datos = await User.findOneAndUpdate(
      { _id: _id },
      { $set: nuevodatos },
      { new: true }
    )
    await res.json(datos)
  } catch (e) { loggerError.error(e) }
}
export const login = (req, res) => {
  res.json(req.user)
}

export const activo = (req, res) => {
  res.json({ activo: req.isAuthenticated() })
}

export const register = (req, res) => {
  res.json(req.user)
}

export const logout = async (req, res) => {
  try {
    const user = await User.find({ username: req.user.username }).lean()
    await req.session.destroy(err => {
      if (err) return err
      res.json(user)
    })
  } catch (e) { loggerError.error(e) }
}
