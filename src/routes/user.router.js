import { Router } from "express"
import usersController from "../controllers/users.controller.js"
import passport from "passport"
import uploader from "../middlewares/multer.js"

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

export default router