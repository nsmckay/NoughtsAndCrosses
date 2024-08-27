// const clickButton = document.getElementById("click-button")
const startJingle = document.getElementById("start-jingle")

// const instructions = document.getElementById("instructions")
// const mobileInfo = document.getElementById("mobile-instructions")
// const mobileInfoButton = document.getElementById("mobile-instructions-button")
// const miniRetry = document.getElementById("retry-mini")
// const options = document.getElementById("options")
// const radioSingle = document.getElementById("game-mode-single")
// const radioMulti = document.getElementById("game-mode-multi")
// const startButton = document.getElementById("start-game")
// const gameBoard = document.getElementById("game-board")
// const endOptions = document.getElementById("end-options")
// const retry = document.getElementById("retry")
// const continueG = document.getElementById("continue")
// const message = document.getElementById("message")
// const p1ScoreBoard = document.getElementById("p1-score")
// const p2ScoreBoard = document.getElementById("p2-score")
// const mouse = document.getElementById("mouse")
// const cat = document.getElementById("cat")
const gameTitle = document.getElementById("game-title")
const instructions = document.getElementById("instructions")
const options = document.getElementById("options")
const startButton = document.getElementById("start-game")
const gameBoard = document.getElementById("game-board")
const boardHeader = document.getElementById("board-header")
const grid = document.getElementById("grid")
const scoreCard = document.getElementById("score-card")
const timeCard = document.getElementById("time-card")
const endOptions = document.getElementById("end-options")
const quitButton = document.getElementById("retry")
const playAgainButton = document.getElementById("continue")
const message = document.getElementById("message")

// let singlePlayer = true // multiplayer when false
// let difficulty = 5 //default difficulty
// let gameStart = false
// let gameOver = false

let currentMoleSquare
let currentBadMoleSquare
let gameScore = 0;
let gameTime = 0;
let gameOver = false
let intervalMole
let intervalBadMole
let intervalTime
let intervalEnd

// radioSingle.addEventListener("click", updateInstructions)
// radioMulti.addEventListener("click", updateInstructions)
// startButton.addEventListener("click", startGame)
// retry.addEventListener("click", startOver)
// retry.disabled = true
// miniRetry.addEventListener("click", startOver)
// continueG.addEventListener("click", continueGame)
startButton.addEventListener("click", startGame)
quitButton.addEventListener("click", quitGame)
playAgainButton.addEventListener("click", startGame)

// miniRetry.style.display = "none"
// options.style.display = "inline" //before starting game, only want options visible
// gameBoard.style.display = "none"
// endOptions.style.display = "none"
options.style.display = "inline" //before starting game, only want options visible
gameBoard.style.display = "none"
endOptions.style.display = "none"

// function updateInstructions() {
//     clickButton.play()
//     if(radioSingle.checked) {
//         instructions.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
//         mobileInfo.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
//         difficultySlider.disabled = false
//         dynamicDifficultyBox.disabled = false
//         cheatBox.disabled = false
//     } else {
//         instructions.innerText="MULTI-PLAYER: Find a friend to play with. Player 1 goes first, placing their X mark in the grid below. Player 2 goes second, placing their O mark elsewhere in the grid. The winner is the first to place 3 marks in a row."
//         mobileInfo.innerText="MULTI-PLAYER: Find a friend to play with. Player 1 goes first, placing their X mark in the grid below. Player 2 goes second, placing their O mark elsewhere in the grid. The winner is the first to place 3 marks in a row."
//         difficultySlider.disabled = true
//         dynamicDifficultyBox.disabled = true
//         cheatBox.disabled = true
//     }
// }

function startGame() {
    startJingle.play()
    gameTitle.style.display = "none"
    instructions.style.display = "none"
    options.style.display = "none"
    gameBoard.style.display = "inline"
    endOptions.style.display = "none"
    setGame()
}

function setGame() {
    //set up 3 X 3 grid
    for(let i = 0; i < 9; i++) {
        let moleSquare = document.createElement("div")
        moleSquare.id = i.toString()
        moleSquare.addEventListener("click", selectSquare)
        grid.appendChild(moleSquare)
    }
    gameTime = 30
    timeCard.display="inline"
    timeCard.innerText = "TIME: " + gameTime.toString()
    boardHeader.classList.add("board-header-duo")
    boardHeader.classList.remove("board-header-mono")
    intervalMole = setInterval(setMole, 2000) //call mole every 2 seconds 
    intervalBadMole = setInterval(setBadMole, 3000) //call bad mole every 3 seconds
    intervalTime = setInterval(tick, 1000) //reduce timer by 1 each second
}

function setMole() {
    if(gameOver) {
        return
    }

    if(currentMoleSquare) {
        currentMoleSquare.innerHTML = ""
    }

    let mole = document.createElement("img")
    mole.src = "./greenMouse.png"

    let randomNum = getRandomSquare()
    //check to ensure no collisions
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    currentMoleSquare = document.getElementById(randomNum)
    currentMoleSquare.appendChild(mole)
}

function setBadMole() {
    if(gameOver) {
        return
    }

    if(currentBadMoleSquare) {
        currentBadMoleSquare.innerHTML = ""
    }

    let badMole = document.createElement("img")
    badMole.src = "./redCat.png"

    let randomNum = getRandomSquare()
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    currentBadMoleSquare = document.getElementById(randomNum)
    currentBadMoleSquare.appendChild(badMole)
}

function tick() {
    if(gameTime > 0) {
        gameTime--
        timeCard.innerText = "TIME: " + gameTime.toString()
    } else {
        console.log("times up")
        timeCard.innerText = "TIME: " + gameTime.toString()
        gameOverNow()
    }
}

function getRandomSquare() {
    let num = Math.floor(Math.random() * 9) //return integer 0-8
    return num.toString()
}

function selectSquare() {
    if(gameOver) {
        return
    }
    
    if(this===currentMoleSquare) {
        gameScore += 20
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentBadMoleSquare) {
        gameOverNow()
    }
}

function gameOverNow() {
    scoreCard.innerText = "GAME OVER: " + gameScore.toString()
    clearInterval(intervalTime)
    boardHeader.classList.remove("board-header-duo") //only want to display the GAME OVER now, so switch to mono
    boardHeader.classList.add("board-header-mono")
    timeCard.innerText = ""
    timeCard.display = "none"
    gameOver = true
    intervalEnd = setInterval(endGame, 3000) //after 3 seconds, bring up the end game options
}

function endGame() {
    gameBoard.style.display = "none"
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.lastChild)
    }
    clearInterval(intervalEnd)
    clearInterval(intervalMole)
    clearInterval(intervalBadMole)
    scoreCard.innerText = "SCORE: 0"
    gameScore = 0
    gameOver = false
    endOptions.style.display = "inline"
    gameTitle.style.display = "inline"
}

function quitGame() {
    console.log("quit")
    endOptions.style.display = "none"
    instructions.style.display = "inline"
    options.style.display = "inline"
}

// function startGame() {
//     if (radioSingle.checked) {
//         //console.log("SINGLEPLAYER!")
//         singlePlayer = true
//     } else {
//         //console.log("MULTIPLAYER!")
//         singlePlayer = false
//     }
//     // if (dynamicDifficultyBox.checked) {
//     //     difficulty = 5
//     // }
//     startJingle.play()
//     gameStart = true
//     startButton.disabled = true
//     retry.disabled = false
//     message.innerText="Player 1, place your O"
//     instructions.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
//     mobileInfo.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
//     options.style.display = "none"
//     gameBoard.style.display = "grid" //when game starts, we want to see the grid of squares
//     miniRetry.style.display = "inline" //small retry button for quitting during game
//     endOptions.style.display = "none"
// }

// function continueGame() {
//     player1Turn = true
//     gameStart = false
//     gameOver = false
//     retry.disabled = true
//     startButton.disabled = false
//     turns = 0
//     cheats = 0
//     squaresArray = [1,2,3,4,5,6,7,8,9]

//     for(let i = 1; i < 10; i++) {
//         //console.log("WORKING")
//         const currentSquare = document.getElementById("square-" + i)
//         currentSquare.style.backgroundImage = "url(blank.png)"
//         currentSquare.classList.remove("nought")
//         currentSquare.classList.remove("cross")
//     }

//     mouse.firstChild.src="greenMouse.png"
//     cat.firstChild.src="redCat.png"
//     options.style.display = "inline" //before starting game, only want options visible
//     gameBoard.style.display = "none"
//     miniRetry.style.display = "none"
//     endOptions.style.display = "none"
//     startGame()
// }

// // function clickSquare(event, num) {
// //     if (singlePlayer) {
// //         handleTurnSingle(num)
// //     } else {
// //         handleTurnMulti(num)
// //     }
// // }

// async function handleTurnSingle(num) {
//     const currentSquare = document.getElementById("square-" + num)
//     const containsNought = currentSquare.classList.contains("nought")
//     const containsCross = currentSquare.classList.contains("cross")
//     const squaresArrayIndex = squaresArray.indexOf(num)
//     if(!containsCross && !containsNought && player1Turn && gameStart && !gameOver) {
//         flipSquare.play()
//         currentSquare.style.backgroundImage = "url(nought.png)"
//         currentSquare.classList.add("nought")
//         squaresArray.splice(squaresArrayIndex,1,"O")
//         player1Turn = false
//         turns++
//         checkWin()

//         if(!gameOver) {
//             message.innerText="The CPU is thinking..."
//             instructions.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
//             mobileInfo.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
//             await wait(3000); //wait 3 seconds
//             let noughtIndices = squaresArray.map((e,i) => e==="O" ? i : "")
//             let crossIndices = squaresArray.map((e,i) => e==="X" ? i : "") // 2 marked squared 1 blank in row means CPU picks blank square
//             let r = Math.floor(Math.random() * difficulty) + 0
//             if(r === 0) {
//                 console.log("random move - difficulty = " + difficulty)
//                 if (difficulty != 10) {
//                     placeRandomSquare()
//                 } else {
//                     //CODE TO MOVE FOR DIFFICULTY 10 - (REFACTOR THIS!!!)
//                     console.log("correct move")
//                     if(noughtIndices.includes(0) && noughtIndices.includes(1) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                     crossIndices.includes(0) && crossIndices.includes(1) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                     noughtIndices.includes(5) && noughtIndices.includes(8) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                     crossIndices.includes(5) && crossIndices.includes(8) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                     noughtIndices.includes(4) && noughtIndices.includes(6) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                     crossIndices.includes(4) && crossIndices.includes(6) && !noughtIndices.includes(2) && !crossIndices.includes(2)) {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(2)
//                         console.log(squaresArray)
//                     } else if(noughtIndices.includes(1) && noughtIndices.includes(2) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                     crossIndices.includes(1) && crossIndices.includes(2) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                     noughtIndices.includes(3) && noughtIndices.includes(6) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                     crossIndices.includes(3) && crossIndices.includes(6) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                     noughtIndices.includes(4) && noughtIndices.includes(8) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                     crossIndices.includes(4) && crossIndices.includes(8) && !noughtIndices.includes(0) && !crossIndices.includes(0)) {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(0)
//                         console.log(squaresArray)
//                     } else if(noughtIndices.includes(0) && noughtIndices.includes(2) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
//                     crossIndices.includes(0) && crossIndices.includes(2) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
//                     noughtIndices.includes(4) && noughtIndices.includes(7) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
//                     crossIndices.includes(4) && crossIndices.includes(7) && !noughtIndices.includes(1) && !crossIndices.includes(1)) {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(1)
//                         console.log(squaresArray)
//                     } else if(noughtIndices.includes(3) && noughtIndices.includes(4) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
//                     crossIndices.includes(3) && crossIndices.includes(4) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
//                     noughtIndices.includes(2) && noughtIndices.includes(8) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
//                     crossIndices.includes(2) && crossIndices.includes(8) && !noughtIndices.includes(5) && !crossIndices.includes(5)) {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(5)
//                         console.log(squaresArray)
//                     } else if(noughtIndices.includes(4) && noughtIndices.includes(5) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
//                     crossIndices.includes(4) && crossIndices.includes(5) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
//                     noughtIndices.includes(0) && noughtIndices.includes(6) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
//                     crossIndices.includes(0) && crossIndices.includes(6) && !noughtIndices.includes(3) && !crossIndices.includes(3)) {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(3)
//                         console.log(squaresArray)
//                     } else if(noughtIndices.includes(3) && noughtIndices.includes(5) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                     crossIndices.includes(3) && crossIndices.includes(5) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                     noughtIndices.includes(1) && noughtIndices.includes(7) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                     crossIndices.includes(1) && crossIndices.includes(7) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                     noughtIndices.includes(2) && noughtIndices.includes(6) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                     crossIndices.includes(2) && crossIndices.includes(6) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                     noughtIndices.includes(0) && noughtIndices.includes(8) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                     crossIndices.includes(0) && crossIndices.includes(8) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                     turns === 1 && !noughtIndices.includes(4) && !crossIndices.includes(4)) { //on first CPU turn, should pick centre if empty
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(4) //this is the centre square
//                         console.log(squaresArray)
//                     } else if(noughtIndices.includes(6) && noughtIndices.includes(7) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                     crossIndices.includes(6) && crossIndices.includes(7) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                     noughtIndices.includes(2) && noughtIndices.includes(5) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                     crossIndices.includes(2) && crossIndices.includes(5) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                     noughtIndices.includes(4) && noughtIndices.includes(0) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                     crossIndices.includes(4) && crossIndices.includes(0) && !noughtIndices.includes(8) && !crossIndices.includes(8)) {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(8)
//                         console.log(squaresArray)
//                     } else if(noughtIndices.includes(7) && noughtIndices.includes(8) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                     crossIndices.includes(7) && crossIndices.includes(8) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                     noughtIndices.includes(0) && noughtIndices.includes(3) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                     crossIndices.includes(0) && crossIndices.includes(3) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                     noughtIndices.includes(2) && noughtIndices.includes(4) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                     crossIndices.includes(2) && crossIndices.includes(4) && !noughtIndices.includes(6) && !crossIndices.includes(6)) {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(6)
//                         console.log(squaresArray)
//                     } else if(noughtIndices.includes(6) && noughtIndices.includes(8) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
//                     crossIndices.includes(6) && crossIndices.includes(8) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
//                     noughtIndices.includes(1) && noughtIndices.includes(4) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
//                     crossIndices.includes(1) && crossIndices.includes(4) && !noughtIndices.includes(7) && !crossIndices.includes(7)) {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         placeCPUSquare(7)
//                         console.log(squaresArray)
//                     } else {
//                         console.log("CPU TURN" + turns)
//                         console.log(squaresArray)
//                         // let r = 0
//                         // for (let i = 0; i < squaresArray.length; i++) {
//                         //     if(squaresArray[i] != "O" && squaresArray[i] != "X") {
//                         //         r = i
//                         //     }
//                         // }
//                         // placeCPUSquare(r)
//                         placeRandomSquare()
//                         console.log(squaresArray)
//                     }
//                 }
//             } else {
//                 console.log("correct move")
//                 if(noughtIndices.includes(0) && noughtIndices.includes(1) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                 crossIndices.includes(0) && crossIndices.includes(1) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                 noughtIndices.includes(5) && noughtIndices.includes(8) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                 crossIndices.includes(5) && crossIndices.includes(8) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                 noughtIndices.includes(4) && noughtIndices.includes(6) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
//                 crossIndices.includes(4) && crossIndices.includes(6) && !noughtIndices.includes(2) && !crossIndices.includes(2)) {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(2)
//                     console.log(squaresArray)
//                 } else if(noughtIndices.includes(1) && noughtIndices.includes(2) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                 crossIndices.includes(1) && crossIndices.includes(2) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                 noughtIndices.includes(3) && noughtIndices.includes(6) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                 crossIndices.includes(3) && crossIndices.includes(6) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                 noughtIndices.includes(4) && noughtIndices.includes(8) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
//                 crossIndices.includes(4) && crossIndices.includes(8) && !noughtIndices.includes(0) && !crossIndices.includes(0)) {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(0)
//                     console.log(squaresArray)
//                 } else if(noughtIndices.includes(0) && noughtIndices.includes(2) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
//                 crossIndices.includes(0) && crossIndices.includes(2) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
//                 noughtIndices.includes(4) && noughtIndices.includes(7) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
//                 crossIndices.includes(4) && crossIndices.includes(7) && !noughtIndices.includes(1) && !crossIndices.includes(1)) {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(1)
//                     console.log(squaresArray)
//                 } else if(noughtIndices.includes(3) && noughtIndices.includes(4) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
//                 crossIndices.includes(3) && crossIndices.includes(4) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
//                 noughtIndices.includes(2) && noughtIndices.includes(8) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
//                 crossIndices.includes(2) && crossIndices.includes(8) && !noughtIndices.includes(5) && !crossIndices.includes(5)) {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(5)
//                     console.log(squaresArray)
//                 } else if(noughtIndices.includes(4) && noughtIndices.includes(5) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
//                 crossIndices.includes(4) && crossIndices.includes(5) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
//                 noughtIndices.includes(0) && noughtIndices.includes(6) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
//                 crossIndices.includes(0) && crossIndices.includes(6) && !noughtIndices.includes(3) && !crossIndices.includes(3)) {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(3)
//                     console.log(squaresArray)
//                 } else if(noughtIndices.includes(3) && noughtIndices.includes(5) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                 crossIndices.includes(3) && crossIndices.includes(5) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                 noughtIndices.includes(1) && noughtIndices.includes(7) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                 crossIndices.includes(1) && crossIndices.includes(7) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                 noughtIndices.includes(2) && noughtIndices.includes(6) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                 crossIndices.includes(2) && crossIndices.includes(6) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                 noughtIndices.includes(0) && noughtIndices.includes(8) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                 crossIndices.includes(0) && crossIndices.includes(8) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
//                 turns === 1 && !noughtIndices.includes(4) && !crossIndices.includes(4)) { //on first CPU turn, should pick centre if empty
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(4) //this is the centre square
//                     console.log(squaresArray)
//                 } else if(noughtIndices.includes(6) && noughtIndices.includes(7) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                 crossIndices.includes(6) && crossIndices.includes(7) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                 noughtIndices.includes(2) && noughtIndices.includes(5) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                 crossIndices.includes(2) && crossIndices.includes(5) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                 noughtIndices.includes(4) && noughtIndices.includes(0) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
//                 crossIndices.includes(4) && crossIndices.includes(0) && !noughtIndices.includes(8) && !crossIndices.includes(8)) {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(8)
//                     console.log(squaresArray)
//                 } else if(noughtIndices.includes(7) && noughtIndices.includes(8) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                 crossIndices.includes(7) && crossIndices.includes(8) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                 noughtIndices.includes(0) && noughtIndices.includes(3) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                 crossIndices.includes(0) && crossIndices.includes(3) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                 noughtIndices.includes(2) && noughtIndices.includes(4) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
//                 crossIndices.includes(2) && crossIndices.includes(4) && !noughtIndices.includes(6) && !crossIndices.includes(6)) {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(6)
//                     console.log(squaresArray)
//                 } else if(noughtIndices.includes(6) && noughtIndices.includes(8) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
//                 crossIndices.includes(6) && crossIndices.includes(8) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
//                 noughtIndices.includes(1) && noughtIndices.includes(4) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
//                 crossIndices.includes(1) && crossIndices.includes(4) && !noughtIndices.includes(7) && !crossIndices.includes(7)) {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     placeCPUSquare(7)
//                     console.log(squaresArray)
//                 } else {
//                     console.log("CPU TURN" + turns)
//                     console.log(squaresArray)
//                     // let r = 0
//                     // for (let i = 0; i < squaresArray.length; i++) {
//                     //     if(squaresArray[i] != "O" && squaresArray[i] != "X") {
//                     //         r = i
//                     //     }
//                     // }
//                     // placeCPUSquare(r)
//                     placeRandomSquare()
//                     console.log(squaresArray)
//                 }
//             }
//             if (cheatBox.checked) {
//                 //console.log("Cheat")
//                 let cheatChance = 0
//                 if(difficulty > 5) {
//                     cheatChance = 100
//                 }
//                 if(difficulty > 6) {
//                     cheatChance = 50
//                 }
//                 if(difficulty > 7) {
//                     cheatChance = 20
//                 }
//                 if(difficulty > 8) {
//                     cheatChance = 10
//                 }
//                 if(difficulty > 9) {
//                     cheatChance = 5
//                 }
//                 if(cheatChance > 0) {
//                     const r = Math.floor(Math.random() * cheatChance) + 1
//                     console.log("random cheat attempt" + r)
//                     if(r === 1) {
//                         console.log("cheat success")
//                         player1Turn = false
//                         turns--
//                         cheats++
//                         placeRandomSquare()
//                     }
//                 }
//             }
//         }
//     }
// }

// function wait(timeout) {
//     return new Promise(resolve => {
//         setTimeout(resolve, timeout);
//     });
// }

// function placeCPUSquare(num) {
//     const CPUSquare = document.getElementById("square-" + (num + 1))
//     const CPUSquaresArrayIndex = squaresArray.indexOf(num + 1)
//     CPUSquare.style.backgroundImage = "url(cross.png)"
//     CPUSquare.classList.add("cross")
//     flipSquare.play()
//     squaresArray.splice(CPUSquaresArrayIndex,1,"X")
//     player1Turn = true
//     turns++
//     message.innerText="Player 1, place your O"
//     instructions.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
//     mobileInfo.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
//     //console.log(turns)
//     checkWin()
// }

// function placeRandomSquare() {
//     //const r = Math.floor(Math.random() * 9) + 1
//     const r = Math.floor(Math.random() * 8) + 0
//     console.log(r)
//     let noughtIndices = squaresArray.map((e,i) => e==="O" ? i : "")
//     let crossIndices = squaresArray.map((e,i) => e==="X" ? i : "")

//     if (noughtIndices.includes(r) || crossIndices.includes(r)) {
//         placeRandomSquare()
//     } else {
//         placeCPUSquare(r)
//     }
//     // if (squaresArray[r] != "O" && squaresArray[r] != "X") {
//     //     placeCPUSquare(r)
//     // } else {
//     //     placeRandomSquare()
//     // }
// }

// function handleTurnMulti(num) {
//     const currentSquare = document.getElementById("square-" + num)
//     //console.log(currentSquare)
//     const containsNought = currentSquare.classList.contains("nought")
//     const containsCross = currentSquare.classList.contains("cross")
//     const squaresArrayIndex = squaresArray.indexOf(num)
//     if(!containsCross && !containsNought && gameStart && !gameOver) {
//         flipSquare.play()
//         if(player1Turn) {
//             currentSquare.style.backgroundImage = "url(nought.png)"
//             currentSquare.classList.add("nought")
//             squaresArray.splice(squaresArrayIndex,1,"O")
//             player1Turn = false
//             message.innerText="Player 2, place your X"
//         } else { //if player2Turn
//             currentSquare.style.backgroundImage = "url(cross.png)"
//             currentSquare.classList.add("cross")
//             squaresArray.splice(squaresArrayIndex,1,"X")
//             player1Turn = true
//             message.innerText="Player 1, place your O"
//         }
//         turns++
//         instructions.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
//         mobileInfo.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
//         console.log(turns)
//         checkWin()
//     }
// }

// async function checkWin() {
//     let noughtIndices = squaresArray.map((e,i) => e==="O" ? i : "")
//     let crossIndices = squaresArray.map((e,i) => e==="X" ? i : "")
//     //console.log("O", noughtIndices, "X", crossIndices)
//     //console.log(noughtIndices)
//     if(noughtIndices.includes(0) && noughtIndices.includes(1) && noughtIndices.includes(2) ||
//        noughtIndices.includes(6) && noughtIndices.includes(7) && noughtIndices.includes(8) ||
//        noughtIndices.includes(0) && noughtIndices.includes(4) && noughtIndices.includes(8) ||
//        noughtIndices.includes(2) && noughtIndices.includes(4) && noughtIndices.includes(6) ||
//        noughtIndices.includes(3) && noughtIndices.includes(4) && noughtIndices.includes(5) ||
//        noughtIndices.includes(1) && noughtIndices.includes(4) && noughtIndices.includes(7) ||
//        noughtIndices.includes(0) && noughtIndices.includes(3) && noughtIndices.includes(6) ||
//        noughtIndices.includes(2) && noughtIndices.includes(5) && noughtIndices.includes(8)) {
//         //console.log("Player 1 Wins!")
//         message.innerText="Player 1 wins this round!"
//         instructions.innerText="END OF ROUND"
//         mobileInfo.innerText="END OF ROUND"
//         miniRetry.style.display = "none"
//         mouse.firstChild.src="greenMouseHappy.png"
//         cat.firstChild.src="redCatAngry.png"
//         updateScore(1)
//         gameOver = true
//         //console.log(player1Score)
//         //console.log(typeof(player1Score))
//         //console.log(goal)
//         //console.log(typeof(goal))
//         if(player1Score === parseInt(goal)) {
//             //console.log("Player 1 Wins!")
//             message.innerText="Congrats Player 1, you win the game!"
//             instructions.innerText="GAME OVER"
//             mobileInfo.innerText="GAME OVER"
//             miniRetry.style.display = "none"
//             mouse.firstChild.src="greenMouseHappy.png"
//             cat.firstChild.src="redCatAngry.png"
//             gameOver = true
//             if (singlePlayer) {
//                 p1WinSound.play()
//             } else {
//                 winGong.play()
//             }
//             await wait(3000); //wait 3 seconds
//             options.style.display = "none"
//             gameBoard.style.display = "none"
//             miniRetry.style.display = "none"
//             endOptions.style.display = "inline" //when game ends, want option to start over
//             continueG.style.display = "none"
//             return
//         }
//         if (singlePlayer) {
//             p1WinSound.play()
//         } else {
//             winGong.play()
//         }
//         await wait(3000); //wait 3 seconds
//         options.style.display = "none"
//         gameBoard.style.display = "none"
//         miniRetry.style.display = "none"
//         endOptions.style.display = "inline" //when game ends, want option to start over
//        }
//     if(crossIndices.includes(0) && crossIndices.includes(1) && crossIndices.includes(2) ||
//        crossIndices.includes(6) && crossIndices.includes(7) && crossIndices.includes(8) ||
//        crossIndices.includes(0) && crossIndices.includes(4) && crossIndices.includes(8) ||
//        crossIndices.includes(2) && crossIndices.includes(4) && crossIndices.includes(6) ||
//        crossIndices.includes(3) && crossIndices.includes(4) && crossIndices.includes(5) ||
//        crossIndices.includes(1) && crossIndices.includes(4) && crossIndices.includes(7) ||
//        crossIndices.includes(0) && crossIndices.includes(3) && crossIndices.includes(6) ||
//        crossIndices.includes(2) && crossIndices.includes(5) && crossIndices.includes(8)) {
//         //console.log("Player 2 Wins!")
//         message.innerText="Player 2 wins this round!"
//         instructions.innerText="END OF ROUND"
//         mobileInfo.innerText="END OF ROUND"
//         miniRetry.style.display = "none"
//         mouse.firstChild.src="greenMouseSad.png"
//         cat.firstChild.src="redCatHappy.png"
//         updateScore(2)
//         gameOver = true
//         if(player2Score === parseInt(goal)) {
//             //console.log("Player 2 Wins!")
//             message.innerText="Congrats Player 2, you win the game!"
//             instructions.innerText="GAME OVER"
//             mobileInfo.innerText="GAME OVER"
//             miniRetry.style.display = "none"
//             mouse.firstChild.src="greenMouseSad.png"
//             cat.firstChild.src="redCatHappy.png"
//             gameOver = true
//             if (singlePlayer) {
//                 p2WinSound.play()
//             } else {
//                 winGong.play()
//             }
//             await wait(3000); //wait 3 seconds
//             options.style.display = "none"
//             gameBoard.style.display = "none"
//             miniRetry.style.display = "none"
//             endOptions.style.display = "inline" //when game ends, want option to start over
//             continueG.style.display = "none"
//             return
//         }
//         if (singlePlayer) {
//             p2WinSound.play()
//         } else {
//             winGong.play()
//         }
//         await wait(3000); //wait 3 seconds
//         options.style.display = "none"
//         gameBoard.style.display = "none"
//         miniRetry.style.display = "none"
//         endOptions.style.display = "inline"
//        }
//     if (turns === 9 && gameOver === false ||
//         cheats === 1 && turns === 8 && gameOver === false ||
//         cheats === 2 && turns === 7 && gameOver === false ||
//         cheats === 3 && turns === 6 && gameOver === false) {
//         //console.log("It's a Draw!")
//         message.innerText="It's a Draw!"
//         instructions.innerText="END OF ROUND"
//         mobileInfo.innerText="END OF ROUND"
//         miniRetry.style.display = "none"
//         mouse.firstChild.src="greenMouseSad.png"
//         cat.firstChild.src="redCatAngry.png"
//         gameOver = true
//         drawGong.play()
//         await wait(3000); //wait 3 seconds
//         options.style.display = "none"
//         gameBoard.style.display = "none"
//         miniRetry.style.display = "none"
//         endOptions.style.display = "inline"
//     }
// }

// function updateScore(player) {
//     if(player === 1) {
//         player1Score++
//         p1ScoreBoard.innerText=player1Score
//     } else {
//         player2Score++
//         p2ScoreBoard.innerText=player2Score
//     }
//     if(singlePlayer) {
//         scoreDifference = player1Score - player2Score
//         //console.log("difference = " + scoreDifference)
//     }
//     if(dynamicDifficultyBox.checked) {
//         if(scoreDifference > 0) { //if score difference greater than 0, player 1 (human) is winning
//             difficulty++ //so difficulty increases
//             //console.log("difficulty increased")
//         } else if(scoreDifference < 0 ) { //if score difference less than 0, player 1 (human) is losing
//             difficulty-- //so difficulty decreases
//             //console.log("difficulty decreased")
//         }
//         //console.log("difficulty = " + difficulty)
//     }
// }

// function startOver() {
//     restartGong.play()
//     player1Turn = true
//     gameStart = false
//     gameOver = false
//     retry.disabled = true
//     startButton.disabled = false
//     turns = 0
//     cheats = 0
//     squaresArray = [1,2,3,4,5,6,7,8,9]

//     for(let i = 1; i < 10; i++) {
//         //console.log("WORKING")
//         const currentSquare = document.getElementById("square-" + i)
//         currentSquare.style.backgroundImage = "url(blank.png)"
//         currentSquare.classList.remove("nought")
//         currentSquare.classList.remove("cross")
//     }

//     message.innerText="Select a mode, and click START to begin!"
//     instructions.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
//     mobileInfo.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
//     mouse.firstChild.src="greenMouse.png"
//     cat.firstChild.src="redCat.png"
//     options.style.display = "inline" //before starting game, only want options visible
//     difficulty = 5
//     difficultySlider.value = 5
//     gameBoard.style.display = "none"
//     miniRetry.style.display = "none"
//     continueG.style.display = "inline"
//     endOptions.style.display = "none"

//     player1Score = 0
//     p1ScoreBoard.innerText=player1Score
//     player2Score = 0
//     p2ScoreBoard.innerText=player2Score
//}