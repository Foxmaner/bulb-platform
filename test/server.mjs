import express from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import { YSocketIO } from 'y-socket.io/dist/server'

const host = "localhost"
const port = "1234"

const app = express();

const httpServer = createServer(app);

const io = new SocketServer(httpServer, { cors: { origin: '*' } });

const ysocketio = new YSocketIO(io)

ysocketio.initialize()


let id = 1;

// Listen for Socket.IO connections
io.on("connection", (socket) => {
  console.log("Socket.IO connection established");
  socket.on("disconnect", () => {
    console.log("Socket.IO connection disconnected");
  });

  socket.on("addSection", (args, callback) => {
      callback({id: 1});

      socket.broadcast.emit("addSection", {id: 1});
  });

  socket.on("addParagraph", (args, callback) => {
    callback({id});

    socket.broadcast.emit("addParagraph", {id});

    id++; 
  });

});


httpServer.listen(port, host, () => console.log(`Server running on port ${port}`))

