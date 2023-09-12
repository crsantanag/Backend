import express from 'express'
const router = express.Router ()

import { signUp, login, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.controller.js'
import { authRequire } from '../middlewares/auth.middleware.js'

//Le paso la ruta y el controlador

router.post   ('/users', signUp)
router.post   ('/login', login)
router.get    ('/users', getAllUsers)   // No es usual el authRequire ... si son productos, entonces debiera poder verlos
router.get    ('/users/:rut', authRequire, getUser)
router.put    ('/users/:rut', authRequire,updateUser)
router.delete ('/users/:rut', authRequire, deleteUser)

export default router
