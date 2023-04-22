//let fruit = ["🍎", "🍊", "🍎", "🍎", "🍊"]
//let appleShelf = document.getElementById("apple-shelf")
//let orangeShelf = document.getElementById("orange-shelf")

let startNum = document.getElementById("start-num")
let endNum = document.getElementById("end-num")
let startButton = document.getElementById("start")
let fizzBuzzOutput = document.getElementById("fizz-buzz")
let bee = document.getElementById("bee")
let beeBuzz = document.getElementById("bee-buzzing")

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
