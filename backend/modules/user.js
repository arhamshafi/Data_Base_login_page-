let mongoose = require("mongoose")

let user_schema = new mongoose.Schema({
    username : String ,
    email : String , 
    password : String
})

let users_profile = mongoose.model("profile" , user_schema )

module.exports = users_profile