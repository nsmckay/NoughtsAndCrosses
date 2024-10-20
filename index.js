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

const gameTitle = document.getElementById("game-title")
const instructions = document.getElementById("instructions")
const help = document.getElementById("help")
const tutorial = document.getElementById("tutorial")
const gameArea = document.getElementById("game-area")
const options = document.getElementById("options")
const radioEasy = document.getElementById("difficulty-easy")
const radioMedium = document.getElementById("difficulty-medium")
const radioHard = document.getElementById("difficulty-hard")
const startButton = document.getElementById("start-game")
const scoreButton = document.getElementById("show-highscores")
const highscores = document.getElementById("highscores")
const scoreDisplayEasy = document.getElementById("score-display-easy")
const scoreDisplayMedium = document.getElementById("score-display-medium")
const scoreDisplayHard = document.getElementById("score-display-hard")
const returnFromScores = document.getElementById("return-from-scores")
const deleteScores = document.getElementById("delete-scores")
const gameBoard = document.getElementById("game-board")
const boardHeader = document.getElementById("board-header")
const grid = document.getElementById("grid")
const scoreCard = document.getElementById("score-card")
const timeCard = document.getElementById("time-card")
const endNow = document.getElementById("end-now")
const endOptions = document.getElementById("end-options")
const congrats = document.getElementById("congrats")
const congratsPhoto = document.getElementById("congrats-photo")
const yourScore = document.getElementById("your-score")
const newHighscore = document.getElementById("new-highscore")
const quitButton = document.getElementById("retry")
const playAgainButton = document.getElementById("continue")
const message = document.getElementById("message")

let helpMode = 0
let gameDifficulty = 0 //easy
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
let gameScore = 0
let highScoreEasy = 0
let highScoreMedium = 0
let highScoreHard = 0
let gameTime = 0
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

help.addEventListener("click", showTutorial)
radioEasy.addEventListener("click", updateDifficulty)
radioMedium.addEventListener("click", updateDifficulty)
radioHard.addEventListener("click", updateDifficulty)
startButton.addEventListener("click", startGame)
scoreButton.addEventListener("click", showHighscores)
returnFromScores.addEventListener("click", returnToMainMenu)
deleteScores.addEventListener("dblclick", eraseHighscores)
endNow.addEventListener("click", gameOverNow)
quitButton.addEventListener("click", quitGame)
playAgainButton.addEventListener("click", startGame)

instructions.style.display = "inline"
gameArea.style.display = "flex"
options.style.display = "inline" //before starting game, only want options visible
tutorial.style.display = "none"
highscores.style.display = "none"
endNow.style.display = "none"
gameBoard.style.display = "none"
endOptions.style.display = "none"
newHighscore.style.display = "none"

const delay = ms => new Promise(res => setTimeout(res, ms)); //utility function for synchronous delay
//thanks to https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line

if(localStorage.getItem("storeEasy") != null) { //if local storage already storing highscore
    highScoreEasy = localStorage.getItem("storeEasy") //restore highscore from last session
}
if(localStorage.getItem("storeMedium") != null) {
    highScoreMedium = localStorage.getItem("storeMedium")
}
if(localStorage.getItem("storeHard") != null) {
    highScoreHard = localStorage.getItem("storeHard")
}

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

function showTutorial() {
    if (helpMode === 0) {
        clickButton.play()
        tutorial.style.display = "inline"
        instructions.style.display = "none"
        gameArea.style.display = "none"
        message.innerText = "Click HELP again to return to the Main Menu"
        helpMode = 1
    } else {
        helpMode = 0
        returnToMainMenu()
    }
}

function showHighscores() {
    clickButton.play()
    highscores.style.display = "inline"
    options.style.display = "none"
    scoreDisplayEasy.innerHTML = "<b>Easy:</b> " + highScoreEasy + " points"
    scoreDisplayMedium.innerHTML = "<b>Medium:</b> " + highScoreMedium + " points"
    scoreDisplayHard.innerHTML = "<b>Hard:</b> " + highScoreHard + " points"
    message.innerText = "Keep replaying each difficulty to maximise your score for each level"
}

function eraseHighscores() {
    clickButton.play()
    highScoreEasy = 0
    highScoreMedium = 0
    highScoreHard = 0
    localStorage.clear()
    scoreDisplayEasy.innerHTML = "<b>Easy:</b> " + highScoreEasy + " points"
    scoreDisplayMedium.innerHTML = "<b>Medium:</b> " + highScoreMedium + " points"
    scoreDisplayHard.innerHTML = "<b>Hard:</b> " + highScoreHard + " points"
}

function returnToMainMenu() {
    clickButton.play()
    instructions.style.display = "inline"
    gameArea.style.display = "flex"
    options.style.display = "inline"
    tutorial.style.display = "none"
    highscores.style.display = "none"
    message.innerText = "Select your desired difficulty, and click START to begin!"
}

function startGame() {
    startJingle.play()
    message.innerText = "Click to hit the rats! DON'T hit the cats!"
    gameTitle.style.display = "none"
    instructions.style.display = "none"
    help.style.display = "none"
    endNow.style.display = "inline"
    options.style.display = "none"
    gameBoard.style.display = "inline"
    endOptions.style.display = "none"
    newHighscore.style.display = "none"
    scoreCard.innerText = "SCORE: 0"
    gameScore = 0
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
        //grid.classList.add("big-grid")
        console.log(grid.classList)
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
    // }, 1000)
    await delay(500)
    if(gameOver) {
        return
    }
    currentMoleSquare.lastChild.classList.remove("popUpMole")
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

async function removeMole(moleType) {
    if(moleType === "mole") {
        //currentMoleSquare.lastChild.src = "img/greyMouseKO.png"
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
    clickButton.play()
    scoreCard.innerText = "GAME OVER: " + gameScore.toString()
    message.innerText = "Let's see how you did, shall we?"
    clearInterval(intervalTime)
    boardHeader.classList.remove("board-header-duo") //only want to display the GAME OVER now, so switch to mono
    boardHeader.classList.add("board-header-mono")
    timeCard.innerText = ""
    timeCard.display = "none"
    endNow.style.display = "none"
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
    //scoreCard.innerText = "SCORE: 0"
    //gameScore = 0
    yourScore.innerHTML = "YOUR SCORE: " + gameScore + " points"
    if (gameDifficulty === 2) {
        //update highscore for hard difficulty if new score higher
        if(gameScore > highScoreHard) {
            highScoreHard = gameScore
            newHighscore.style.display = "inline"
            localStorage.setItem("storeHard", gameScore)
        }
        //congratulatory message depending on performance
        if(gameScore > 3500) {
            congrats.innerHTML = "AMAZING JOB!"
            congratsPhoto.src = "img/victory3.jpg"
        } else if (gameScore > 2000) {
            congrats.innerHTML = "NOT BAD!"
            congratsPhoto.src = "img/victory2.jpg"
        } else {
            congrats.innerHTML = "YOU CAN DO BETTER"
            congratsPhoto.src = "img/victory1.jpg"
        }
    } else if (gameDifficulty === 1) {
        //update highscore for medium difficulty if new score higher
        if(gameScore > highScoreMedium) {
            highScoreMedium = gameScore
            newHighscore.style.display = "inline"
            localStorage.setItem("storeMedium", gameScore)
        }
        //congratulatory message depending on performance
        if(gameScore > 1000) {
            congrats.innerHTML = "AMAZING JOB!"
            congratsPhoto.src = "img/victory3.jpg"
        } else if (gameScore > 800) {
            congrats.innerHTML = "NOT BAD!"
            congratsPhoto.src = "img/victory2.jpg"
        } else {
            congrats.innerHTML = "YOU CAN DO BETTER"
            congratsPhoto.src = "img/victory1.jpg"
        }
    } else {
        //update highscore for easy difficulty if new score higher
        if(gameScore > highScoreEasy) {
            highScoreEasy = gameScore
            newHighscore.style.display = "inline"
            localStorage.setItem("storeEasy", gameScore)
        }
        //congratulatory message depending on performance
        if(gameScore > 250) {
            congrats.innerHTML = "AMAZING JOB!"
            congratsPhoto.src = "img/victory3.jpg"
        } else if (gameScore > 150) {
            congrats.innerHTML = "NOT BAD!"
            congratsPhoto.src = "img/victory2.jpg"
        } else {
            congrats.innerHTML = "YOU CAN DO BETTER"
            congratsPhoto.src = "img/victory1.jpg"
        }
    }
    message.innerText = "Try playing again to beat your highest score!"
    gameOver = false
    endOptions.style.display = "inline"
    gameTitle.style.display = "inline"
}

function quitGame() {
    clickButton.play()
    message.innerText = "Select your desired difficulty, and click START to begin!"
    scoreCard.innerText = "SCORE: 0"
    gameScore = 0
    console.log("quit")
    endOptions.style.display = "none"
    instructions.style.display = "inline"
    help.style.display = "inline"
    endNow.style.display = "none"
    options.style.display = "inline"
    newHighscore.style.display = "none"
    //location.reload()
}

//     player1Score = 0
//     p1ScoreBoard.innerText=player1Score
//     player2Score = 0
//     p2ScoreBoard.innerText=player2Score
//}