const express = require("express")
const proxy = require("express-http-proxy")
const cors = require("cors")

const app = express()

app.use(
    cors({
        origin: "http://200.19.145.141:5000",
    })
)

app.use("/", proxy("http://200.19.145.141:8000"))

app.listen(7000)