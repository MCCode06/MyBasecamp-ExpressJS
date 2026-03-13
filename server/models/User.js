const prisma = require('../config/prisma.js')

const createUser = async (name, email, password) => {
  return await prisma.user.create({
    data: { name, email, password }
  })
}

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  })
}

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) }
  })
}


const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {id: 'asc'}
  })
}



const deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id: parseInt(id) }
  })
  return true
}

const setAdmin = async (id) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { role: 'admin' }
  })
}

const removeAdmin = async (id) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { role: 'user' }
  })
}

module.exports = { createUser, findUserByEmail, findUserById, getAllUsers, deleteUser, setAdmin, removeAdmin }