// const moment = require('moment');

// function formatMessage(username, text) {
//   return {
//     username,
//     text,
//     time: moment().format('h:mm a')
//   };
// }

// module.exports = formatMessage;


function rollDice() {
    let firstPlayerScore = 0
    let secondPlayerScore = 0
    let turnCount = 15
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

    // socket.on('score', score => {
    //     console.log(score)
    // })
}

exports.rollDice = rollDice;