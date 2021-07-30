import { productoDTO } from './productoDTO.js';
import fs from 'fs';
import Producto from '../models/productos.js'
import Mensaje from '../models/mensajes.js'

class ProductoDAO {

    constructor() {
        this.archivo = null;
    }
 
    getAll = async () => {
        try {
            const producto = await Producto.find({}).lean()
            return producto
          } catch (e) { 
        loggerError.error(e) }
    };
    
    getByid = async (id) => {
        try {
            const producto = await Producto.find({ _id: id }).lean()
            const mensaje = await Mensaje.find({ articulo: id }).lean()
            return([producto,mensaje])
          } catch (e) { loggerError.error(e) }
    };
    
    insert = async (body) => {
        try {
            let nuevoproducto = productoDTO(body);
            const producto = new Producto(nuevoproducto)
            await producto.save()
          } catch (e) { console.log(e) }
    }


    updateByid = async (id, producto) => {

        const { nombre, descripcion, precio, url, stock } = producto
        const nuevoproducto = {}
        if (nombre) nuevoproducto.nombre = nombre
        if (descripcion) nuevoproducto.descripcion = descripcion
        if (precio) nuevoproducto.precio = precio
        if (stock) nuevoproducto.stock = stock
        if (url) nuevoproducto.url = url
        nuevoproducto.actualizar = this.makeid(20)
        console.log(nombre)
        console.log(nuevoproducto.actualizar)
        try {
          await Producto.findOneAndUpdate(
            { _id: id },
            { $set: nuevoproducto },
            { new: true }
          )

        } catch (e) { loggerError.error(e) }
        
    };
    
    deleteByid = async (id) => { 
        try {
            await Producto.deleteOne({ _id: id })
          } catch (e) { loggerError.error(e) }

    };
    
   
 makeid = (length) => {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}


export default ProductoDAO;