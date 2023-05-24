"use strict";

/////////////////////////////////////////////////
//// VARIABLES
const hangmanDisplay = [
  // starting stage
  `+---+
  |   |
      |
      |
      |
      |
  =========`,
  // stage 1
  `  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  // stage 2
  `  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  // stage 3
  `  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  // stage 4
  `  +---+
  |   |
  O   |
 /|/  |
      |
      |
=========`,
  // stage 5
  `  +---+
  |   |
  O   |
 /|/  |
 /    |
      |
=========`,
  // stage 6
  `  +---+
  |   |
  O   |
 /|/  |
 / /  |
      |
=========`,
];

const wordList = [
  // B
  "bandwagon",
  "banjo",
  "beekeeper",
  "blizzard",
  "buzzing",
  "buzzwords",
  "bookworm",
  // C
  "caliph",
  "cobweb",
  "croquet",
  "cycle",
  "duplex",
  "crypt",
  "cockiness",
  // G
  "gabby",
  "galaxy",
  "gizmo",
  "gnarly",
  "gossip",
  "grogginess",
  "gazebo",
  // T
  "truce",
  "taco",
  "tutu",
  // M
  "meagan",
  "milkshake",
  "moo",
  // A
  "aria",
  "anomaly",
  "architect",
];

const randomWord = wordList[Math.trunc(Math.random() * wordList.length)]; // generate random word
let answerDisplay = [];
let userGuess = "";
let previousGuesses = [];
let incorrectGuesses = 0;
let correctGuesses = 0;

/////////////////////////////////////////////////
//// FUNCTIONS

const cl = function (message) {
  console.log(message);
};

const dev = function (message) {
  console.warn(message);
};

//// GAME START MESSAGE
cl("Developer: Truce Ramcharitar");
cl(`888                                                           
888                                                           
888                                                           
88888b.  8888b. 88888b.  .d88b. 88888b.d88b.  8888b. 88888b.  
888 "88b    "88b888 "88bd88P"88b888 "888 "88b    "88b888 "88b 
888  888.d888888888  888888  888888  888  888.d888888888  888 
888  888888  888888  888Y88b 888888  888  888888  888888  888 
888  888"Y888888888  888 "Y88888888  888  888"Y888888888  888 
                             888                              
                        Y8b d88P                              
                         "Y88P"                               `);

//// GENERATE ANSWER DISPLAY
for (let i = 0; i < randomWord.length; i++) {
  answerDisplay.push("_");
}

/////////////////////////////////////////////////
//// GAME LOGIC
while (incorrectGuesses < 6) {
  //   dev(`Generated Word: ${randomWord}`); // DEBUGGING
  //   dev(`Correct Guesses: ${correctGuesses}`); // DEBUGGING
  //   dev(`Incorrect Guesses: ${incorrectGuesses}`); // DEBUGGING
  //   dev(`Previous Guesses: ${previousGuesses}`); // DEBUGGING
  //   dev(`User Guess: ${userGuess}`); // DEBUGGING

  //// GAME DISPLAYS
  cl(hangmanDisplay[incorrectGuesses]); // display the hangman stage
  cl(`Answer: ${answerDisplay.join(" ")}`); // display the answer stage
  userGuess = prompt("❓ Guess a letter: ").toLocaleLowerCase(); // gather user input/guess

  //// CHECK IF USER HAS ALREADY GUESSED THAT LETTER
  if (previousGuesses.includes(userGuess)) {
    cl("📕 You have already guessed that letter. Please try again.");
  } else {
    previousGuesses.push(userGuess);

    //// USER INPUTS NOTHING
    if (!userGuess) {
      cl("🛑 Invalid input. Please try again.");

      //// USER INPUTS MORE THAN 1 LETTER
    } else if (userGuess.length !== 1) {
      cl("🛑 Enter one letter at a time, Please try again.");

      //// USER INPUTS CORRECT GUESS
    } else if (randomWord.includes(userGuess)) {
      // Loop through the random word and check every letter for a match
      for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === userGuess) {
          correctGuesses++;
          answerDisplay[i] = userGuess.toUpperCase(); // Update the answer display accordingly
        }
      }

      //// USER INPUTS INCORRECT GUESS
    } else {
      incorrectGuesses++;
    }

    //// CHECK IF THE GAME IS OVER
    if (correctGuesses === randomWord.length) {
      cl(answerDisplay.join(" "));
      cl("--------------------------------");
      cl("🥳 Congratulations! YOU WON!");
      break;
    } else if (incorrectGuesses === 6) {
      cl(hangmanDisplay[incorrectGuesses]);
      cl("--------------------------------");
      cl(`🆘 You Lost! The Answer was: ${randomWord}`);
      break;
    }
  }
}
