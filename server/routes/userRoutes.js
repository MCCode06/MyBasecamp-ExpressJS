const express = require('express')
const router = express.Router()
const { createUser, getAllUsers, getUser, deleteUser, setAdmin, removeAdmin } = require('../controllers/userController.js')
const auth = require('../middleware/auth.js')
const admin = require('../middleware/admin.js')
const { body } = require('express-validator')

const registerValidation = [
  body('name')
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be minimum 3 and maximum 20 characters'),

  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches('[0-9]')
    .withMessage('Password must contain at least one number')
    .matches('[a-z]')
    .withMessage('Password must contain at least one letter')
]


router.post('/', registerValidation, createUser)
router.get('/', auth, admin, getAllUsers)               
router.get('/:id', auth, getUser)                     
router.delete('/:id', auth, admin, deleteUser)        
router.put('/:id/admin', auth, admin, setAdmin)            
router.put('/:id/removeadmin', auth, admin, removeAdmin)      

module.exports = router