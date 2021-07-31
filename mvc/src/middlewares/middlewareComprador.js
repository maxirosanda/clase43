export const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.tipoUsuario === 'comprador' || req.user.tipoUsuario === 'editor' || req.user.tipoUsuario === 'admin') {
      next()
    } else {
      res.send('error usuario no autorizado')
    }
  } else {
    res.send('error usuario no autorizado')
  }
}
