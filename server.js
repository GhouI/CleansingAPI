const express = require('express')
const app = express();



app.listen(process.env.PORT || 3000)

app.get('/user', (req, res) => {
    console.log("hello" + req.body)
    res.send("Hello, " + req.body)
})
