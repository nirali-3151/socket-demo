const express = require("express");
const http = require("http");
const cors = require('cors')
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const onConnection = require('./socketConnection/connection')
const port = process.env.PORT || 4004;

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

io.on("connection", onConnection);

module.exports = { io };

server.listen(port, () => console.log(`Listening on port ${port}`));