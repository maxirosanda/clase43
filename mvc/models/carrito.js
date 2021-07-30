import mongoose from 'mongoose'

const carritosCollection = 'carritos'
const carritosSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true },
  codigo: { type: String, require: true },
  url: { type: String, require: true },
  precio: { type: Number, require: true },
  cantCompra: { type: Number, require: true },
  idComprador: { type: String }
})

export default mongoose.model(carritosCollection, carritosSchema)
