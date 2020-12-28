import { question as prompt } from "readline-sync";

interface LetterSlot {
  letter: string;
  isRevealed?: boolean;
}

let board: LetterSlot[];
let livesRemaining: number = 5;

/** Stores the guesses made by the player */
let guessesMade: string[] = [];

function boardContainsLetter(letterToCheck: string): boolean {
  return board.some((letterSlot) => letterSlot.letter === letterToCheck);
}

function boardForPrint(): string[] {
  return board.map(letterSlotForPrint);
}

function handleGuess(guess: string): void {
  storeGuess(guess);
  if (boardContainsLetter(guess)) {
    console.log("Bullseye!");
    revealLetter(guess);
  } else {
    console.log("It's not there...");
    livesRemaining -= 1;
  }
}

function gameIsOngoing(): boolean {
  return (
    livesRemaining > 0 && board.some((letterSlot) => !letterSlot.isRevealed)
  );
}

function letterSlotForPrint(letterSlot: LetterSlot): string {
  if (letterSlot.isRevealed) {
    return letterSlot.letter;
  } else {
    return "_";
  }
}

function playGame(): void {
  console.log("Let's play hangman!");
  const word = "apple";
  board = word.split("").map((char) => ({ letter: char }));
  while (gameIsOngoing()) {
    playRound();
  }

  if (livesRemaining === 0) {
    console.log("Bad luck, you're out of lives!");
  } else {
    console.log("Congrats! You won!");
  }
  console.log("The word was", word.toUpperCase());
}

function playRound(): void {
  console.log("Here's the board:", boardForPrint());
  console.log("Your lives remaining:", livesRemaining);
  console.log("Your previous guesses:", guessesMade);
  takeAndHandleGuess();
}

function revealLetter(letterToReveal: string): void {
  for (const letterSlot of board) {
    if (letterSlot.letter === letterToReveal) {
      letterSlot.isRevealed = true;
    }
  }
}

function storeGuess(guess: string): void {
  guessesMade.push(guess);
  guessesMade.sort();
}

function takeAndHandleGuess(): void {
  const guess = prompt("What letter are you guessing? \n> ");

  if (guessesMade.includes(guess)) {
    console.log("You've already guessed that! Try a different guess?");
    return takeAndHandleGuess();
  } else {
    handleGuess(guess);
  }
}

playGame();
