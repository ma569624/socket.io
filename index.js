const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  //   socket.on('disconnect', () => {
  //     console.log('user disconnected');
  //   });
  socket.on("chat message", (msg) => {
    
    socket.join("some room");

    // broadcast to all connected clients in the room
    io.to("some room").emit("hello", "world");

    // broadcast to all connected clients except those in the room
    io.except("some room").emit("hello", "world");

    // leave the room
    socket.leave("some room");

    console.log(msg);
    socket.broadcast.emit("chat message", `${msg} ${socket.id}`);
    // io.emit("chat message", `${msg} ${socket.id}`);
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  socket.on("hello", (arg1, arg2, arg3) => {
    console.log(arg1); // 1
    console.log(arg2); // '2'
    console.log(arg3); // { 3: '4', 5: <Buffer 06> }
  });
  socket.on("request", (arg1, arg2, callback) => {
    console.log(arg1); // { foo: 'bar' }
    console.log(arg2); // 'baz'
    callback({
      status: "ok",
      id: socket.id,
    });
  });
  socket.onAny((eventName, ...args) => {
    console.log(eventName); // 'hello'
    console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
  });

  io.to("news").emit("hello");
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
