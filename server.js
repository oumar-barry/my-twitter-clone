const express = require('express')
const pug = require('pug')
const colors = require('colors')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const connectDb = require('./config/db')
const app = express()
const PORT = 4000
const { auth } = require('./middleware/auth')


app.set('view engine', 'pug')
app.set('views','views')


connectDb()

const server = app.listen(PORT, () => console.log("Server up and running on port " + PORT))

app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret: "mySecret",
    resave: true,
    saveUninitialized: false
}))


//Loading routes

const loginRoute  = require('./routes/login.js') 
const registerRoute = require('./routes/register')
app.use("/login",loginRoute)
app.use('/register', registerRoute)


app.get("/",auth,(req,res,next) => {
    
    res.status(200).render("home")

})








