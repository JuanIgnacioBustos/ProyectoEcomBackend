import { Router } from "express"
import usersController from "../controllers/users.controller.js"
import passport from "passport"
import uploader from "../middlewares/multer.js"
import { adminRoleAuth } from "./middlewares/roles.middlewares.js"

const router = Router()

const multerFields = [
    {name: 'profiles'},
    {name: 'products'},
    {name: 'identification', maxCount: 1}, // Es la identificacion
    {name: 'address', maxCount: 1}, // Es el comprobante de domicilio
    {name: 'accountState', maxCount: 1} // Es el comprobante de estado de la cuenta
    // Estos 3 ultimos son documentos
]

// Upgrade user to premium, degrade premium to user 

router.post(
    '/premium/:uid',
    passport.authenticate('jwt', { session: false }),
    // adminRoleAuth, // Solo un admin puede upgradear el rol de un user 
    usersController.changeRole
)

// Subir archivos a un usuario particular

router.post(
    '/:uid/documents',
    // passport.authenticate('jwt', { session: false }),
    uploader.fields(multerFields),
    usersController.updateDocuments
)

// Obtener todos los usuarios

router.get('/', usersController.getAllUsers)

// Eliminar todos los usuarios cuya ultima conexion fue hace mas de 2 dias

router.delete(
    '/',
    passport.authenticate('jwt', {session: false}),
    adminRoleAuth, // Solo un admin puede acceder a este endpoint
    usersController.deleteInactiveUsers
)

// Eliminar un usuario

router.delete(
    '/:uid',
    passport.authenticate('jwt', {session: false}),
    adminRoleAuth, // Solo un admin puede acceder a este endpoint
    usersController.deleteUser
)

export default router