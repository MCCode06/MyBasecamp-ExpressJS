const express = require('express')
const router = express.Router()
const { createUser, getAllUsers, getUser, deleteUser, setAdmin, removeAdmin } = require('../controllers/userController.js')
const auth = require('../middleware/auth.js')
const admin = require('../middleware/admin.js')

router.post('/', createUser)           
router.get('/', auth, admin, getAllUsers)               
router.get('/:id', auth, getUser)                     
router.delete('/:id', auth, admin, deleteUser)        
router.put('/:id/admin', auth, admin, setAdmin)            
router.put('/:id/removeadmin', auth, admin, removeAdmin)      

module.exports = router