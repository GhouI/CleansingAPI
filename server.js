const express = require('express')
const app = express();



app.listen(process.env.PORT)

app.get('/user', (req, res) => {
    console.log("hello")
    res.send("Hello")
})
