

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app)
const io = socketio(server);
const bodyParser = require('body-parser')
const mongo = require('mongodb');
const uri = "mongodb+srv://nicewithdice:passdice@cluster0.pt6ws.mongodb.net/?retryWrites=true&w=majority";
const { userJoin, getCurrentUser } = require('./utils/users')
const roll = require('./utils/logic.js')
console.log(roll.rollDice())
const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// ****** For heroku, comment out the server.listen and replace it with the app.listen you see below. if you are running it on your own server without heroku then leave code as is ******

// app.listen(process.env.PORT || 3000, function () {
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });

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