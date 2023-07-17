// Variables
let endGame = false;
let playerScoreCount = 0;
let computerScoreCount = 0;
let gameRoundCount = 0;

// Elements
const mainGamePage = document.querySelector(".main-game");
const playerInformationPage = document.querySelector(".player-information");
const inputPlayerName = document.getElementById("inputPlayerName");
const inputSelectOption = document.querySelector("select");
const playerName = document.getElementById("playerName");
const roundNumber = document.getElementById("round-number");
const myForm = document.getElementById("myForm");
const txtPlayerScore = document.getElementById("player-score");
const txtComputerScore = document.getElementById("computer-score");
const txtGameRoundScore = document.getElementById("played-game-count");
const txtWinnerName = document.getElementById("winner-name");
const txtRoundNumber = document.getElementById("round-number");
const btnsSelection = document.querySelectorAll(".btn-selection");
const btnRestart = document.getElementById("restart");

// Constants
const playerChoices = ["rock", "paper", "scissors"];
const computerChoices = ["rock", "paper", "scissors"];
const tieResult = "TIE";
const playerResult = "PLAYER WON";
const computerResult = "COMPUTER WON";

// Functions
function hideContent(element) {
  element.classList.add("hide");
}

function showContent(element) {
  element.classList.remove("hide");
}

function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * computerChoices.length);
  return computerChoices[randomChoice];
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return tieResult;
  } else if (
    (playerChoice === playerChoices[0] &&
      computerChoice === computerChoices[2]) ||
    (playerChoice === playerChoices[1] &&
      computerChoice === computerChoices[0]) ||
    (playerChoice === playerChoices[2] && computerChoice === computerChoices[1])
  ) {
    return playerResult;
  } else {
    return computerResult;
  }
}

function updateCount(result) {
  if (result === playerResult || result === computerResult) {
    playerScoreCount++;
    computerScoreCount++;
    gameRoundCount++;
  }
  txtPlayerScore.textContent = playerScoreCount;
  txtComputerScore.textContent = computerScoreCount;
  txtGameRoundScore.textContent = gameRoundCount;
}

function checkWinner() {
  if (playerScoreCount === computerScoreCount) {
    txtWinnerName.textContent = "NOBODY";
  } else if (playerScoreCount > computerScoreCount) {
    txtWinnerName.textContent = playerName.textContent;
  } else {
    txtWinnerName.textContent = "COMPUTER";
  }
}

function checkIfEndGame() {
  const selectedIndexOption = inputSelectOption.selectedIndex;
  const isEndGame =
    (selectedIndexOption === 1 &&
      (playerScoreCount === 2 || gameRoundCount === 3)) ||
    (selectedIndexOption === 2 &&
      (playerScoreCount === 3 || gameRoundCount === 5));

  if (isEndGame) {
    checkWinner();
    endGame = true;
    showContent(btnRestart);
  }
}

function playGame() {
  if (endGame) {
    return;
  }

  const playerChoice = this.id;
  const result = playRound(playerChoice, getComputerChoice());
  updateCount(result);
  checkIfEndGame();
}

function restartGame() {
  playerScoreCount = 0;
  computerScoreCount = 0;
  gameRoundCount = 0;
  txtPlayerScore.textContent = playerScoreCount;
  txtComputerScore.textContent = computerScoreCount;
  txtGameRoundScore.textContent = gameRoundCount;
  txtWinnerName.textContent = "";
  inputSelectOption.selectedIndex = 0;
  showContent(playerInformationPage);
  hideContent(mainGamePage);
  hideContent(btnRestart);
  endGame = false;
}

function validateForm(e) {
  e.preventDefault();

  const selectedIndexOption = inputSelectOption.selectedIndex;
  const isFormValid =
    inputPlayerName.value.trim() !== "" &&
    (selectedIndexOption === 1 || selectedIndexOption === 2);

  if (isFormValid) {
    playerName.textContent = inputPlayerName.value.trim();
    inputPlayerName.value = "";
    roundNumber.textContent = inputSelectOption.value;
    showContent(mainGamePage);
    hideContent(playerInformationPage);
    hideContent(btnRestart);
  } else {
    alert("Please enter your name and choose the number of rounds.");
  }
}

// Event Listeners
myForm.addEventListener("submit", validateForm);
btnsSelection.forEach((btn) => btn.addEventListener("click", playGame));
btnRestart.addEventListener("click", restartGame);

// let playerCountScore = 0;
// let computerCountScore = 0;
// let gameCountScore = 0;

// let gameEnd = false;

// const btnRock = document.getElementById("rock");
// const btnPaper = document.getElementById("paper");
// const btnScissors = document.getElementById("scissors");
// const btnRestart = document.getElementById("restart");
// const btnChoices = document.querySelectorAll(".btn-selection");

// const txtPlayerScore = document.getElementById("player-score");
// const txtComputerScore = document.getElementById("computer-score");
// const txtPlayedScore = document.getElementById("played-game-count");
// const txtWinnerName = document.getElementById("winner-name");

// function getComputerChoice() {
//   const choices = ["rock", "paper", "scissors"];
//   const randomChoice = Math.floor(Math.random() * choices.length);
//   return choices[randomChoice];
// }

// function playRound(playerSelection, computerSelection) {
//   if (playerSelection === computerSelection) {
//     return "TIE";
//   } else if (
//     (playerSelection == "scissors" && computerSelection === "paper") ||
//     (playerSelection == "paper" && computerSelection === "rock") ||
//     (playerSelection == "rock" && computerSelection === "scissors")
//   ) {
//     return "PLAYER WON";
//   } else {
//     return "COMPUTER WON";
//   }
// }

// function checkWinner() {
//   if (playerCountScore > computerCountScore) {
//     txtWinnerName.textContent = "PLAYER";
//   } else {
//     txtWinnerName.textContent = "COMPUTER";
//   }
// }

// function checkEndGame() {
//   if (
//     playerCountScore === 3 ||
//     computerCountScore === 3 ||
//     gameCountScore === 5
//   ) {
//     checkWinner();
//     gameEnd = true;
//   }
// }

// function updateScore(result) {
//   if (result === "PLAYER WON") {
//     playerCountScore++;
//     gameCountScore++;
//   } else if (result === "COMPUTER WON") {
//     computerCountScore++;
//     gameCountScore++;
//   }
//   txtPlayerScore.textContent = playerCountScore;
//   txtComputerScore.textContent = computerCountScore;
//   txtPlayedScore.textContent = gameCountScore;
// }

// function buttonClickHandler() {
//   if (!gameEnd) {
//     const playerChoice = this.id;
//     const computerChoice = getComputerChoice();

//     const result = playRound(playerChoice, computerChoice);
//     updateScore(result);
//     checkEndGame();
//   }
// }

// function restart() {
//   playerCountScore = 0;
//   computerCountScore = 0;
//   gameCountScore = 0;
//   gameEnd = false;

//   txtPlayerScore.textContent = playerCountScore;
//   txtComputerScore.textContent = computerCountScore;
//   txtPlayedScore.textContent = gameCountScore;

//   btnChoices.forEach((btn) => {
//     btn.addEventListener("click", buttonClickHandler);
//   });
// }

// btnChoices.forEach((btn) => {
//   btn.addEventListener("click", buttonClickHandler);
// });

// btnRestart.addEventListener("click", restart);

// // btnChoices.forEach((btn) => {
// //   btn.addEventListener("click", () => {
// //     const playerChoice = btn.id;
// //     const computerChoice = getComputerChoice();

// //     const result = playRound(playerChoice, computerChoice);
// //     updateScore(result);
// //     checkEndGame();
// //     console.log(result);
// //   });
// // });
