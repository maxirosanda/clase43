import mongoose from 'mongoose'

const usuariosCollection = 'usuarios'
const usuariosSchema = new mongoose.Schema({

  username: { type: String, require: true },
  password: { type: String, require: true },
  mail: { type: String, require: true },
  nombre: { type: String, require: true },
  direccion: { type: String },
  edad: { type: Number },
  preTel: { type: Number },
  tel: { type: Number },
  foto: { type: String },
  tipoUsuario: { type: String },
  metodo: { type: String, require: true }

})

export default mongoose.model(usuariosCollection, usuariosSchema)
