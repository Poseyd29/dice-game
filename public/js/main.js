
let userScore = document.querySelector('.current-score')
let highScore = document.querySelector('.high-score')
let oppScore = document.querySelector('.opponent-score')
let oppHighScore = document.querySelector('.opponent-high')
let result = document.querySelector('.result')
let submitButton = document.querySelector('.submit')
let rollBtn = document.querySelector('.roll-button')
let freshGame = document.querySelector('.new-game')
const playerInfoForm = document.getElementById('')
const socket = io();

socket.on('message', message => {
  console.log(message)
})



rollBtn.addEventListener('click', rollDice)
freshGame.addEventListener('click', newGame)

// when roll is clicked 
let firstPlayerScore = 0
let secondPlayerScore = 0
let turnCount = 15
let high = []

function newGame() {
  let firstPlayerScore = 0
  let secondPlayerScore = 0
  let turnCount = 15
}


function rollDice() {
  const firstRandomNum = Math.floor(Math.random() * 6) + 1
  const secondRandomNum = Math.floor(Math.random() * 6) + 1

  firstRandomNum
  secondRandomNum
  firstPlayerScore += firstRandomNum
  secondPlayerScore += secondRandomNum
  turnCount -= 1
  console.log(turnCount)

  userScore.innerHTML = 'Your Score: ' + firstPlayerScore;
  oppScore.innerHTML = 'Opp Score: ' + secondPlayerScore;

  function endGame() {
    if (turnCount === 0 && firstPlayerScore > secondPlayerScore) {
      result.innerHTML = 'Winner: the winner is player 1'
      alert('please click new game')
    } else if (turnCount === 0 && firstPlayerScore === secondPlayerScore) {
      result.innerHTML = 'Winner: this round was a tie'
      alert('please click new game')
    } else if (turnCount === 0 && secondPlayerScore > firstPlayerScore) {
      result.innerHTML = 'Winner: the winner is player 2'
      alert('please click new game')
    } else {
      return
    }
  }

  endGame()

  // if (firstRandomNum > secondRandomNum) {
  //   result.innerHTML = 'Winner: the winner is player 1'
  // } else if (firstRandomNum === secondRandomNum) {
  //   result.innerHTML = 'Winner: this round was a tie'
  // } else {
  //   result.innerHTML = 'Winner: the winner is player 2'
  // }

  localStorage.setItem('firstPlayerScore', firstPlayerScore)
  localStorage.setItem('secondPlayerScore', secondPlayerScore)

  console.log(firstPlayerScore)
  console.log(secondPlayerScore)

}
console.log(localStorage)