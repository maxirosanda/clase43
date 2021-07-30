import * as ProductosController from '../controllers/productosController.js'
import * as CarritoController from '../controllers/carritoController.js'
import * as PedidoController from '../controllers/pedidoController.js'
import * as MensajesController from '../controllers/mensajesController.js'
import * as middlewareEditor from '../middlewares/middlewareEditor.js'
import * as middlewareComprador from '../middlewares/middlewareComprador.js'
import * as sessionController from '../controllers/sessionController.js'
import passport from 'passport'
import BaseDeDatos from '../services/singleton.js'

export const ecommerceRoutes = app => {
  app.get('/base/:base', (req, res) => { res.send(new BaseDeDatos(req.params.base)) })
  app.get('/logout', sessionController.logout)
  app.get('/failLogin', (req, res) => { res.send('falla al logear') })
  app.get('/failRegister', (req, res) => { res.send('falla al registrar') })
  app.post('/login', passport.authenticate('login', { failureRedirect: 'failLogin' }), sessionController.login)
  app.post('/register', passport.authenticate('register', { failureRedirect: 'failRegister' }), sessionController.register)
  app.get('/facebook', passport.authenticate('facebook'))
  app.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/agregar', failureRedirect: '/login' }))
  app.get('/activo', middlewareEditor.auth, sessionController.activo)
  app.get('/datos', middlewareComprador.auth, sessionController.vistadatos)
  app.put('/actdatos', middlewareComprador.auth, sessionController.updateDatos)

  app.get('/agregar', /* middlewareEditor.auth, */ ProductosController.agregar)
  app.get('/', /* middlewareComprador.auth, */ ProductosController.getProductos)
  app.get('/producto/:id', /* middlewareComprador.auth, */ ProductosController.getProducto)
  app.post('/productos', /* middlewareEditor.auth, */ ProductosController.createProductos)
  app.put('/productos/:id', /* middlewareEditor.auth, */ ProductosController.updateProducto)
  app.delete('/productos/:id', /* middlewareEditor.auth, */ ProductosController.deleteProductos)

  app.get('/carrito', middlewareComprador.auth, CarritoController.getCarritos)
  app.post('/carrito', middlewareComprador.auth, CarritoController.createCarrito)
  app.put('/carrito/:id', middlewareComprador.auth, CarritoController.updateCarrito)
  app.delete('/carrito/:id', middlewareComprador.auth, CarritoController.deleteCarrito)
  app.get('/comprar', middlewareComprador.auth, PedidoController.createPedido)
  app.get('/pedidos', /* middlewareComprador.auth, */ PedidoController.getPedidos)
  app.get('/pendientes', PedidoController.getPendientes)
  app.post('/mensajes', /* middlewareComprador.auth, */ MensajesController.createMensajes)
}
