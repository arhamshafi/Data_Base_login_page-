let express = require("express")
let cors = require("cors")
let mongoose = require("mongoose")
let user_profile = require("./modules/user")
let port = 5000
let app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Arham:123@cluster0.qa4g3jt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("mongoose got connected");
})

app.post("/sign_up", async (req, res) => {
    try {

        let existing_mail = await user_profile.find({ email: req.body.email })
        console.log(existing_mail);

        if (existing_mail.length > 0) {
            res.json({ message: "This Email is Already Taken !!", Success: false })
            return;
        }
        let sign_up = new user_profile(req.body)
        await sign_up.save()
        res.json({ message: "Account Registered Successfully !!", Success: true, user: sign_up })
    }
    catch (err) {
        console.error("error with api:", err);
        return res.json({ message: "Server Error", success: false });
    }
})


app.post("/login", async (req, res) => {
    try {
        let data = req.body
        let crnt_user = await user_profile.find({ email: data.email })
        if (crnt_user.length === 0) {
            return res.json({ message: "E-mail Doesn't Exist", success: false });
        }
        if (crnt_user) {

            if (crnt_user[0].password == data.password) {
                res.json({ message: "Login Successfully", Success: true, user: crnt_user })
            }
            else {
                res.json({ message: "Invalid Credentials", success: false })
            }
        }


    }
    catch (err) {
        console.error("error with api:", err);
        return res.json({ message: "Server Error", success: false });
    }
})


app.listen(port, () => {
    console.log("port is working");
})
