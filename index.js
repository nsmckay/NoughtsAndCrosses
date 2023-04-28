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
const squaresArray = [1,2,3,4,5,6,7,8,9]

const message = document.getElementById("message")
const mouse = document.getElementById("mouse")
const cat = document.getElementById("cat")

let player1Turn = true // player2turn when false
let gameOver = false
let turns = 0

square1.addEventListener('click', function(){clickSquare(event,1), false})
square2.addEventListener('click', function(){clickSquare(event,2), false})
square3.addEventListener('click', function(){clickSquare(event,3), false})
square4.addEventListener('click', function(){clickSquare(event,4), false})
square5.addEventListener('click', function(){clickSquare(event,5), false})
square6.addEventListener('click', function(){clickSquare(event,6), false})
square7.addEventListener('click', function(){clickSquare(event,7), false})
square8.addEventListener('click', function(){clickSquare(event,8), false})
square9.addEventListener('click', function(){clickSquare(event,9), false})

function clickSquare(event, num) {
    const currentSquare = document.getElementById("square-" + num)
    //console.log(currentSquare)
    const containsNought = currentSquare.classList.contains("nought")
    const containsCross = currentSquare.classList.contains("cross")
    const squaresArrayIndex = squaresArray.indexOf(num)
    if(!containsCross && !containsNought && !gameOver) {
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

// Create a function that puts the apples onto the appleShelf
// and the oranges onto the orangeShelf. Use a for loop,
// a conditional statement, and the textContent property.

async function startGame() {
    //console.log("Working!")
    let startNumVal = parseInt(startNum.value)
    let endNumVal = parseInt(endNum.value)
    let fizzBuzzArray = []

    for (i=startNumVal; i < endNumVal + 1; i++) {
        let message = ""
        if(i % 3 === 0) {
            message += "Fizz"
        }
        if(i % 5 === 0) {
            message += "Buzz"
        }
        if(i % 3 != 0 && i % 5 != 0) {
            message += i
        }
        if (message != "") {
            fizzBuzzArray.push(message)
        }
    }
    let fizzBuzzString = fizzBuzzArray.toString()
    fizzBuzzString = fizzBuzzString.replace(/,/g, ", ")
    fizzBuzzOutput.innerHTML = fizzBuzzString
    bee.classList.add("bee-shake")
    beeBuzz.play();
    await wait(2000);
    bee.classList.remove("bee-shake")
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function validate() {
    let startNumVal = parseInt(startNum.value)
    let endNumVal = parseInt(endNum.value)
    if (startNumVal > 0 && startNumVal < 101 && endNumVal > 0 && endNumVal < 101) {
        if (startNumVal < endNumVal) {
            startGame()
        } else {
            fizzBuzzOutput.innerHTML = "The starting number CANNOT be larger than the ending number!"
        }
    } else {
        fizzBuzzOutput.innerHTML = "Range MUST be between 1 and 100 for both start and end points!"
    }
}

startButton.addEventListener("click", validate)

//for (i = 0; i < fruit.length; i++) {
    //if (fruit[i] === "🍎") {
        //appleShelf.textContent += "🍎";
    //} else {
        //orangeShelf.textContent += "🍊";
    //}
//}
