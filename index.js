
const express = require('express');
const path = require("path");
const app = express()
const serverCache = require("./serverCache")

app.use(serverCache)

// Manual Caching Example: Headers are ser manually
app.get("/", (req, res) => {
    // 'Content-Type': 'text/html',
    // 'Content-Length': stat.size,
    // 'Cache-Control': 'no-store',
    // 'Cache-Control': 'no-cache',
    // 'Cache-Control': 'public, max-age=20'
    // Etags, Expire
    console.log("Server hit at:" + new Date(), req.headers)
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable')
    res.sendFile(path.join(__dirname, 'assets', "index.html"))
})

app.get("/index.html", (req, res) => {
    // 'Content-Type': 'text/html',
    // 'Content-Length': stat.size,
    // 'Cache-Control': 'no-store',
    // 'Cache-Control': 'no-cache',
    // 'Cache-Control': 'public, max-age=20'
    // Etags, Expire
    console.log("Server hit at:" + new Date(), req.headers)
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable')
    res.sendFile(path.join(__dirname, 'assets', "index.html"))
})

// Static Assests Middleware Example
app.use(express.static(path.join(__dirname, 'assets'), {
    etag: false,
    maxAge: 60
}))



// Server Cached Request
app.get("/serverCached", (req, res) => {
    res.json({
        name: "harry",
        lastname: "potter"
    })
})

app.set('etag', false);

const port = process.env.PORT || 3000;

app.listen(port, () => (console.log("Server is running")))