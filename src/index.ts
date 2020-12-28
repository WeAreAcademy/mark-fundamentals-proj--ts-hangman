import { question as prompt } from "readline-sync";
import randomWords from "random-words";

interface LetterSlot {
  letter: string;
  isRevealed?: boolean;
}

let hiddenWord: string;
let board: LetterSlot[];
let livesRemaining: number = 5;

/** Stores the guesses made by the player */
let guessesMade: string[] = [];

function boardContainsLetter(letterToCheck: string): boolean {
  return board.some((letterSlot) => letterSlot.letter === letterToCheck);
}

function boardForPrint(): string {
  return board.map(letterSlotForPrint).join(" ");
}

function gameIsOngoing(): boolean {
  return (
    livesRemaining > 0 && board.some((letterSlot) => !letterSlot.isRevealed)
  );
}

function handleGuess(guess: string): void {
  storeGuess(guess);
  if (guess.length === 1) {
    processGuessedLetter(guess);
  } else {
    processGuessedWord(guess);
  }
}

function processGuessedLetter(letter: string): void {
  if (boardContainsLetter(letter)) {
    console.log("Bullseye!");
    revealLetter(letter);
  } else {
    console.log("It's not there...");
    livesRemaining -= 1;
  }
}

function processGuessedWord(word: string): void {
  if (word === hiddenWord) {
    console.log("Bullseye!");
    revealWholeBoard();
  } else {
    console.log("That's not the word...");
    livesRemaining -= 1;
  }
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
  hiddenWord = randomWords();
  board = hiddenWord.split("").map((char) => ({ letter: char }));
  while (gameIsOngoing()) {
    playRound();
  }

  if (livesRemaining === 0) {
    console.log("Bad luck, you're out of lives!");
  } else {
    console.log("Congrats! You won!");
  }
  console.log("The word was", hiddenWord.toUpperCase());
}

function playRound(): void {
  console.log("Here's the board:", boardForPrint());
  console.log("Your lives remaining:", livesRemaining);
  console.log("Your previous guesses:", guessesMade);
  takeAndHandleGuess();
}

function revealWholeBoard(): void {
  for (const letterSlot of board) {
    letterSlot.isRevealed = true;
  }
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
