const express = require("express");
const mongoose = require('mongoose')
const router = require("./src/router/auth-router.js")

const app = express();
app.use(express.json());



app.use("/api/auth", router)

app.listen(4000, () => {
    mongoose.connect('mongodb+srv://skothekar5:Niknanosharu99@cluster0.nsamebh.mongodb.net/Auth-DB')
    .then(() => console.log('MongoDB connected...'))
    .catch((error) => console.log(error))
    console.log(`server is running at ${4000}`)
})
