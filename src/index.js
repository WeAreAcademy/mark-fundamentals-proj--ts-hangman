const prompt = require("readline-sync").question;

const acceptableVariants = {
  rock: ["rock", "Rock", "r", "R"],
  paper: ["paper", "Paper", "p", "P"],
  scissors: ["scissors", "Scissors", "s", "S"],
};

const weaknesses = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

function declareWinner(userPick, computerPick) {
  if (userPick === computerPick) {
    console.log(`You both chose ${computerPick} - it's a draw!`);
  } else if (weaknesses[userPick] === computerPick) {
    console.log(
      `The computer's ${computerPick} beat your ${userPick}! Bad luck...`
    );
  } else {
    console.log(
      `Your ${userPick} beat the computer's ${computerPick}! You are a mighty champion!`
    );
  }
}

function getUserChoice() {
  while (true) {
    const answer = prompt("Your choice: rock, paper or scissors? \n> ");
    for (let [choice, variants] of Object.entries(acceptableVariants)) {
      if (variants.includes(answer)) {
        return choice;
      }
    }
    console.log(
      "Sorry, I don't recognise that as a choice! \nPlease try 'rock', 'paper' or 'scissors' (without quotation marks)."
    );
  }
}

function playRound() {
  const computerChoice = randomPick();
  const userChoice = getUserChoice();
  declareWinner(userChoice, computerChoice);
}

function randomPick() {
  const choiceOptions = Object.keys(acceptableVariants);
  const randomIndex = Math.floor(Math.random() * choiceOptions.length);
  const computerChoice = choiceOptions[randomIndex];
  return computerChoice;
}

playRound();
