import { Router } from 'express';
import passport from 'passport';
import viewsController from '../controllers/views.controller.js';
import { adminRoleAuth } from "./middlewares/roles.middlewares.js"
import { verifyCartAccess } from "./middlewares/carts.middleware.js"

const router = Router();

// Esta vista se utilizo en uno de los primeros desafios (desactualizada)

router.get('/', viewsController.home) 

// Esta vista se utilizo en uno de los primeros desafios (sockets)

router.get(
    '/realtimeproducts',
    passport.authenticate('jwt', { session: false }),
    adminRoleAuth,
    viewsController.realTimeProducts
)

// Esta vista se utilizo en uno de los primeros desafios (sockets)

router.get('/chat', viewsController.chat)

// Las siguientes vistas se utilizan para un flujo completo de compra (mas algunas
// solicitadas en la ultima entrega del proyecto final)

router.get('/products', passport.authenticate('jwt', { session: false }), viewsController.products)

router.get(
    '/carts/:cid',
    passport.authenticate('jwt', { session: false }),
    verifyCartAccess, // Solo se puede mirar el carrito de uno mismo
    viewsController.cart
)

router.get('/login', viewsController.login)

router.get('/register', viewsController.register)

router.get(
    '/resetPassword',
    passport.authenticate('jwtRequestPassword', {session: false, failureRedirect: 'requestResetPassword'}),
    viewsController.resetPassword
)

router.get('/requestResetPassword', viewsController.requestResetPassword)

router.get(
    '/users/:uid',
    passport.authenticate('jwt', { session: false }),
    adminRoleAuth,
    viewsController.user
)

router.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    adminRoleAuth,
    viewsController.allUsers
)

export default router;