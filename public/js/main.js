// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// // Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });

// const socket = io();

// // Join chatroom
// socket.emit('joinRoom', { username, room });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });

// // Message from server
// socket.on('message', (message) => {
//   console.log(message);
//   outputMessage(message);

//   // Scroll down
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// // Message submit
// chatForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   // Get message text
//   let msg = e.target.elements.msg.value;

//   msg = msg.trim();

//   if (!msg) {
//     return false;
//   }

//   // Emit message to server
//   socket.emit('chatMessage', msg);

//   // Clear input
//   e.target.elements.msg.value = '';
//   e.target.elements.msg.focus();
// });

// // Output message to DOM
// function outputMessage(message) {
//   const div = document.createElement('div');
//   div.classList.add('message');
//   const p = document.createElement('p');
//   p.classList.add('meta');
//   p.innerText = message.username;
//   p.innerHTML += `<span>${message.time}</span>`;
//   div.appendChild(p);
//   const para = document.createElement('p');
//   para.classList.add('text');
//   para.innerText = message.text;
//   div.appendChild(para);
//   document.querySelector('.chat-messages').appendChild(div);
// }

// // Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// // Add users to DOM
// function outputUsers(users) {
//   userList.innerHTML = '';
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.innerText = user.username;
//     userList.appendChild(li);
//   });
// }

// //Prompt the user before leave chat room
// document.getElementById('leave-btn').addEventListener('click', () => {
//   const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
//   if (leaveRoom) {
//     window.location = '../index.html';
//   } else {
//   }
// });

let submitButton = document.querySelector('.submit')
let rollBtn = document.querySelector('.roll-button')
const playerInfoForm = document.getElementById('')
const socket = io();

socket.on('message', message => {
  console.log(message)
})


rollBtn.addEventListener('click', rollDice)

// when roll is clicked 
let firstPlayerScore = 0
let secondPlayerScore = 0
let turnCount = 15

function rollDice() {
  const firstRandomNum = Math.floor(Math.random() * 6) + 1
  const secondRandomNum = Math.floor(Math.random() * 6) + 1
  for (let j = 0; j < 15; j++) {
    firstRandomNum
    secondRandomNum
    firstPlayerScore += firstRandomNum
    secondPlayerScore += secondRandomNum
  }
  console.log(firstPlayerScore)
  console.log(secondPlayerScore)

  socket.on('score', score => {
    console.log(score)
  })

  // console.log(rollDice())

  // const firstDiceImage = 'img/dice.png' + firstRandomNum + '.png';
  // document.querySelector('img')[0].setAttribute('src', firstDiceImage)


  // const secondDiceImage = 'img/dice.png' + secondRandomNum + '.png';
  // document.querySelector('img')[1].setAttribute('src', firstDiceImage)

  // if (firstRandomNum > secondRandomNum) {
  //   document.querySelector('h1').innerHTML = 'The winner is player 1'
  // } else if (firstRandomNum < secondRandomNum) {
  //   document.querySelector('h1').innerHTML = 'The winner is player 2'
  // } else {
  //   document.querySelector('h1').innerHTML = 'Its a draw'
  // }

}