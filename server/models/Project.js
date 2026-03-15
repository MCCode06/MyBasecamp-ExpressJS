const prisma = require('../config/prisma.js')

const createProject = async (name, description, owner_id) => {
  return await prisma.project.create({
    data: { name, description, ownerId: parseInt(owner_id) }
  })
}

const getAllProjects = async (owner_id) => {
  return await prisma.project.findMany({
    where: { ownerId: parseInt(owner_id) }
  })
}

const getProjectById = async (id) => {
  return await prisma.project.findUnique({
    where: { id: parseInt(id) }
  })
}

const updateProject = async (id, name, description) => {
  return await prisma.project.update({
    where: { id: parseInt(id) },
    data: { name, description }
  })
}

const deleteProject = async (id) => {
  await prisma.project.delete({
    where: { id: parseInt(id) }
  })
  return true
}

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject }