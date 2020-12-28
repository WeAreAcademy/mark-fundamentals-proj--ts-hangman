import { question as prompt } from "readline-sync";
import randomWords from "random-words";

/**
 * A single character that is a lowercase letter of the Latin alphabet
 */
type LowercaseLetter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

/**
 * Represents a slot on the Hangman game board. It stores data on the underlying letter at that position as well as whether or not the letter has been revealed.
 *
 * @example
 * ```ts
 * // to represent an un-revealed 'p'
 * { letter: 'p', isRevealed: false }
 *
 * // to represent a revealed 'i'
 * { letter: 'i', isRevealed: true }
 * ```
 */
interface LetterSlot {
  /** The letter in this position */
  letter: LowercaseLetter;
  /** Whether or not the letter has been revealed */
  isRevealed: boolean;
}

/**
 * Represents the Hangman game board - an array of LetterSlots.
 *
 * @example
 * ```ts
 * // to represent 'cat', with only the T revealed:
 * [
 *   { letter: 'c', isRevealed: false },
 *   { letter: 'a', isRevealed: false },
 *   { letter: 't', isRevealed: true }
 * ]
 * ```
 * @example
 * ```ts
 * // to represent 'hello', with 'h' and 'l' revealed:
 * [
 *   { letter: 'h', isRevealed: true },
 *   { letter: 'e', isRevealed: false },
 *   { letter: 'l', isRevealed: true },
 *   { letter: 'l', isRevealed: true },
 *   { letter: 'o', isRevealed: false }
 * ]
 * ```
 */
type HangmanBoard = LetterSlot[];

/** The word which is hidden and to-be-guessed */
let hiddenWord: string;
/** The Hangman board, containing data on the underlying letters and whether or not they are shown */
let board: HangmanBoard;
/** The number of lives that a player has remaining */
let livesRemaining: number = 10;

/** Stores the guesses made by the player (both letters and words) */
let guessesMade: string[] = [];

/**
 * Checks whether or not a letter is present in the underlying board
 * @param letterToCheck The letter to check against the board
 * @returns a boolean for whether or not the letter is present
 */
function boardContainsLetter(letterToCheck: LowercaseLetter): boolean {
  return board.some((letterSlot) => letterSlot.letter === letterToCheck);
}

/**
 * Formats the board for printing to the console
 * @returns a formatted string that represents the board for printing to the console
 */
function boardForPrint(): string {
  return board.map(letterSlotForPrint).join(" ");
}

/**
 * Checks whether or not the game is ongoing, with two conditions:
 *  (a) player has some lives remaining; and
 *  (b) there are remaining letters to guess
 * @returns a boolean for whether the game is ongoing or not
 */
function gameIsOngoing(): boolean {
  /**
   * Check if all letters are guessed by checking whether every letter slot on the board is not revealed.
   */
  const isWholeBoardRevealed = board.every(
    (letterSlot) => letterSlot.isRevealed
  );
  return livesRemaining > 0 && !isWholeBoardRevealed;
}

/**
 * Handle a guess made by the player (which could be a letter or a word)
 * @param guess a word or letter guessed by the player
 */
function handleGuess(guess: string): void {
  storeGuess(guess);
  if (isALowercaseLetter(guess)) {
    processGuessedLetter(guess);
  } else {
    /** Assume that every guess that isn't a letter is a word guess. */
    processGuessedWord(guess);
  }
}

/**
 * A type guard that checks whether or not a given string is of the `LowercaseLetter` type.
 *
 * To learn more about type guards in TypeScript, see these readings on user-defined type guards: [Official TypeScript handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) | [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/type-system/typeguard#user-defined-type-guards)
 *
 * @param str the string to check
 * @returns a boolean indicating whether or not the string is a `LowercaseLetter`
 */
function isALowercaseLetter(str: string): str is LowercaseLetter {
  return str.length === 1 && !!str.match(/[a-z]/);
}

/**
 * Process a letter guessed by the player
 * @param letter the letter guessed by the player
 */
function processGuessedLetter(letter: LowercaseLetter): void {
  if (boardContainsLetter(letter)) {
    /** Reveal the letter on the board if it's present */
    console.log("Bullseye!");
    revealLetter(letter);
  } else {
    /** Otherwise, the player loses a life */
    console.log("It's not there...");
    livesRemaining -= 1;
  }
}

/**
 * Process a word guessed by the player
 * @param word the word guessed by the player
 */
function processGuessedWord(word: string): void {
  if (word === hiddenWord) {
    /** Reveal the whole board if the word is correct */
    console.log("Bullseye!");
    revealWholeBoard();
  } else {
    /** Otherwise, the player loses a life */
    console.log("That's not the word...");
    livesRemaining -= 1;
  }
}

/**
 * Convert a `LetterSlot` object into a print-friendly character
 * @param letterSlot the underlying letter slot data
 * @returns a character representing the letter slot, either the letter itself (if the letterSlot is revealed) or an `_` to represent a blank
 */
function letterSlotForPrint(letterSlot: LetterSlot): LowercaseLetter | "_" {
  if (letterSlot.isRevealed) {
    return letterSlot.letter;
  } else {
    /** If the letter is not revealed, return `_` to represent a blank */
    return "_";
  }
}

/**
 * Run a game of hangman
 */
function playGame(): void {
  console.log("Let's play hangman!");

  /**
   * Game setup:
   *  1. Randomise the hidden word (https://github.com/punkave/random-words)
   *  2. Prepare the board from the randomised word
   */
  hiddenWord = randomWords();
  board = wordToBoard(hiddenWord);

  while (gameIsOngoing()) {
    playRound();
  }

  /**
   * If game is no longer ongoing, either the player is out of lives or they have successfully guessed all the letters
   */
  if (livesRemaining === 0) {
    console.log("Bad luck, you're out of lives!");
  } else {
    console.log("Congrats! You won!");
  }
  console.log("The word was", hiddenWord.toUpperCase());
}

/**
 * Plays a 'round' of hangman, where the user makes a guess and it is processed against the board
 */
function playRound(): void {
  console.log("Here's the board:", boardForPrint());
  console.log("Your lives remaining:", livesRemaining);
  console.log("Your previous guesses:", guessesMade);
  takeAndHandleGuess();
}

/**
 * Reveals all the letters on the hangman board
 */
function revealWholeBoard(): void {
  for (const letterSlot of board) {
    letterSlot.isRevealed = true;
  }
}

/**
 * Reveals all letters on the board which match the target letter. (There might be multiple!)
 * @param letterToReveal the letter to reveal on the board
 */
function revealLetter(letterToReveal: LowercaseLetter): void {
  /** To account for multiple of the target letter being present, iterate through every slot on the board */
  for (const letterSlot of board) {
    if (letterSlot.letter === letterToReveal) {
      /** Make sure that the letter is revealed at all matching slots */
      letterSlot.isRevealed = true;
    }
  }
}

/**
 * Store all guessed made by the player
 * @param guess a letter or word guessed by the player
 */
function storeGuess(guess: string): void {
  /** Add the guess to the array of guesses */
  guessesMade.push(guess);
  /** Sort the guesses made (in-place) so that they are alphabetical */
  guessesMade.sort();
}

/**
 * Gets a guess from the player and processes it
 */
function takeAndHandleGuess(): void {
  const guess = prompt("What letter are you guessing? \n> ");

  if (guessesMade.includes(guess)) {
    /** If the guess has already been made, don't handle it normally - instead, route them back to make another guess */
    console.log("You've already guessed that! Try a different guess?");
    return takeAndHandleGuess();
  } else {
    handleGuess(guess);
  }
}

/**
 * Convert a given word to the `HangmanBoard` representation
 * @param word the word to convert to the `HangmanBoard`
 * @returns a `HangmanBoard` representation of the word (with all letters hidden at the start)
 */
function wordToBoard(word: string): HangmanBoard {
  const lettersArr = word.split("") as LowercaseLetter[];
  return lettersArr.map((char) => ({ letter: char, isRevealed: false }));
}

export default playGame;
