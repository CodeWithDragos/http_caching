
const express = require('express');
const path = require("path");
const app = express()
const serverCache = require("./serverCache")

app.use(serverCache)

app.get("/", (req, res) => {
    // 'Content-Type': 'text/html',
    // 'Content-Length': stat.size,
    // 'Cache-Control': 'no-store',
    // 'Cache-Control': 'no-cache',
    // 'Cache-Control': 'public, max-age=20'
    // Etags, Expire
    console.log("Server hit at:" + new Date())
    res.setHeader('Cache-Control', 'public, max-age=10')
    res.sendFile(path.join(__dirname, 'assets', "index.html"))
})

// staic files
app.use(express.static(path.join(__dirname, 'assets'), {
    etag: false,
    maxAge: 60
}))

app.set('etag', false);


const port = process.env.PORT || 3000;

app.listen(port, () => (console.log("Server is running")))