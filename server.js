const express = require('express')
const app = express();


app.set("port",8080)
app.listen(8080)

app.get('/user', (req, res) => {
    console.log("hello")
    res.send("Hello")
})
