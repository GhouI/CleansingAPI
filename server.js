const express = require('express')
const mongoose = require('mongoose')
const app = express();




app.listen(process.env.PORT || 3000, async() => {
    await mongoose.connect('mongodb+srv://admin:123@cluster0.acyy5.mongodb.net/Data')
    console.log("Connected to the Database.")
})

app.post('/signup', async(req, res) => {
    const emailQuery = req.query.email
    const passwordQuery = req.query.password
    let DataResponse = {
        Status: false,
        Message: "",
    }
    if (!emailQuery || !passwordQuery) {
        DataResponse.Message = "Email or Password input is invalid."
        res.send(DataResponse)
    } else if (passwordQuery.length < 6) {
        DataResponse.Message = "Password too short."
        res.send(DataResponse)
    } else if (checkIfAccountExist(emailQuery) == true) {
        DataResponse.Message = "Account Exists"
        res.send(DataResponse)
    }

    signup(emailQuery, passwordQuery)
    DataResponse.Message = "Account Created."
    DataResponse.Status = true;
    res.send(DataResponse)
})
app.post('/login', async(req, res) => {
    //{email:"",password:""} //required

    const emailQuery = req.query.email
    const passwordQuery = req.query.password
        //console.log(`Email ${emailQuery}\n Password ${passwordQuery}. Type ${typeof(passwordQuery)}`)
    let Message = {
        Status: "Error",
        message: "",
    }
    if (!emailQuery || !passwordQuery) {
        Message.message = "Email or Password input is invalid."
        return res.send(JSON.stringify(Message))
    } else {
        let IsAccountReal = await CheckDataBaseForAccount(emailQuery, passwordQuery)
        if (IsAccountReal.Status == true) {
            return res.send(IsAccountReal)
        } else if (IsAccountReal.Status == false) {
            return res.send(IsAccountReal)
        }
    }
})

async function signup(mail, password) {
    const Model = require('./models/User.js')
    const newUser = new Model({
        email: mail,
        Password: password,
        Username: "Unknown",
        Level: 1,
        Exp: 0,
        MaxExp: 10,
        ZombieKilled: 0,
        CurrentOwnedWeapons: ['Pistol']
    })
    newUser.save().then(() => {
        console.log("Account saved")
    }).catch(() => {
        console.log("error")
    })
}

function CheckIfRealEmail(email) {
    const regex = /@/g
    const mail = email
    if (mail.match(regex)) {
        return true;
    } else {
        return false;
    }
}

async function checkIfAccountExist(email) {
    const UserModel = require('./models/User.js')
    const EmailQuery = await UserModel.findOne({ email: email })
    if (EmailQuery) {
        return true;
    } else {
        return false;
    }
}
async function CheckDataBaseForAccount(email, pass) {
    let Message = {
        Status: "", //False or True.
        Data: {} //Here is going to store the account data
    }
    if (!email) return false;
    if (!CheckIfRealEmail(email)) return false;
    //   const connection =
    const UserModel = require('./models/User.js')
    const EmailQuery = await UserModel.findOne({ email: email, Password: pass })
    console.log(EmailQuery)
    if (EmailQuery) {
        Message.Status = true;
        Message.Data = EmailQuery;
        return Message;
    } else {
        Message.status = false;
        Message.Data = "Account not found."
        return Message;
    }
}
