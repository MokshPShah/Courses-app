const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const admin = await Admin.findOne({ username })
  if (!admin) return res.status(404).json({ message: 'Invalid credentials' })

  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  res.json({ token })
})

module.exports = router
