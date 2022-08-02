
let userScore = document.querySelector('.current-score')
let highScore = document.querySelector('.high-score')
let oppScore = document.querySelector('.opponent-score')
let oppHighScore = document.querySelector('.opponent-high')
let result = document.querySelector('.result')
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

  userScore.innerHTML = 'Your Score: ' + firstPlayerScore;
  oppScore.innerHTML = 'Opp Score: ' + secondPlayerScore;


  if (firstRandomNum > secondRandomNum) {
    result.innerHTML = 'Winner: the winner is player 1'
  } else if (firstRandomNum === secondRandomNum) {
    result.innerHTML = 'Winner: this round was a tie'
  } else {
    result.innerHTML = 'Winner: the winner is player 2'
  }
  console.log(firstPlayerScore)
  console.log(secondPlayerScore)

}