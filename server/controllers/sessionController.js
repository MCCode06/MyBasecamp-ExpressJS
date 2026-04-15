const User = require('../models/User.js')
const bcrypt = require('bcrypt')

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findUserByEmail(email)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' })

    req.session.user = user
    delete user.password
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const signOut = async (req, res) => {
  req.session.destroy()
  res.json({ message: "User logged out" })
}

module.exports = { signIn, signOut }