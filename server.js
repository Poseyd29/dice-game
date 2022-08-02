// const path = require("path");
// const http = require("http");
// const express = require("express");
// const socketio = require("socket.io");
// const formatMessage = require("./utils/messages");
// const createAdapter = require("@socket.io/redis-adapter").createAdapter;
// const redis = require("redis");
// require("dotenv").config();
// const { createClient } = redis;
// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers,
// } = require("./utils/users");

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// // Set static folder
// app.use(express.static(path.join(__dirname, "public")));

// const botName = "ChatCord Bot";

// (async () => {
//   pubClient = createClient({ url: "redis://127.0.0.1:6379" });
//   await pubClient.connect();
//   subClient = pubClient.duplicate();
//   io.adapter(createAdapter(pubClient, subClient));
// })();

// // Run when client connects
// io.on("connection", (socket) => {
//   console.log(io.of("/").adapter);
//   socket.on("joinRoom", ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);

//     socket.join(user.room);

//     // Welcome current user
//     socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

//     // Broadcast when a user connects
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         "message",
//         formatMessage(botName, `${user.username} has joined the chat`)
//       );

//     // Send users and room info
//     io.to(user.room).emit("roomUsers", {
//       room: user.room,
//       users: getRoomUsers(user.room),
//     });
//   });

//   // Listen for chatMessage
//   socket.on("chatMessage", (msg) => {
//     const user = getCurrentUser(socket.id);

//     io.to(user.room).emit("message", formatMessage(user.username, msg));
//   });

//   // Runs when client disconnects
//   socket.on("disconnect", () => {
//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         "message",
//         formatMessage(botName, `${user.username} has left the chat`)
//       );

//       // Send users and room info
//       io.to(user.room).emit("roomUsers", {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       });
//     }
//   });
// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app)
const io = socketio(server);
const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
const bodyParser = require('body-parser')
const mongo = require('mongodb');
const uri = "mongodb+srv://nicewithdice:passdice@cluster0.pt6ws.mongodb.net/?retryWrites=true&w=majority";
const { userJoin, getCurrentUser } = require('./utils/users')
const roll = require('./utils/logic.js')
console.log(roll.rollDice())

// Database Setup
let MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Mongo Database')
    const db = client.db('nice-with-dice')
    const usernameCollection = db.collection('player-info')

    app.post('/info', (req, res) => {
      usernameCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
  })

// 



// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Run  when client connects
io.on('connection', socket => {
  // Join Room
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room)
  })


  // Welcome current user
  socket.emit('message', 'did this emit? i hope it emits')

  // Broadcast when user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat')
  })

  // Runs when user rolls dice
  socket.broadcast.emit('score', 'opponent just rolled a');

  // Run this when user wins 
  socket.emit('result', 'player [] was the winner')

  // Run this when user loses 
})