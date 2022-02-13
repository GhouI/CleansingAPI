const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    email: { type: String, required: true },
    Password: { type: String, required: true },
    Username: { type: String, required: false },
    Level: { type: Number, required: false },
    Exp: { type: Number, required: false },
    MaxExp: { type: Number, required: false },
    ZombieKilled: { type: Number, required: false },
}, { collection: "AccountStorage" })





module.exports = mongoose.model("UserModel", UserModel)
