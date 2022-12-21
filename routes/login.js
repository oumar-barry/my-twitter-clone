const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get("/", (req,res,next) => {
    res.status(200).render("login")
})

router.post("/", async (req,res,next) => {
    try{
         //trim all spaces 
        for(const key in req.body){
            if(key.indexOf('password') !== -1 ){
                req.body[key] = req.body[key].trim()
            }
        }
        
        const {
            credential,
            password
        } = req.body

        let payload = req.body
        
        if(credential && password ){
           
            let user = await User.findOne({
                $or: [
                    {email: credential},
                    {username: credential}
                ]
            })

            if( user && (await user.comparePassword(password)) ){
                req.session.user = user
                return res.redirect("/")
            } else {

                payload.errMessage = 'Login ou mot de passe incorrect  '
                
            }



        } else {
            payload.errMessage = "Veuillez remplir tous les champs"
        }

        res.status(200).render("login",payload)



    } catch (err) {
        console.error(err.message)

    }
   
})


module.exports = router