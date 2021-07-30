
export const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.tipoUsuario === 'admin') {
      next()
    } else {
      res.redirect('/')
    }
  } else {
    res.redirect('/login')
  }
}
