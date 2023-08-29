import { Router } from "express";
import UserManager from "../daos/mongodb/UserManager.class.js";
import { createHash } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const userManager = new UserManager()

const router = Router()

router.post('/register', passport.authenticate('register', {session: false, failureRedirect: 'api/sessions/registerFail'}), async (req, res) => {
    res.send({ status: "success", message: "User has been created"});
})

router.get('/registerFail', async (req, res) => {
    res.status(400).send({status: "error", error: "Authentication failed"})
})

// router.post("/register", async (req, res) => {
//   try {
//     let userData = req.body

//     userData.password = createHash(userData.password) // Se hashea la contrasenia
    
//     await userManager.addUser(userData)

//     res.send({status: "sucess"})
//   }
//   catch(error) {
//     res.status(400).send({status: "error", details: error.message})
//   }
// })

router.post('/login', passport.authenticate('login', {session: false, failureRedirect: 'api/sessions/loginFail'}), async (req, res) => {
    let user = req.user // Es el user que recibimos de passport (ver en passport.config.js)
    
    if (!user) {
        return res.status(400).send({status: "error", details: "Invalid credentials"})
    }

    let token = jwt.sign(req.user, 'coderSecret', {expiresIn: '24h'})

    return res.cookie("authToken", token, {httpOnly: true}).send({status: "success"})
})

router.get('/loginFail', async (req, res) => {
    res.status(400).send({status:"error", details: "Login failed"});
})

// router.post("/login", async (req, res) => {
//   let { email, password } = req.body

//   if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//     req.session.user = {
//       name: "Admin",
//       email: "adminCoder@coder.com",
//       age: "None",
//       role: "admin"
//     }

//     return res.send({status: "success", user: req.session.user})
//   }

//   let user = await userManager.findUser(email)

//   if (!user) {

//     return res.status(400).send({status: "error", details: "User couldn't be found"})
//   }

//   let isValidPassword = validatePassword(password, user) // Se valida la contrasenia

//   if (!isValidPassword) {
//     return res.status(400).send({status: "error", details: "Wrong email or password"})
//   }

//   req.session.user = {
//     name: `${user.first_name} ${user.last_name}`,
//     email: user.email,
//     age: user.age,
//     role: "user"
//   }

//   res.send({status: "success", user: req.session.user})
// })

router.post('/logout', async (req, res) => {
  // req.session.destroy((err) => {
  //   if (err) {
  //     return res.status(400).send({status: "error", details: "The session couldn't be destroyed"})
  //   }

  //   res.clearCookie('connect.sid')
  //   res.send({status: "sucess"})
  // })
    res.clearCookie('authToken')
    res.send({status: "sucess"})
})

router.post('/resetPassword', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send({status: "error", error: "Incomplete values"});
    }

    try {
        const newHashedPassword = createHash(password);

        await userManager.updatePassword(email, newHashedPassword)

        return res.send({status: "success", message: "Password updated"});
    }
    catch(error) {
        return res.status(404).send({status: "error", error: error.message});
    }
})

// github routes

router.get("/github", passport.authenticate("github", { scope: "user:email" }), async (req, res) => {
 // Vacio (es la ruta a la que mandamos a llamar desde el front)
 // Es para que pase por el middleware, y en cuanto se pueda acceder al perfil, passport
 // envia la info hacia el callback especificado
});

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {
    const user = req.user

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: "user",
        id: user._id
    }

    res.redirect('/products')
});

// current

router.get("/current", passport.authenticate("jwt", { session: false }), async (req, res) => {
    res.send(req.user);
});

export default router