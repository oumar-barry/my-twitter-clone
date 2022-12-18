exports.auth = (req,res,nex) => {
    if(req.session && req.session.user){
        next()
    } else {
        res.redirect('/register')
    }
}