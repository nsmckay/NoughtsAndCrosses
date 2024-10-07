const clickButton = document.getElementById("click-button")
const startJingle = document.getElementById("start-jingle")
const bonkSound = document.getElementById("bonk-sound")
const bonkSound2 = document.getElementById("bonk-sound-2")
const bonkSound3 = document.getElementById("bonk-sound-3")
const bonkSound4 = document.getElementById("bonk-sound-4")
const bonkSound5 = document.getElementById("bonk-sound-5")
const bonkSound6 = document.getElementById("bonk-sound-6")
const bonkSound7 = document.getElementById("bonk-sound-7")
const bonkSound8 = document.getElementById("bonk-sound-8")
const bonkSound9 = document.getElementById("bonk-sound-9")
const bonkSound10 = document.getElementById("bonk-sound-10")
const bonkSound11 = document.getElementById("bonk-sound-11")
const bonkSound12 = document.getElementById("bonk-sound-12")
const bonkSound13 = document.getElementById("bonk-sound-13")
const mouseScream = document.getElementById("mouse-scream")
mouseScream.volume = 0.5
const mouseScream2 = document.getElementById("mouse-scream-2")
mouseScream2.volume = 0.5
const mouseScream3 = document.getElementById("mouse-scream-3")
mouseScream3.volume = 0.5
const mouseScream4 = document.getElementById("mouse-scream-4")
mouseScream4.volume = 0.5
const goldHit = document.getElementById("gold-hit")
const timerHit = document.getElementById("timer-hit")
const multiHit = document.getElementById("multi-hit")
const catScream = document.getElementById("cat-scream")
catScream.volume = 0.5
const catScream2 = document.getElementById("cat-scream-2")
catScream2.volume = 0.5
const catScream3 = document.getElementById("cat-scream-3")
catScream3.volume = 0.5
const catScream4 = document.getElementById("cat-scream-4")
const catScream5 = document.getElementById("cat-scream-5")
const catScream6 = document.getElementById("cat-scream-6")

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
const radioEasy = document.getElementById("difficulty-easy")
const radioMedium = document.getElementById("difficulty-medium")
const radioHard = document.getElementById("difficulty-hard")
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

let gameDifficulty = 0; //easy
let currentMoleSquare
let currentMole2Square
let currentGreaterMoleSquare
let currentGreaterMole2Square
let currentGoldMoleSquare
let currentTimerMoleSquare
let currentMultiMoleSquare
let currentBadMoleSquare
let currentBadMole2Square
let currentBadMole3Square
let currentVeryBadMoleSquare
let currentVeryBadMole2Square
let currentKillerMoleSquare
let gameScore = 0;
let gameTime = 0;
let gameOver = false
let moleHit = 0
let intervalMole
let mole2Hit = 0
let intervalMole2
let greaterMoleHit = 0
let intervalGreaterMole
let greaterMole2Hit = 0
let intervalGreaterMole2
let goldMoleHit = 0
let intervalGoldMole
let timerMoleHit = 0
let intervalTimerMole
let multiMoleHit = 0
let intervalMultiMole
let badMoleHit = 0
let intervalBadMole
let badMole2Hit = 0
let intervalBadMole2
let badMole3Hit = 0
let intervalBadMole3
let veryBadMoleHit = 0
let intervalVeryBadMole
let veryBadMole2Hit = 0
let intervalVeryBadMole2
let killerMoleHit = 0
let intervalKillerMole
let intervalTime
let intervalEnd

// radioSingle.addEventListener("click", updateInstructions)
// radioMulti.addEventListener("click", updateInstructions)
// startButton.addEventListener("click", startGame)
// retry.addEventListener("click", startOver)
// retry.disabled = true
// miniRetry.addEventListener("click", startOver)
// continueG.addEventListener("click", continueGame)
radioEasy.addEventListener("click", updateDifficulty)
radioMedium.addEventListener("click", updateDifficulty)
radioHard.addEventListener("click", updateDifficulty)
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

const delay = ms => new Promise(res => setTimeout(res, ms)); //utility function for synchronous delay
//thanks to https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line

function updateDifficulty() {
    clickButton.play()
    if(radioEasy.checked) {
        gameDifficulty = 0 //easy
    } else if (radioMedium.checked) {
        gameDifficulty = 1 //medium
    } else {
        gameDifficulty = 2 //hard
    }
    //console.log(gameDifficulty)
}

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
    // for(let i = 0; i < 9; i++) {
    //     let moleSquare = document.createElement("div")
    //     moleSquare.id = i.toString()
    //     moleSquare.addEventListener("click", selectSquare)
    //     grid.appendChild(moleSquare)
    // }
    if (gameDifficulty === 2) {
        //set up 5 X 5 grid
        //grid.setAttribute("style", "width:500px")
        // grid.setAttribute("style", "height:500px")
        grid.style.width = 500
        grid.style.height = 500
        for(let i = 0; i < 25; i++) {
            let moleSquare = document.createElement("div")
            moleSquare.id = i.toString()
            moleSquare.addEventListener("click", selectSquare)
            grid.appendChild(moleSquare)
        }
        gameTime = 120
    } else if (gameDifficulty === 1) {
        //set up 4 X 4 grid
        grid.style.width = 400
        grid.style.height = 400
        for(let i = 0; i < 16; i++) {
            let moleSquare = document.createElement("div")
            moleSquare.id = i.toString()
            moleSquare.addEventListener("click", selectSquare)
            grid.appendChild(moleSquare)
        }
        gameTime = 60
    } else {
        //set up 3 X 3 grid
        grid.style.width = 300
        grid.style.height = 300
        for(let i = 0; i < 9; i++) {
            let moleSquare = document.createElement("div")
            moleSquare.id = i.toString()
            moleSquare.addEventListener("click", selectSquare)
            grid.appendChild(moleSquare)
        }
        gameTime = 30
    }
    //gameTime = 30
    timeCard.display="inline"
    timeCard.innerText = "TIME: " + gameTime.toString()
    boardHeader.classList.add("board-header-duo")
    boardHeader.classList.remove("board-header-mono")
    if(gameDifficulty === 2) {
        intervalMole = setInterval(setMole, 2000) //call mole every 2 seconds
        intervalMole2 = setInterval(setMole2, 2000) 
        intervalGreaterMole = setInterval(setGreaterMole, 3000)
        intervalGreaterMole2 = setInterval(setGreaterMole2, 3000)
        intervalGoldMole = setInterval(setGoldMole, 20000)
        intervalTimerMole = setInterval(setTimerMole, 5000)
        intervalMultiMole = setInterval(setMultiMole, 5000)
        intervalBadMole = setInterval(setBadMole, 3000) //call bad mole every 3 seconds
        intervalBadMole2 = setInterval(setBadMole2, 3000)
        intervalBadMole3 = setInterval(setBadMole3, 3000)
        intervalVeryBadMole = setInterval(setVeryBadMole, 5000)
        intervalVeryBadMole2 = setInterval(setVeryBadMole2, 5000)
        intervalKillerMole = setInterval(setKillerMole, 10000)
    } else if(gameDifficulty === 1) {
        intervalMole = setInterval(setMole, 2000)
        intervalGreaterMole = setInterval(setGreaterMole, 3000)
        intervalBadMole = setInterval(setBadMole, 3000)
        intervalVeryBadMole = setInterval(setVeryBadMole, 5000)
    } else {
        intervalMole = setInterval(setMole, 2000)
        intervalMole2 = setInterval(setMole2, 2000) 
        intervalBadMole = setInterval(setBadMole, 3000)
    }
    intervalTime = setInterval(tick, 1000) //reduce timer by 1 each second
}

async function setMole() {
    if(gameOver) {
        return
    }

    if(currentMoleSquare) {
        currentMoleSquare.innerHTML = ""
        // if(currentMoleSquare.lastChild.classList.contains("popDownMole")) {
        //     currentMoleSquare.lastChild.classList.remove("popDownMole")
        // }
        // currentMoleSquare.lastChild.classList.remove("popDownMole")
    }

    let mole = document.createElement("img")
    mole.src = "img/greyMouse.png"

    let randomNum = getRandomSquare()
    //check to ensure no collisions
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreater2MoleSquare.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentMoleSquare = document.getElementById(randomNum)
    currentMoleSquare.appendChild(mole)
    moleHit = 0 //make mole whackable
    currentMoleSquare.lastChild.classList.add("popUpMole")
    console.log("mole pop up")
    // setTimeout(() => {
    //     // stayMole("mole")
    //     pauseMole("mole")
    // }, 1000)
    await delay(500)
    if(gameOver) {
        return
    }
    currentMoleSquare.lastChild.classList.remove("popUpMole")
    // pauseMole("mole")
    // setTimeout(() => {
    //     removeMole("mole")
    // }, 1000)
    await delay(1000)
    if(gameOver) {
        return
    }
    removeMole("mole")
}

async function setMole2() {
    if(gameOver) {
        return
    }

    if(currentMole2Square) {
        currentMole2Square.innerHTML = ""
    }

    let mole2 = document.createElement("img")
    mole2.src = "img/greyMouse.png"

    let randomNum = getRandomSquare()
    //check to ensure no collisions
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentMole2Square = document.getElementById(randomNum)
    currentMole2Square.appendChild(mole2)
    mole2Hit = 0 //make mole whackable
    currentMole2Square.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentMole2Square.lastChild.classList.remove("popUpMole")
    // pauseMole("mole2")
    await delay(1000)
    if(gameOver) {
        return
    }
    removeMole("mole2")
}

async function setGreaterMole() {
    if(gameOver) {
        return
    }

    if(currentGreaterMoleSquare) {
        currentGreaterMoleSquare.innerHTML = ""
    }

    let greaterMole = document.createElement("img")
    greaterMole.src = "img/brownMouse.png"

    let randomNum = getRandomSquare()
    //check to ensure no collisions
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentGreaterMoleSquare = document.getElementById(randomNum)
    currentGreaterMoleSquare.appendChild(greaterMole)
    greaterMoleHit = 0 //make mole whackable
    currentGreaterMoleSquare.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentGreaterMoleSquare.lastChild.classList.remove("popUpMole")
    // pauseMole("greaterMole")
    await delay(500)
    if(gameOver) {
        return
    }
    removeMole("greaterMole")
}

async function setGreaterMole2() {
    if(gameOver) {
        return
    }

    if(currentGreaterMole2Square) {
        currentGreaterMole2Square.innerHTML = ""
    }

    let greaterMole2 = document.createElement("img")
    greaterMole2.src = "img/brownMouse.png"

    let randomNum = getRandomSquare()
    //check to ensure no collisions
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentGreaterMole2Square = document.getElementById(randomNum)
    currentGreaterMole2Square.appendChild(greaterMole2)
    greaterMole2Hit = 0 //make mole whackable
    currentGreaterMole2Square.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentGreaterMole2Square.lastChild.classList.remove("popUpMole")
    // pauseMole("greaterMole2")
    await delay(500)
    if(gameOver) {
        return
    }
    removeMole("greaterMole2")
}

async function setGoldMole() {
    if(gameOver) {
        return
    }

    if(currentGoldMoleSquare) {
        currentGoldMoleSquare.innerHTML = ""
    }

    let goldMole = document.createElement("img")
    goldMole.src = "img/goldMouse.png"

    let randomNum = getRandomSquare()
    //check to ensure no collisions
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentGoldMoleSquare = document.getElementById(randomNum)
    currentGoldMoleSquare.appendChild(goldMole)
    goldMoleHit = 0 //make mole whackable
    currentGoldMoleSquare.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentGoldMoleSquare.lastChild.classList.remove("popUpMole")
    // pauseMole("goldMole")
    await delay(100)
    if(gameOver) {
        return
    }
    removeMole("goldMole")
}

async function setTimerMole() {
    if(gameOver) {
        return
    }

    if(currentTimerMoleSquare) {
        currentTimerMoleSquare.innerHTML = ""
    }

    let timerMole = document.createElement("img")
    timerMole.src = "img/greenMouse.png"

    let randomNum = getRandomSquare()
    //check to ensure no collisions
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentTimerMoleSquare = document.getElementById(randomNum)
    currentTimerMoleSquare.appendChild(timerMole)
    timerMoleHit = 0 //make mole whackable
    currentTimerMoleSquare.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentTimerMoleSquare.lastChild.classList.remove("popUpMole")
    await delay(200)
    if(gameOver) {
        return
    }
    removeMole("timerMole")
}

async function setMultiMole() {
    if(gameOver) {
        return
    }

    if(currentMultiMoleSquare) {
        currentMultiMoleSquare.innerHTML = ""
    }

    let multiMole = document.createElement("img")
    multiMole.src = "img/blueMouse.png"

    let randomNum = getRandomSquare()
    //check to ensure no collisions
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentMultiMoleSquare = document.getElementById(randomNum)
    currentMultiMoleSquare.appendChild(multiMole)
    multiMoleHit = 0 //make mole whackable
    currentMultiMoleSquare.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentMultiMoleSquare.lastChild.classList.remove("popUpMole")
    await delay(2000)
    if(gameOver) {
        return
    }
    removeMole("multiMole")
}

async function setBadMole() {
    if(gameOver) {
        return
    }

    if(currentBadMoleSquare) {
        currentBadMoleSquare.innerHTML = ""
    }

    let badMole = document.createElement("img")
    badMole.src = "img/orangeCat.png"

    let randomNum = getRandomSquare()
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentBadMoleSquare = document.getElementById(randomNum)
    currentBadMoleSquare.appendChild(badMole)
    badMoleHit = 0  //make bad mole whackable
    currentBadMoleSquare.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentBadMoleSquare.lastChild.classList.remove("popUpMole")
    await delay(2000)
    if(gameOver) {
        return
    }
    removeMole("badMole")
}

async function setBadMole2() {
    if(gameOver) {
        return
    }

    if(currentBadMole2Square) {
        currentBadMole2Square.innerHTML = ""
    }

    let badMole2 = document.createElement("img")
    badMole2.src = "img/orangeCat.png"

    let randomNum = getRandomSquare()
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentBadMole2Square = document.getElementById(randomNum)
    currentBadMole2Square.appendChild(badMole2)
    badMole2Hit = 0  //make bad mole whackable
    currentBadMole2Square.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentBadMole2Square.lastChild.classList.remove("popUpMole")
    await delay(2000)
    if(gameOver) {
        return
    }
    removeMole("badMole2")
}

async function setBadMole3() {
    if(gameOver) {
        return
    }

    if(currentBadMole3Square) {
        currentBadMole3Square.innerHTML = ""
    }

    let badMole3 = document.createElement("img")
    badMole3.src = "img/orangeCat.png"

    let randomNum = getRandomSquare()
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentBadMole3Square = document.getElementById(randomNum)
    currentBadMole3Square.appendChild(badMole3)
    badMole3Hit = 0  //make bad mole whackable
    currentBadMole3Square.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentBadMole3Square.lastChild.classList.remove("popUpMole")
    await delay(2000)
    if(gameOver) {
        return
    }
    removeMole("badMole3")
}

async function setVeryBadMole() {
    if(gameOver) {
        return
    }

    if(currentVeryBadMoleSquare) {
        currentVeryBadMoleSquare.innerHTML = ""
    }

    let veryBadMole = document.createElement("img")
    veryBadMole.src = "img/redCat.png"

    let randomNum = getRandomSquare()
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentVeryBadMoleSquare = document.getElementById(randomNum)
    currentVeryBadMoleSquare.appendChild(veryBadMole)
    veryBadMoleHit = 0  //make bad mole whackable
    currentVeryBadMoleSquare.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentVeryBadMoleSquare.lastChild.classList.remove("popUpMole")
    await delay(1000)
    if(gameOver) {
        return
    }
    removeMole("veryBadMole")
}

async function setVeryBadMole2() {
    if(gameOver) {
        return
    }

    if(currentVeryBadMole2Square) {
        currentVeryBadMole2Square.innerHTML = ""
    }

    let veryBadMole2 = document.createElement("img")
    veryBadMole2.src = "img/redCat.png"

    let randomNum = getRandomSquare()
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentKillerMoleSquare && currentKillerMoleSquare.id === randomNum) {
        return
    }
    currentVeryBadMole2Square = document.getElementById(randomNum)
    currentVeryBadMole2Square.appendChild(veryBadMole2)
    veryBadMole2Hit = 0  //make bad mole whackable
    currentVeryBadMole2Square.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentVeryBadMole2Square.lastChild.classList.remove("popUpMole")
    await delay(1000)
    if(gameOver) {
        return
    }
    removeMole("veryBadMole2")
}

async function setKillerMole() {
    if(gameOver) {
        return
    }

    if(currentKillerMoleSquare) {
        currentKillerMoleSquare.innerHTML = ""
    }

    let killerMole = document.createElement("img")
    killerMole.src = "img/purpleCat.png"

    let randomNum = getRandomSquare()
    if(currentMoleSquare && currentMoleSquare.id === randomNum) {
        return
    }
    if(currentMole2Square && currentMole2Square.id === randomNum) {
        return
    }
    if(currentGreaterMoleSquare && currentGreaterMoleSquare.id === randomNum) {
        return
    }
    if(currentGreaterMole2Square && currentGreaterMole2Square.id === randomNum) {
        return
    }
    if(currentGoldMoleSquare && currentGoldMoleSquare.id === randomNum) {
        return
    }
    if(currentTimerMoleSquare && currentTimerMoleSquare.id === randomNum) {
        return
    }
    if(currentMultiMoleSquare && currentMultiMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMoleSquare && currentBadMoleSquare.id === randomNum) {
        return
    }
    if(currentBadMole2Square && currentBadMole2Square.id === randomNum) {
        return
    }
    if(currentBadMole3Square && currentBadMole3Square.id === randomNum) {
        return
    }
    if(currentVeryBadMoleSquare && currentVeryBadMoleSquare.id === randomNum) {
        return
    }
    if(currentVeryBadMole2Square && currentVeryBadMole2Square.id === randomNum) {
        return
    }
    currentKillerMoleSquare = document.getElementById(randomNum)
    currentKillerMoleSquare.appendChild(killerMole)
    killerMoleHit = 0  //make bad mole whackable
    currentKillerMoleSquare.lastChild.classList.add("popUpMole")
    await delay(500)
    if(gameOver) {
        return
    }
    currentKillerMoleSquare.lastChild.classList.remove("popUpMole")
    await delay(200)
    if(gameOver) {
        return
    }
    removeMole("killerMole")
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
    //let num = Math.floor(Math.random() * 9) //return integer 0-8
    let num = 0
    if (gameDifficulty === 2) {
        num = Math.floor(Math.random() * 25) //return integer 0-24
    } else if (gameDifficulty === 1) {
        num = Math.floor(Math.random() * 16) //return integer 0-15
    } else {
        num = Math.floor(Math.random() * 9) //return integer 0-8
    }
    return num.toString()
}

// function stayMole(moleType) {
//     if(moleType === "mole") {
//         currentMoleSquare.lastChild.src = "img/greyMouseKO.png"
//         currentMoleSquare.lastChild.classList.remove("popUpMole")
//         currentMoleSquare.lastChild.classList.add("popStayMole")
//     }
//     if(moleType === "mole2") {
//         currentMoleSquare.lastChild.src = "img/greyMouseKO.png"
//     }
// }

// function pauseMole(moleType) {
//     if(moleType === "mole") {
//         // currentMoleSquare.lastChild.classList.remove("popUpMole")
//         // currentMoleSquare.lastChild.classList.add("pauseMole")
//         console.log("mole paused")
//         // setTimeout(() => {currentMoleSquare.lastChild.classList.remove("pauseMole"), 2000})
//     }
//     if(moleType === "mole2") {
//         // currentMoleSquare.lastChild.src = "img/greyMouseKO.png"
//     }
//     if(moleType === "greaterMole") {
//         //greaterMole
//     }
// }

async function removeMole(moleType) {
    if(moleType === "mole") {
        //currentMoleSquare.lastChild.src = "img/greyMouseKO.png"
        // currentMoleSquare.lastChild.classList.remove("popStayMole")
        // currentMoleSquare.lastChild.classList.remove("popUpMole")
        currentMoleSquare.lastChild.classList.add("popDownMole")
        console.log("mole pop down")
        // setTimeout(() => {
        //     currentMoleSquare.removeChild(currentMoleSquare.lastChild)
        // }, 500)
        await delay(500)
        if(gameOver) {
            return
        }
        currentMoleSquare.removeChild(currentMoleSquare.lastChild)
        console.log("mole removed")
    }
    if(moleType === "mole2") {
        // currentMoleSquare.lastChild.src = "img/greyMouseKO.png"
        // setTimeout(() => {
        //     currentMoleSquare.removeChild(currentMoleSquare.lastChild)
        // }, 500)
        //currentMoleSquare.removeChild(currentMoleSquare.lastChild)
        currentMole2Square.lastChild.classList.add("popDownMole")
        await delay(500)
        if (gameOver) {
            return
        }
        currentMole2Square.removeChild(currentMole2Square.lastChild)
    }
    if(moleType === "greaterMole") {
        currentGreaterMoleSquare.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentGreaterMoleSquare.removeChild(currentGreaterMoleSquare.lastChild)
    }
    if(moleType === "greaterMole2") {
        currentGreaterMole2Square.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentGreaterMole2Square.removeChild(currentGreaterMole2Square.lastChild)
    }
    if(moleType === "goldMole") {
        currentGoldMoleSquare.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentGoldMoleSquare.removeChild(currentGoldMoleSquare.lastChild)
    }
    if(moleType === "timerMole") {
        currentTimerMoleSquare.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentTimerMoleSquare.removeChild(currentTimerMoleSquare.lastChild)
    }
    if(moleType === "multiMole") {
        currentMultiMoleSquare.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentMultiMoleSquare.removeChild(currentMultiMoleSquare.lastChild)
    }
    if(moleType === "badMole") {
        currentBadMoleSquare.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentBadMoleSquare.removeChild(currentBadMoleSquare.lastChild)
    }
    if(moleType === "badMole2") {
        currentBadMole2Square.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentBadMole2Square.removeChild(currentBadMole2Square.lastChild)
    }
    if(moleType === "badMole3") {
        currentBadMole3Square.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentBadMole3Square.removeChild(currentBadMole3Square.lastChild)
    }
    if(moleType === "veryBadMole") {
        currentVeryBadMoleSquare.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentVeryBadMoleSquare.removeChild(currentVeryBadMoleSquare.lastChild)
    }
    if(moleType === "veryBadMole2") {
        currentVeryBadMole2Square.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentVeryBadMole2Square.removeChild(currentVeryBadMole2Square.lastChild)
    }
    if(moleType === "killerMole") {
        currentKillerMoleSquare.lastChild.classList.add("popDownMole")
        await delay(500)
        if(gameOver) {
            return
        }
        currentKillerMoleSquare.removeChild(currentKillerMoleSquare.lastChild)
    }
}

function selectSquare() {
    if(gameOver) {
        return
    }
    
    if(this===currentMoleSquare) {
        if(moleHit === 1) {
            return
        }
        bonkSound.play()
        mouseScream.play()
        currentMoleSquare.lastChild.src = "img/greyMouseKO.png"
        gameScore += 20
        moleHit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentMole2Square) {
        if(mole2Hit === 1) {
            return
        }
        bonkSound2.play()
        mouseScream2.play()
        currentMole2Square.lastChild.src = "img/greyMouseKO.png"
        gameScore += 20
        mole2Hit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentGreaterMoleSquare) {
        if(greaterMoleHit === 1) {
            return
        }
        bonkSound3.play()
        mouseScream3.play()
        currentGreaterMoleSquare.lastChild.src = "img/brownMouseKO.png"
        gameScore += 50
        greaterMoleHit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentGreaterMole2Square) {
        if(greaterMole2Hit === 1) {
            return
        }
        bonkSound4.play()
        mouseScream4.play()
        currentGreaterMole2Square.lastChild.src = "img/brownMouseKO.png"
        gameScore += 50
        greaterMole2Hit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentGoldMoleSquare) {
        if(goldMoleHit === 1) {
            return
        }
        bonkSound5.play()
        goldHit.play()
        currentGoldMoleSquare.lastChild.src = "img/goldMouseKO.png"
        gameScore += 200
        goldMoleHit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentTimerMoleSquare) {
        if(timerMoleHit === 1) {
            return
        }
        bonkSound6.play()
        timerHit.play()
        currentTimerMoleSquare.lastChild.src = "img/greenMouseKO.png"
        gameScore += 10
        gameTime += 10
        timerMoleHit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
        timeCard.innerText = "TIME: " + gameTime.toString()
    }
    else if (this===currentMultiMoleSquare) {
        if(multiMoleHit === 10) {
            return
        }
        bonkSound7.play()
        multiHit.play()
        currentMultiMoleSquare.lastChild.src = "img/blueMouseKO.png"
        gameScore += 10
        multiMoleHit += 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentBadMoleSquare) {
        //gameOverNow()
        if(badMoleHit === 1) {
            return
        }
        bonkSound8.play()
        catScream.play()
        currentBadMoleSquare.lastChild.src = "img/orangeCatKO.png"
        gameScore -= 50
        badMoleHit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentBadMole2Square) {
        //gameOverNow()
        if(badMole2Hit === 1) {
            return
        }
        bonkSound9.play()
        catScream2.play()
        currentBadMole2Square.lastChild.src = "img/orangeCatKO.png"
        gameScore -= 50
        badMole2Hit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentBadMole3Square) {
        //gameOverNow()
        if(badMole3Hit === 1) {
            return
        }
        bonkSound10.play()
        catScream3.play()
        currentBadMole3Square.lastChild.src = "img/orangeCatKO.png"
        gameScore -= 50
        badMole3Hit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
    }
    else if (this===currentVeryBadMoleSquare) {
        //gameOverNow()
        if(veryBadMoleHit === 1) {
            return
        }
        bonkSound11.play()
        catScream4.play()
        currentVeryBadMoleSquare.lastChild.src = "img/redCatKO.png"
        gameScore -= 100
        gameTime -= 20
        veryBadMoleHit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
        timeCard.innerText = "TIME: " + gameTime.toString()
        if (gameTime < 0) {
            gameOverNow()
            timeCard.innerText = "TIME: 0"
        }
    }
    else if (this===currentVeryBadMole2Square) {
        //gameOverNow()
        if(veryBadMole2Hit === 1) {
            return
        }
        bonkSound12.play()
        catScream5.play()
        currentVeryBadMole2Square.lastChild.src = "img/redCatKO.png"
        gameScore -= 100
        gameTime -= 20
        veryBadMole2Hit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
        timeCard.innerText = "TIME: " + gameTime.toString()
        if (gameTime < 0) {
            gameOverNow()
            timeCard.innerText = "TIME: 0"
        }
    }
    else if (this===currentKillerMoleSquare) {
        //gameOverNow()
        if(killerMoleHit === 1) {
            return
        }
        bonkSound13.play()
        catScream6.play()
        currentKillerMoleSquare.lastChild.src = "img/purpleCatKO.png"
        gameScore -= 50
        killerMoleHit = 1
        scoreCard.innerText = "SCORE: " + gameScore.toString()
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
    clearInterval(intervalMole2)
    clearInterval(intervalGreaterMole)
    clearInterval(intervalGreaterMole2)
    clearInterval(intervalTimerMole)
    clearInterval(intervalMultiMole)
    clearInterval(intervalGoldMole)
    clearInterval(intervalBadMole)
    clearInterval(intervalBadMole2)
    clearInterval(intervalBadMole3)
    clearInterval(intervalVeryBadMole)
    clearInterval(intervalVeryBadMole2)
    clearInterval(intervalKillerMole)
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
    //location.reload()
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