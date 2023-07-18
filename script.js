let endGame = false;
let playerScoreCount = 0;
let computerScoreCount = 0;
let gameRoundCount = 0;

const myForm = document.getElementById("myForm");
const mainGamePage = document.querySelector(".main-game");
const playerInformationPage = document.querySelector(".player-information");
const inputPlayerName = document.getElementById("inputPlayerName");
const inputSelectOption = document.querySelector("select");
const playerName = document.getElementById("playerName");
const roundNumber = document.getElementById("round-number");

//Text Elements
const txtPlayerScore = document.getElementById("player-score");
const txtComputerScore = document.getElementById("computer-score");
const txtGameRoundScore = document.getElementById("played-game-count");
const txtWinnerName = document.getElementById("winner-name");
const txtRoundNumber = document.getElementById("round-number");

//Buttons
const btnsSelection = document.querySelectorAll(".btn-selection");
const btnRestart = document.getElementById("restart");

const playerChoices = ["rock", "paper", "scissors"];
const computerChoices = ["rock", "paper", "scissors"];
const tieResult = "TIE";
const playerResult = "PLAYER WON";
const computerResult = "COMPUTER WON";

//Functions sections
hideContent(mainGamePage);

function hideContent(className) {
  className.classList.add("hide");
}
function showContent(className) {
  className.classList.remove("hide");
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
  if (result === playerResult) {
    playerScoreCount++;
    gameRoundCount++;
  } else if (result === computerResult) {
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
  if (selectedIndexOption === 1) {
    if (
      playerScoreCount === 2 ||
      computerScoreCount === 2 ||
      gameRoundCount === 3
    ) {
      checkWinner();
      endGame = true;
      showContent(btnRestart);
    }
  }
  if (selectedIndexOption === 2) {
    if (
      playerScoreCount === 3 ||
      computerScoreCount === 3 ||
      gameRoundCount === 5
    ) {
      checkWinner();
      endGame = true;
      showContent(btnRestart);
    }
  }
}

function playGame() {
  const playerChoice = this.id;
  if (!endGame) {
    const result = playRound(playerChoice, getComputerChoice());
    updateCount(result);
    checkIfEndGame();
  }
}

function restarGame() {
  (playerScoreCount = 0), (computerScoreCount = 0), (gameRoundCount = 0);
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

function validateOptions(e) {
  e.preventDefault();
  const selectedIndexOption = inputSelectOption.selectedIndex;
  if (
    inputPlayerName.value !== "" &&
    (selectedIndexOption === 1 || selectedIndexOption === 2)
  ) {
    playerName.textContent = inputPlayerName.value;

    inputPlayerName.value = "";
    roundNumber.textContent = inputSelectOption.value;
    showContent(mainGamePage);
    hideContent(playerInformationPage);
    hideContent(btnRestart);
  } else {
    alert("Please enter your name and chose number of round");
    return;
  }
}

// myForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const selectedIndexOption = inputSelectOption.selectedIndex;
//   if (
//     inputPlayerName.value !== "" &&
//     (selectedIndexOption === 1 || selectedIndexOption === 2)
//   ) {
//     playerName.textContent = inputPlayerName.value;

//     inputPlayerName.value = "";
//     roundNumber.textContent = inputSelectOption.value;
//     showContent(mainGamePage);
//     hideContent(playerInformationPage);
//     hideContent(btnRestart);
//   } else {
//     alert("Please enter your name and chose number of round");
//     return;
//   }
// });

myForm.addEventListener("submit", validateOptions);
btnsSelection.forEach((btn) => btn.addEventListener("click", playGame));
btnRestart.addEventListener("click", restarGame);
