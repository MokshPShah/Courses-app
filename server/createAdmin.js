const mongoose = require('mongoose')
const Admin = require('./models/admin')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashed = await bcrypt.hash('Moksh9)8(7+', 10) // you can change the password
  await Admin.create({ username: 'Moksh', password: hashed })
  console.log('✅ Admin created')
  process.exit()
})
