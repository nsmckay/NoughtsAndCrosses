const flipSquare = document.getElementById("flip-square")
const clickButton = document.getElementById("click-button")
const startJingle = document.getElementById("start-jingle")
const winGong = document.getElementById("win-gong")
const drawGong = document.getElementById("draw-gong")
const p1WinSound = document.getElementById("p1-win-sound")
const p2WinSound = document.getElementById("p2-win-sound")
const restartGong = document.getElementById("restart-gong")

const square1 = document.getElementById("square-1")
const square2 = document.getElementById("square-2")
const square3 = document.getElementById("square-3")
const square4 = document.getElementById("square-4")
const square5 = document.getElementById("square-5")
const square6 = document.getElementById("square-6")
const square7 = document.getElementById("square-7")
const square8 = document.getElementById("square-8")
const square9 = document.getElementById("square-9")

const instructions = document.getElementById("instructions")
const mobileInfo = document.getElementById("mobile-instructions")
const mobileInfoButton = document.getElementById("mobile-instructions-button")
const miniRetry = document.getElementById("retry-mini")
const options = document.getElementById("options")
const radioSingle = document.getElementById("game-mode-single")
const radioMulti = document.getElementById("game-mode-multi")
const difficultySlider = document.getElementById("difficulty-slider")
const startButton = document.getElementById("start-game")
const gameBoard = document.getElementById("game-board")
const endOptions = document.getElementById("end-options")
const retry = document.getElementById("retry")
const message = document.getElementById("message")
const p1ScoreBoard = document.getElementById("p1-score")
const p2ScoreBoard = document.getElementById("p2-score")
const mouse = document.getElementById("mouse")
const cat = document.getElementById("cat")

let mobileInfoVisible = false
let singlePlayer = true // multiplayer when false
let difficulty = 9 //default difficulty
let gameStart = false
let player1Turn = true // player2turn when false
let player1Score = 0
let player2Score = 0
let gameOver = false
let turns = 0
let squaresArray = [1,2,3,4,5,6,7,8,9]

square1.addEventListener('click', function(){clickSquare(event,1), false})
square2.addEventListener('click', function(){clickSquare(event,2), false})
square3.addEventListener('click', function(){clickSquare(event,3), false})
square4.addEventListener('click', function(){clickSquare(event,4), false})
square5.addEventListener('click', function(){clickSquare(event,5), false})
square6.addEventListener('click', function(){clickSquare(event,6), false})
square7.addEventListener('click', function(){clickSquare(event,7), false})
square8.addEventListener('click', function(){clickSquare(event,8), false})
square9.addEventListener('click', function(){clickSquare(event,9), false})

mobileInfoButton.addEventListener("click", displayMobileInstructions)
radioSingle.addEventListener("click", updateInstructions)
radioMulti.addEventListener("click", updateInstructions)
difficultySlider.addEventListener("change", updateDifficulty)
startButton.addEventListener("click", startGame)
retry.addEventListener("click", startOver)
retry.disabled = true
miniRetry.addEventListener("click", startOver)

mobileInfo.style.display = "none"
miniRetry.style.display = "none"
options.style.display = "inline" //before starting game, only want options visible
gameBoard.style.display = "none"
endOptions.style.display = "none"

function displayMobileInstructions() {
    clickButton.play()
    if (!mobileInfoVisible) {
        mobileInfo.style.display = "inline"
        mobileInfoVisible = true
    } else {
        mobileInfo.style.display = "none"
        mobileInfoVisible = false
    }
}

function updateInstructions() {
    clickButton.play()
    if(radioSingle.checked) {
        instructions.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
        mobileInfo.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
    } else {
        instructions.innerText="MULTI-PLAYER: Find a friend to play with. Player 1 goes first, placing their X mark in the grid below. Player 2 goes second, placing their O mark elsewhere in the grid. The winner is the first to place 3 marks in a row."
        mobileInfo.innerText="MULTI-PLAYER: Find a friend to play with. Player 1 goes first, placing their X mark in the grid below. Player 2 goes second, placing their O mark elsewhere in the grid. The winner is the first to place 3 marks in a row."
    }
}

function updateDifficulty() {
    difficulty = difficultySlider.value
    //console.log(difficulty)
}

function startGame() {
    if (radioSingle.checked) {
        //console.log("SINGLEPLAYER!")
        singlePlayer = true
    } else {
        //console.log("MULTIPLAYER!")
        singlePlayer = false
    }
    startJingle.play()
    gameStart = true
    startButton.disabled = true
    retry.disabled = false
    message.innerText="Player 1, place your O"
    instructions.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
    mobileInfo.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
    options.style.display = "none"
    gameBoard.style.display = "grid" //when game starts, we want to see the grid of squares
    miniRetry.style.display = "inline" //small retry button for quitting during game
    endOptions.style.display = "none"
}

function clickSquare(event, num) {
    if (singlePlayer) {
        handleTurnSingle(num)
    } else {
        handleTurnMulti(num)
    }
}

async function handleTurnSingle(num) {
    const currentSquare = document.getElementById("square-" + num)
    const containsNought = currentSquare.classList.contains("nought")
    const containsCross = currentSquare.classList.contains("cross")
    const squaresArrayIndex = squaresArray.indexOf(num)
    if(!containsCross && !containsNought && player1Turn && gameStart && !gameOver) {
        flipSquare.play()
        currentSquare.style.backgroundImage = "url(nought.png)"
        currentSquare.classList.add("nought")
        squaresArray.splice(squaresArrayIndex,1,"O")
        player1Turn = false
        turns++
        checkWin()

        if(!gameOver) {
            message.innerText="The CPU is thinking..."
            instructions.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
            mobileInfo.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
            await wait(3000); //wait 3 seconds
            let noughtIndices = squaresArray.map((e,i) => e==="O" ? i : "")
            let crossIndices = squaresArray.map((e,i) => e==="X" ? i : "") // 2 marked squared 1 blank in row means CPU picks blank square
            let r = Math.floor(Math.random() * difficulty) + 0
            if(r === 0) {
                console.log("random move")
                if (difficulty != 10) {
                    placeRandomSquare()
                }
            } else {
                console.log("correct move")
                if(noughtIndices.includes(0) && noughtIndices.includes(1) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
                crossIndices.includes(0) && crossIndices.includes(1) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
                noughtIndices.includes(5) && noughtIndices.includes(8) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
                crossIndices.includes(5) && crossIndices.includes(8) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
                noughtIndices.includes(4) && noughtIndices.includes(6) && !noughtIndices.includes(2) && !crossIndices.includes(2) ||
                crossIndices.includes(4) && crossIndices.includes(6) && !noughtIndices.includes(2) && !crossIndices.includes(2)) {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(2)
                    console.log(squaresArray)
                } else if(noughtIndices.includes(1) && noughtIndices.includes(2) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
                crossIndices.includes(1) && crossIndices.includes(2) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
                noughtIndices.includes(3) && noughtIndices.includes(6) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
                crossIndices.includes(3) && crossIndices.includes(6) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
                noughtIndices.includes(4) && noughtIndices.includes(8) && !noughtIndices.includes(0) && !crossIndices.includes(0) ||
                crossIndices.includes(4) && crossIndices.includes(8) && !noughtIndices.includes(0) && !crossIndices.includes(0)) {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(0)
                    console.log(squaresArray)
                } else if(noughtIndices.includes(0) && noughtIndices.includes(2) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
                crossIndices.includes(0) && crossIndices.includes(2) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
                noughtIndices.includes(4) && noughtIndices.includes(7) && !noughtIndices.includes(1) && !crossIndices.includes(1) ||
                crossIndices.includes(4) && crossIndices.includes(7) && !noughtIndices.includes(1) && !crossIndices.includes(1)) {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(1)
                    console.log(squaresArray)
                } else if(noughtIndices.includes(3) && noughtIndices.includes(4) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
                crossIndices.includes(3) && crossIndices.includes(4) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
                noughtIndices.includes(2) && noughtIndices.includes(8) && !noughtIndices.includes(5) && !crossIndices.includes(5) ||
                crossIndices.includes(2) && crossIndices.includes(8) && !noughtIndices.includes(5) && !crossIndices.includes(5)) {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(5)
                    console.log(squaresArray)
                } else if(noughtIndices.includes(4) && noughtIndices.includes(5) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
                crossIndices.includes(4) && crossIndices.includes(5) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
                noughtIndices.includes(0) && noughtIndices.includes(6) && !noughtIndices.includes(3) && !crossIndices.includes(3) ||
                crossIndices.includes(0) && crossIndices.includes(6) && !noughtIndices.includes(3) && !crossIndices.includes(3)) {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(3)
                    console.log(squaresArray)
                } else if(noughtIndices.includes(3) && noughtIndices.includes(5) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
                crossIndices.includes(3) && crossIndices.includes(5) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
                noughtIndices.includes(1) && noughtIndices.includes(7) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
                crossIndices.includes(1) && crossIndices.includes(7) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
                noughtIndices.includes(2) && noughtIndices.includes(6) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
                crossIndices.includes(2) && crossIndices.includes(6) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
                noughtIndices.includes(0) && noughtIndices.includes(8) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
                crossIndices.includes(0) && crossIndices.includes(8) && !noughtIndices.includes(4) && !crossIndices.includes(4) ||
                turns === 1 && !noughtIndices.includes(4) && !crossIndices.includes(4)) { //on first CPU turn, should pick centre if empty
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(4) //this is the centre square
                    console.log(squaresArray)
                } else if(noughtIndices.includes(6) && noughtIndices.includes(7) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
                crossIndices.includes(6) && crossIndices.includes(7) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
                noughtIndices.includes(2) && noughtIndices.includes(5) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
                crossIndices.includes(2) && crossIndices.includes(5) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
                noughtIndices.includes(4) && noughtIndices.includes(0) && !noughtIndices.includes(8) && !crossIndices.includes(8) ||
                crossIndices.includes(4) && crossIndices.includes(0) && !noughtIndices.includes(8) && !crossIndices.includes(8)) {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(8)
                    console.log(squaresArray)
                } else if(noughtIndices.includes(7) && noughtIndices.includes(8) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
                crossIndices.includes(7) && crossIndices.includes(8) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
                noughtIndices.includes(0) && noughtIndices.includes(3) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
                crossIndices.includes(0) && crossIndices.includes(3) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
                noughtIndices.includes(2) && noughtIndices.includes(4) && !noughtIndices.includes(6) && !crossIndices.includes(6) ||
                crossIndices.includes(2) && crossIndices.includes(4) && !noughtIndices.includes(6) && !crossIndices.includes(6)) {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(6)
                    console.log(squaresArray)
                } else if(noughtIndices.includes(6) && noughtIndices.includes(8) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
                crossIndices.includes(6) && crossIndices.includes(8) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
                noughtIndices.includes(1) && noughtIndices.includes(4) && !noughtIndices.includes(7) && !crossIndices.includes(7) ||
                crossIndices.includes(1) && crossIndices.includes(4) && !noughtIndices.includes(7) && !crossIndices.includes(7)) {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    placeCPUSquare(7)
                    console.log(squaresArray)
                } else {
                    console.log("CPU TURN" + turns)
                    console.log(squaresArray)
                    // let r = 0
                    // for (let i = 0; i < squaresArray.length; i++) {
                    //     if(squaresArray[i] != "O" && squaresArray[i] != "X") {
                    //         r = i
                    //     }
                    // }
                    // placeCPUSquare(r)
                    placeRandomSquare()
                    console.log(squaresArray)
                }
            }
        }
    }
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function placeCPUSquare(num) {
    const CPUSquare = document.getElementById("square-" + (num + 1))
    const CPUSquaresArrayIndex = squaresArray.indexOf(num + 1)
    CPUSquare.style.backgroundImage = "url(cross.png)"
    CPUSquare.classList.add("cross")
    flipSquare.play()
    squaresArray.splice(CPUSquaresArrayIndex,1,"X")
    player1Turn = true
    turns++
    message.innerText="Player 1, place your O"
    instructions.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
    mobileInfo.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
    //console.log(turns)
    checkWin()
}

function placeRandomSquare() {
    //const r = Math.floor(Math.random() * 9) + 1
    const r = Math.floor(Math.random() * 8) + 0
    console.log(r)
    let noughtIndices = squaresArray.map((e,i) => e==="O" ? i : "")
    let crossIndices = squaresArray.map((e,i) => e==="X" ? i : "")

    if (noughtIndices.includes(r) || crossIndices.includes(r)) {
        placeRandomSquare()
    } else {
        placeCPUSquare(r)
    }
    // if (squaresArray[r] != "O" && squaresArray[r] != "X") {
    //     placeCPUSquare(r)
    // } else {
    //     placeRandomSquare()
    // }
}

function handleTurnMulti(num) {
    const currentSquare = document.getElementById("square-" + num)
    //console.log(currentSquare)
    const containsNought = currentSquare.classList.contains("nought")
    const containsCross = currentSquare.classList.contains("cross")
    const squaresArrayIndex = squaresArray.indexOf(num)
    if(!containsCross && !containsNought && gameStart && !gameOver) {
        flipSquare.play()
        if(player1Turn) {
            currentSquare.style.backgroundImage = "url(nought.png)"
            currentSquare.classList.add("nought")
            squaresArray.splice(squaresArrayIndex,1,"O")
            player1Turn = false
            message.innerText="Player 2, place your X"
        } else { //if player2Turn
            currentSquare.style.backgroundImage = "url(cross.png)"
            currentSquare.classList.add("cross")
            squaresArray.splice(squaresArrayIndex,1,"X")
            player1Turn = true
            message.innerText="Player 1, place your O"
        }
        turns++
        instructions.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
        mobileInfo.innerText="TURN-" + (turns + 1) + " : Player " + (player1Turn ? "1" : "2")
        console.log(turns)
        checkWin()
    }
}

async function checkWin() {
    let noughtIndices = squaresArray.map((e,i) => e==="O" ? i : "")
    let crossIndices = squaresArray.map((e,i) => e==="X" ? i : "")
    //console.log("O", noughtIndices, "X", crossIndices)
    //console.log(noughtIndices)
    if(noughtIndices.includes(0) && noughtIndices.includes(1) && noughtIndices.includes(2) ||
       noughtIndices.includes(6) && noughtIndices.includes(7) && noughtIndices.includes(8) ||
       noughtIndices.includes(0) && noughtIndices.includes(4) && noughtIndices.includes(8) ||
       noughtIndices.includes(2) && noughtIndices.includes(4) && noughtIndices.includes(6) ||
       noughtIndices.includes(3) && noughtIndices.includes(4) && noughtIndices.includes(5) ||
       noughtIndices.includes(1) && noughtIndices.includes(4) && noughtIndices.includes(7) ||
       noughtIndices.includes(0) && noughtIndices.includes(3) && noughtIndices.includes(6) ||
       noughtIndices.includes(2) && noughtIndices.includes(5) && noughtIndices.includes(8)) {
        //console.log("Player 1 Wins!")
        message.innerText="Player 1 Wins!"
        instructions.innerText="GAME SET"
        mobileInfo.innerText="GAME SET"
        miniRetry.style.display = "none"
        mouse.firstChild.src="greenMouseHappy.png"
        cat.firstChild.src="redCatAngry.png"
        updateScore(1)
        gameOver = true
        if (singlePlayer) {
            p1WinSound.play()
        } else {
            winGong.play()
        }
        await wait(3000); //wait 3 seconds
        options.style.display = "none"
        gameBoard.style.display = "none"
        miniRetry.style.display = "none"
        endOptions.style.display = "inline" //when game ends, want option to start over
       }
    if(crossIndices.includes(0) && crossIndices.includes(1) && crossIndices.includes(2) ||
       crossIndices.includes(6) && crossIndices.includes(7) && crossIndices.includes(8) ||
       crossIndices.includes(0) && crossIndices.includes(4) && crossIndices.includes(8) ||
       crossIndices.includes(2) && crossIndices.includes(4) && crossIndices.includes(6) ||
       crossIndices.includes(3) && crossIndices.includes(4) && crossIndices.includes(5) ||
       crossIndices.includes(1) && crossIndices.includes(4) && crossIndices.includes(7) ||
       crossIndices.includes(0) && crossIndices.includes(3) && crossIndices.includes(6) ||
       crossIndices.includes(2) && crossIndices.includes(5) && crossIndices.includes(8)) {
        //console.log("Player 2 Wins!")
        message.innerText="Player 2 Wins!"
        instructions.innerText="GAME SET"
        mobileInfo.innerText="GAME SET"
        miniRetry.style.display = "none"
        mouse.firstChild.src="greenMouseSad.png"
        cat.firstChild.src="redCatHappy.png"
        updateScore(2)
        gameOver = true
        if (singlePlayer) {
            p2WinSound.play()
        } else {
            winGong.play()
        }
        await wait(3000); //wait 3 seconds
        options.style.display = "none"
        gameBoard.style.display = "none"
        miniRetry.style.display = "none"
        endOptions.style.display = "inline"
       }
    if (turns === 9 && gameOver === false) {
        //console.log("It's a Draw!")
        message.innerText="It's a Draw!"
        instructions.innerText="GAME SET"
        mobileInfo.innerText="GAME SET"
        miniRetry.style.display = "none"
        mouse.firstChild.src="greenMouseSad.png"
        cat.firstChild.src="redCatAngry.png"
        gameOver = true
        drawGong.play()
        await wait(3000); //wait 3 seconds
        options.style.display = "none"
        gameBoard.style.display = "none"
        miniRetry.style.display = "none"
        endOptions.style.display = "inline"
    }
}

function updateScore(player) {
    if(player === 1) {
        player1Score++
        p1ScoreBoard.innerText=player1Score
    } else {
        player2Score++
        p2ScoreBoard.innerText=player2Score
    }
}

function startOver() {
    restartGong.play()
    player1Turn = true
    gameStart = false
    gameOver = false
    retry.disabled = true
    startButton.disabled = false
    turns = 0
    squaresArray = [1,2,3,4,5,6,7,8,9]

    for(let i = 1; i < 10; i++) {
        //console.log("WORKING")
        const currentSquare = document.getElementById("square-" + i)
        currentSquare.style.backgroundImage = "url(blank.png)"
        currentSquare.classList.remove("nought")
        currentSquare.classList.remove("cross")
    }

    message.innerText="Select a mode, and click START to begin!"
    instructions.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
    mobileInfo.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
    mouse.firstChild.src="greenMouse.png"
    cat.firstChild.src="redCat.png"
    options.style.display = "inline" //before starting game, only want options visible
    gameBoard.style.display = "none"
    miniRetry.style.display = "none"
    endOptions.style.display = "none"
}

//Special thanks to NoirNerd, whose 100% free noughts and crosses tutorial on youtube/github I applied to some of my own code for the game board logic.
//youtube: https://www.youtube.com/watch?v=1Py78eFL3YQ
//github: https://github.com/drnoir/noughtandcrosses-vanillajs

//The Singleplayer AI opponent was entirely my own making however,
//as was the responsive design, and idea to include animated characters and sound effects for some extra personality.