---
module: fundamentals

level: 3

methods:
  - team
  - pair
  - solo

tags:
  - wip
---

# Hangman

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

> This is part of Academy's [technical curriculum for **The Mark**](https://github.com/WeAreAcademy/curriculum-mark). All parts of that curriculum, including this project, are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

You have learned how to read, extend and write code for a **JavaScript CLI game**. This means that you can also learn how to build a CLI in ***Type*Script**!

In this challenge, you will work out how an existing CLI game in TypeScript works, using the same ideas which you've been applying in Python and JavaScript: _variables_, _control flow_ and _functions_.

There are a couple of additional things that TypeScript adds to JavaScript (e.g. `interface`s and `type`s).

## Learning Outcomes

- Interpret code written by others
- Use variable declaration and assignment in TypeScript
- Use control flow in TypeScript
- Use functions and arguments in TypeScript
- Use search engines as a learning and knowledge aid
- Add code to a codebase written by others
- Constrain variables and arguments in TypeScript

## Exercise 1: Installing and demoing

**Success criterion:** playing a few games of Hangman on your local machine by running the TypeScript programme written.

Firstly, clone this repository to your local machine in some sensible place, for example:

```bash
cd ~/Development/Academy # or wherever you're organising everything
git clone https://github.com/WeAreAcademy/mark-fundamentals-proj--ts-hangman.git
```

Then, change into the new directory and install the files:

```bash
cd mark-fundamentals-proj--ts-hangman
yarn
```

Finally, run the programme!

```bash
yarn start
```

## Exercise 2: Reading, understanding and documenting

**Success criterion:** a document which outlines how you think this TypeScript programme works. You don't have to achieve a theory which explains 100%, but you should strive to explain as much as possible.

(N.B.: The _correctness_ of your theory is **much less important** than the _process_ of forming this document. [Forming a prediction, and then discovering it was wrong, is an effective way to learn](https://www.sciencedirect.com/science/article/abs/pii/S0959475217303468)!)

Steps that we have previously suggested as a learning exercise (and suggest again) include:

1. Take some time to read and digest the code
2. Google things that you don't understand
3. Experiment with changing things
4. Produce a narrative document

A good narrative document for this game would walk through at least one game of Hangman and explain how the programme code is leading to the terminal output. (Screenshots of the terminal and/or snippets of programme code are likely to be helpful here.)

## Exercise 3: TypeScript-specific notes

The basic principles of variable assignment, control flow and functions are the same between TypeScript and JavaScript (and also Python).

TypeScript does introduce some additional things, though:

| Item | JavaScript example | TypeScript example |
| --- | --- | --- | --- | --- | --- |
| Variable declaration | `let counter = 10` | `let counter: number = 10` |
| Function declaration | <pre>function printCounterValue() { <br /> &nbsp;console.log(counter) <br /> }</pre> | <pre>function printCounterValue(): void { <br /> &nbsp;console.log(counter) <br />}</pre> |
| Parameter declaration | <pre>function incrementCounter(n) { <br /> &nbsp;counter += n; <br /> &nbsp;return counter; <br /> }</pre> | <pre>function incrementCounter(n: number): number { <br /> &nbsp;counter += n; <br /> &nbsp;return counter; <br /> }</pre> |
| Interfaces | N/A | <pre>interface FootballMatch { <br/>&nbsp;homeGoals: number; <br/>&nbsp;awayGoals: number; <br/>&nbsp;teamNames: string[], <br/>&nbsp;isFullTime: boolean }</pre> |
| Types | N/A | <pre>type FootballPosition = 'striker' | 'midfielder' | 'defender' | 'goalkeeper'</pre> |

## Exercise 4: Check your understanding

**Success criterion:** a conversation with a Faculty member and amended comments.

Talk to a member of Faculty about your understanding of the game.

Amend the comments on your copy of the code for any important points that come out of the conversation.

## Exercise 5: Extend the game

**Success criterion:** a game which can be playtested and which satisfies the specified requirements for each extension.

### Extension 1: Rock Paper Scissors Lizard Spock

Rock Paper Scissors often ends in draws - something which some people think is a feature, and others think is a bug!

Let's assume that reducing the likelihood of draws is desirable, and extend the game to [_Rock Paper Scissors Lizard Spock_](http://www.samkass.com/theories/RPSSL.html).

(How to play? Check out [Sheldon Cooper's explanation](https://www.youtube.com/watch?v=Kov2G0GouBw).)

**Requirements**

1. The computer should randomly choose one of the five options
2. All five options (and tolerable variants) should be allowed as input from the user
3. The programme should correctly report back the result of a match

### Extension 2: replay in a case of draw

When you get a draw in RPS(cLSp), you often immediately replay the game.

Currently, our programme doesn't do that!

**Requirements**

Add a feature where:

1. If you draw, you are asked to play again (until there is an eventual winner)
2. When there is a winner, the programme ends

## Exercise 6: Commentary and reflection

**Success criterion:** documented reflections.

1. What are the main similarities and differences you can see between Python and JavaScript?
2. How easy or difficult was it to understand the code?
   1. What was easiest to understand? In what way?
   2. What was hardest to understand? In what way?
3. How easy or difficult was it to _add to_ the code?
