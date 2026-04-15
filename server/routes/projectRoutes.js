const express = require('express')
const router = express.Router()

const {createProject, getAllProjects, getProject, updateProject, deleteProject} = require('../controllers/projectController')
const auth = require('../middleware/auth.js')
const admin = require('../middleware/admin.js')

router.post('/', auth, createProject)
router.get('/', auth, getAllProjects)
router.get('/:id', auth, getProject)
router.put('/:id', auth, updateProject)
router.delete('/:id', auth, deleteProject)

module.exports = router