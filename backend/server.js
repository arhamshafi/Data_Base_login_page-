const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const userschema = require("./user")
const user = require('./user')
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Arham:123@cluster0.qa4g3jt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
console.log("mongoose conected");

})

app.post("/login",  async (req, res) => {
    let {email,password} = req.body
    let users = await user.find({email:email})
    if(users[0].password == password){
        res.send(users)
        console.log(users);
    }
})

app.post("/sign_in", (req, res) => {
    let sign_in = new user(req.body)
    sign_in.save()
    console.log(sign_in);
    res.send(sign_in)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
