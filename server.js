const express = require('express')
const app = express();


app.listen(80)

app.get('/user', (req, res) => {
    console.log("hello")
})