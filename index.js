const flipSquare = document.getElementById("flip-square")

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
const options = document.getElementById("options")
const radioSingle = document.getElementById("game-mode-single")
const radioMulti = document.getElementById("game-mode-multi")
const startButton = document.getElementById("start-game")
const retry = document.getElementById("retry")
const message = document.getElementById("message")
const mouse = document.getElementById("mouse")
const cat = document.getElementById("cat")

let singlePlayer = true // multiplayer when false
let gameStart = false
let player1Turn = true // player2turn when false
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

radioSingle.addEventListener("click", updateInstructions)
radioMulti.addEventListener("click", updateInstructions)
startButton.addEventListener("click", startGame)
retry.addEventListener("click", startOver)
retry.disabled = true

function updateInstructions() {
    if(radioSingle.checked) {
        instructions.innerText="SINGLE-PLAYER: As Player 1, place your X marks in the grid below. The CPU, Player 2, will place O marks after you. Win by placing 3 of your marks in a row before the CPU does."
    } else {
        instructions.innerText="MULTI-PLAYER: Find a friend to play with. Player 1 goes first, placing their X mark in the grid below. Player 2 goes second, placing their O mark elsewhere in the grid. The winner is the first to place 3 marks in a row."
    }
}

function startGame() {
    if (radioSingle.checked) {
        //console.log("SINGLEPLAYER!")
        singlePlayer = true
    } else {
        //console.log("MULTIPLAYER!")
        singlePlayer = false
    }
    gameStart = true
    startButton.disabled = true
    retry.disabled = false
    message.innerText="Player 1, place your O"
}

// function clickSquare(event, num) {
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
//         console.log(turns)
//         checkWin()
//     }
// }

function clickSquare(event, num) {
    if (singlePlayer) {
        handleTurnSingle(num)
    } else {
        handleTurnMulti(num)
    }
}

function handleTurnSingle(num) {

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
        console.log(turns)
        checkWin()
    }
}

function checkWin() {
    let noughtIndices = squaresArray.map((e,i) => e==="O" ? i : "")
    let crossIndices = squaresArray.map((e,i) => e==="X" ? i : "")
    //console.log("O", noughtIndices, "X", crossIndices)
    console.log(noughtIndices)
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
        mouse.firstChild.src="greenMouseHappy.png"
        cat.firstChild.src="redCatAngry.png"
        gameOver = true
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
        mouse.firstChild.src="greenMouseSad.png"
        cat.firstChild.src="redCatHappy.png"
        gameOver = true
       }
       if (turns === 9 && gameOver === false) {
        //console.log("It's a Draw!")
        message.innerText="It's a Draw!"
        mouse.firstChild.src="greenMouseSad.png"
        cat.firstChild.src="redCatAngry.png"
       }
}

function startOver() {
    player1Turn = true
    gameStart = false
    gameOver = false
    retry.disabled = true
    startButton.disabled = false
    turns = 0
    squaresArray = [1,2,3,4,5,6,7,8,9]

    for(let i = 1; i < 10; i++) {
        console.log("WORKING")
        const currentSquare = document.getElementById("square-" + i)
        currentSquare.style.backgroundImage = "url(blank.png)"
        currentSquare.classList.remove("nought")
        currentSquare.classList.remove("cross")
    }

    message.innerText="Select a mode, and click START to begin!"
    mouse.firstChild.src="greenMouse.png"
    cat.firstChild.src="redCat.png"
}
