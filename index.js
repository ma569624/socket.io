const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const connectToDatabase = require("./utils/db");
const app = express();
app.use(express.json());
app.set("view engine", "ejs"); // Set EJS as the default view engine
const server = createServer(app);
const io = new Server(server);
const UserList = require("./models/user_list.model");
const User = require('./models/Users.model')

let Users = [];
const getuserlist = async () => {
  await UserList.find();

  // return Users;
};
getuserlist();



const RegisterUsers = async (socket) => {
  
  const UserCreatelogs = await User.create({
    email: 'vhgvhg',
    name: "bhjhgvhv"
  });
  
  // Users.push({
  //   socketid: socket.id,
  //   name: socket.handshake.query.name,
  //   email: socket.handshake.query.email,
  //   logintime: socket.handshake.time,
  //   unread: 3,
  // });
};

RegisterUsers();

const SendMessageToUsers = (userinfo) => {
  const reaciverUser = Users.find((user) => user.name == userinfo);
  return reaciverUser.socketid;
};

const DeleteUser = (socket) => {
  Users.pop({
    socketid: socket.id,
  });
};

io.on("connection", async (socket) => {
  RegisterUsers(socket);
  console.log(socket.handshake);
  io.emit("RagisterUserlist", getuserlist());

  socket.on("getmessageclient", (details) => {
    console.log(details);
    const messageWithTime = {
      sender: details.sender,
      message: details.msg,
      time: new Date().toISOString(), // Get current time in ISO format
    };
    io.to(SendMessageToUsers(details.name)).emit(
      "getmessageserver",
      messageWithTime
    );
  });

  socket.on("disconnect", () => {
    DeleteUser(socket.id);
  });
});

// io.of("/users").on("connection", (socket) => {
//     io.emit("RagisterUserlist", getuserlist());
// });

server.listen(4000, async () => {
  connectToDatabase();
  console.log("server running at http://localhost:4000");
});
