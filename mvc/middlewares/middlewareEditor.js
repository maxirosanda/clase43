export const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.tipoUsuario === 'editor' || req.user.tipoUsuario === 'admin') {
      next()
    } else {
      res.redirect('/')
    }
  } else {
    res.redirect('/')
  }
}
