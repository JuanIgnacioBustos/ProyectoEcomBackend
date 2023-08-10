import { Router } from "express";
import UserManager from "../daos/mongodb/UserManager.class.js";

const userManager = new UserManager()

const router = Router()

router.post("/register", async (req, res) => {
    try {
        let userData = req.body
        
        await userManager.addUser(userData)

        res.send({status: "sucess"})
    }
    catch(error) {
        res.status(400).send({status: "error", details: error.message})
    }
})

router.post("/login", async (req, res) => {
    let { email, password } = req.body

    let user = await userManager.findUser(email, password)

    if (!user) {
        return res.status(400).send({status: "error", details: "User can't be found"})
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({status: "success", user: req.session.user})
})

export default router