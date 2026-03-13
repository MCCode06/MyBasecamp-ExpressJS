const admin = (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' })
  }
  next()
}

module.exports = admin
