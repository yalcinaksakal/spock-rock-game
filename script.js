import { startConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");

const allGameIcons = document.querySelectorAll(".far");
const resultText = document.getElementById("resultText");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let computerChoice = "",
  cmpScoreNumber = 0,
  plyrScoreNumber = 0;
//reset all selected icons
function resetSelected() {
  allGameIcons.forEach(icon => icon.classList.remove("selected"));
}

function resetAll() {
  removeConfetti();
  resetSelected();
  resultText.textContent = "";
  plyrScoreNumber = cmpScoreNumber = 0;
  playerScoreEl.textContent = plyrScoreNumber;
  computerScoreEl.textContent = cmpScoreNumber;
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
}
//make module function global
window.resetAll = resetAll;

function chooser(el, player) {
  const chosenIcon = document.getElementById(el);
  chosenIcon.classList.add("selected");
  player.textContent = ` --- ${chosenIcon.title}`;
}

function computerRandomChoice() {
  computerChoice = [
    "computerRock",
    "computerPaper",
    "computerScissors",
    "computerLizard",
    "computerSpock",
  ][Math.floor(Math.random() * 5)];
  chooser(computerChoice, computerChoiceEl);
}

function updateScore(playerChoice) {
  const cmpChoice = computerChoice.toLowerCase().slice(8);
  if (playerChoice === cmpChoice) resultText.textContent = "It's a tie.";
  else if (choices[playerChoice].defeats.indexOf(cmpChoice) === -1) {
    cmpScoreNumber++;
    computerScoreEl.textContent = cmpScoreNumber;
    resultText.textContent = "You lost.";
  } else {
    plyrScoreNumber++;
    playerScoreEl.textContent = plyrScoreNumber;
    resultText.textContent = "You won this.";
    startConfetti();
  }
}

function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  updateScore(playerChoice);
}
//passing player selection value and styling icons

function select(playerChoice) {
  removeConfetti();
  checkResult(playerChoice.toLowerCase().slice(6));
  chooser(playerChoice, playerChoiceEl);
}
//make module function global
window.select = select;

//onload
resetAll();
