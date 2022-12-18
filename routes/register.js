const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get("/", (req,res,next) => {
    res.status(200).render("register")
})

router.post("/", async (req,res,next) => {
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
            return res.status(200).render("register",payload)
        }
        
        
        // Check if the username or email doesn't exist
        let  user = User.findOne(
            $or [
                {email},
                {password}
            ]
        )

        if(!user){
            try{
                user = await User.create(req.body)
                req.session.user = user
                res.redirect('/')
            } catch(err){
                console.log(`${err.errMessage}`)
                return res.sendStatus(400)
            }
            
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

})


module.exports = router