const mongoose = require('mongoose')

const connectDb = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://oumar:123password123@twitter.oai6rs4.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser: true
        })

        console.log(`Database up and running on ${conn.connection.host} `.inverse.green.bold)
    } catch (err) {
        console.error(`${err.message}`.white.inverse)
    }
}

module.exports = connectDb