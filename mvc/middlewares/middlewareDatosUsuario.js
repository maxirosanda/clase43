export const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.tipoUsuario === 'comprador' || req.user.tipoUsuario === 'admin') {
      next()
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
}
