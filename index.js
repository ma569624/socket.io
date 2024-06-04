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



const RegisterUsers = async (socket, id) => {
  socket.socketid = id
  const UserCreatelogs = await User.create(socket);
  console.log(UserCreatelogs)
};

const SendMessageToUsers = async (userinfo)  => {
  const reaciverUser = await User.find(userinfo.name);
  console.log("user to filter:",userinfo)
  console.log("user to recived:", reaciverUser[0].socketid)
  return reaciverUser.socketid;
};

const DeleteUser = async (socket)  => {
  const UserCreatelogs = await User.deleteOne({socketid : socket });
  console.log(UserCreatelogs)
};

io.on("connection", async (socket) => {
  console.log(socket.handshake.query.name)
  
  if (socket.handshake.query.name) {
    console.log(socket.id)
    RegisterUsers(socket.handshake.query, socket.id);
  }
  
  io.emit("RagisterUserlist", getuserlist());

  socket.on("getmessageclient", (details) => {
    console.log(details);
    const messageWithTime = {
      sender: details.sender,
      message: details.msg,
      time: new Date().toISOString(), // Get current time in ISO format
    };
    console.log(details.name);

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
