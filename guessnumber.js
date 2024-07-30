// console.log(Math.floor(Math.random() * 100 + 1));
let randomNumber = Math.floor(Math.random() * 100 + 1);

//Selectors
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

const jsconfetti = new JSConfetti();

let prevGuess = [];
let numGuesses = 1;
let playgame = true;

if (playgame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Pleasse enter a valid number");
  } else if (guess < 1) {
    alert("Pleasse enter a number more or equal 1");
  } else if (guess > 100) {
    alert("Pleasse enter a number less or equal 100");
  } else {
    prevGuess.push(guess);
    if (numGuesses === 11) {
      displayGuess(guess);
      displayMessage(`Game over, Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right on ${numGuesses - 1} attempt`);
    jsconfetti.addConfetti();
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("Number is TOOO Low");
  } else {
    displayMessage("Number is TOOO High");
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess} `;
  numGuesses++;
  if (numGuesses <= 11) remaining.innerHTML = `${11 - numGuesses}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function newGame() {
  const newGameButton = document.querySelector("#new-game");
  newGameButton.addEventListener("click", (e) => {
    randomNumber = Math.floor(Math.random() * 100 + 1);
    prevGuess = [];
    numGuesses = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = remaining.innerHTML = `${11 - numGuesses}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playgame = true;
  });
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h2 id = "new-game">Start New Game</h2>`;
  startOver.appendChild(p);
  playgame = false;
  newGame();
}
