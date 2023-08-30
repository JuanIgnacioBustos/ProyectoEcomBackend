import passport from "passport";
import GithubStrategy from 'passport-github2'

import UserManager from "../daos/mongodb/UserManager.class.js";

const userManager = new UserManager()

const initializePassportGithub = () => {

// Strategies

    passport.use(
        "github",
        new GithubStrategy(
        {
            clientID: "Iv1.21f46e0098e42d2c",
            clientSecret: "925b4d22273da192bbe1345c3fdb82978545094c",
            callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = await userManager.findUser(profile._json.email);
            
            if (!user) {
            let newUser = {
                // Github no nos da "last_name", "age", y "password" (por ello se hardcodean los datos)
                first_name: profile._json.name,
                last_name: "test-lastname", 
                email: profile._json.email,
                age: 0,
                password: ''
            };

            const result = await userManager.addUser(newUser);

            done(null, result);
            } 
            else {
            done(null, user); // Quiza deberia mandar el user (el profe no lo hizo, lo dejo asi)
            }
        }
        )
    );  
};

export default initializePassportGithub;