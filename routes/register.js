const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get("/", (req,res,next) => {
    res.status(200).render("register")
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
            firstname,
            lastname,
            username,
            email,
            password,
            passwordconf
        } = req.body

        let payload = req.body
        
        if(firstname && lastname && username && password && passwordconf){
            //Check if the two passwords match
            
            if(password != passwordconf){
                payload.errMessage = "Les deux mots de passe ne correspondent pas"
                return res.status(400).render("register",payload)
            }
            
            
            let user = await User.findOne({
                $or: [
                    {email},
                    {username}
                ]
            })

            if(!user){
               await User.create(req.body)
               .then((user) => {
                    req.session.user = user
                    return res.redirect("/")
               })
                
            } else {
                if(user.email == email) {
                    payload.errMessage = 'Cette Adresse email existe déjà '
                } else {
                    payload.errMessage = "Ce Pseudo est déjà utilisé "
                }
            }



        } else {
            payload.errMessage = "Veuillez remplir tous les champs"
        }

        res.status(200).render("register",payload)



    } catch (err) {
        console.error(err.message)

    }
   
})


module.exports = router