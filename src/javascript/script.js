"use strict";

/////////////////////////////////////////////////
// LOGGING
const cl = function (msg) {
  console.log(msg);
};

const cw = function (msg) {
  console.log(msg);
};

const ca = function (msg) {
  console.alert(msg);
};

/////////////////////////////////////////////////
// STASHING ELEMENTS
const displayPrevious = document.querySelector(".display__previous");
const base = document.querySelector(".base");
const pole = document.querySelector(".pole");
const topp = document.querySelector(".top");
const drop = document.querySelector(".drop");
const stage1 = document.querySelector(".stage1");
const stage2 = document.querySelector(".stage2");
const stage3 = document.querySelector(".stage3");
const stage4 = document.querySelector(".stage4");
const stage5 = document.querySelector(".stage5");
const stage6 = document.querySelector(".stage6");

/////////////////////////////////////////////////
// VARIABLES
const wordList = [
  // A
  "aria",
  "anomaly",
  "architect",

  // B
  "bandwagon",
  "banjo",
  "beekeeper",
  "blizzard",
  "buzzing",
  "buzzwords",
  "bookworm",
  "bulldog",
  "bullshit",
  "bully",
  "butterfly",

  // C
  "caliph",
  "cobweb",
  "croquet",
  "cycle",
  "crypt",
  "cockiness",
  "cockroach",
  "cocktail",

  // D
  "daddy",
  "deer",
  "delight",
  "delightful",
  "delightfulness",
  "delighting",
  "duplex",

  // E
  "elephant",

  // F
  "fashion",
  "fashionable",
  "fashionably",

  // G
  "gabby",
  "galaxy",
  "gizmo",
  "gnarly",
  "gossip",
  "grogginess",
  "gazebo",

  // H
  "haircut",
  "haircutter",

  // I
  "insects",
  "insecticide",

  // T
  "truce",
  "taco",
  "tutu",

  // M
  "meagan",
  "milkshake",
  "moo",
  "muffin",
  "muffler",
  "mushroom",

  // Z
  "zoo",
  "zombie",
  "zooming",
];

let gameIsOn = true;
let answerDisplay,
  userGuess,
  previousGuesses,
  incorrectGuesses,
  correctGuesses,
  randomWord,
  newBlanks,
  addBlankWords;

const init = function () {
  randomWord = wordList[Math.trunc(Math.random() * wordList.length)]; // generate random word
  answerDisplay = [];
  userGuess = "";
  previousGuesses = [];
  incorrectGuesses = 0;
  correctGuesses = 0;
  gameIsOn = true;
  newBlanks = "";

  // change hangman stage colors
  base.style.backgroundColor = "";
  pole.style.backgroundColor = "";
  topp.style.backgroundColor = "";
  drop.style.backgroundColor = "";
  stage1.style.outlineColor = "";
  stage2.style.backgroundColor = "";
  stage3.style.backgroundColor = "";
  stage4.style.backgroundColor = "";
  stage5.style.backgroundColor = "";
  stage6.style.backgroundColor = "";

  // reset incorrect guesses
  displayPrevious.textContent = `Previous: `;

  // reset hangman stages
  for (let i = 1; i < 7; i++) {
    if (
      document.querySelector(`.stage${i}`).classList.contains("hidden") !=
      "hidden"
    ) {
      document.querySelector(`.stage${i}`).classList.add("hidden");
    }
  }

  // assign random word blanks to display
  for (let i = 0; i < randomWord.length; i++) {
    newBlanks = document.createElement("div"); // create div
    newBlanks.classList.add("display__word-blanks"); // attach class to div
    document.querySelector(".display__word-box").appendChild(newBlanks); // assign div to a parent element
  }

  console.clear(); // DEBUGGING
  cw(`Random Word: ${randomWord}`); // DEBUGGING
};

// initialize game variables
init();

// store player input into userGuess variable
document
  .querySelector("#display__guess-input")
  .addEventListener("keydown", function (enter) {
    if (enter.key === "Enter") {
      userGuess = document
        .querySelector("#display__guess-input")
        .value.toLowerCase();

      document.querySelector("#display__guess-input").value = ""; // clear input box

      cw(`User Guessssss: ${userGuess}`);
      cw(`User Guess: ${userGuess}`); // DEBUGGING

      // check if the game is running
      if (gameIsOn) {
        cw(`Random Word: ${randomWord}`); // DEBUGGING

        // check if user guessed that letter already
        if (previousGuesses.includes(userGuess)) {
          alert("📕 You have already guessed that letter. Please try again.");
        } else {
          previousGuesses.push(userGuess);
          cw(`Previous Guessed: ${previousGuesses}`); // DEBUGGING

          // check user input for errors
          //// USER INPUTS NOTHING
          if (!userGuess) {
            alert("🛑 Invalid input. Please try again.");
          } else if (userGuess.length !== 1) {
            //// USER INPUTS MORE THAN 1 LETTER
            if (userGuess.match(/[0-9]/)) {
              alert("🛑 Thats a number");
            } else {
              //// MORE THAN 1 NUMBER
              alert("🛑 Enter one letter at a time, Please try again.");
            }

            //// USER INPUTS A NUMBER
          } else if (userGuess.match(/[0-9]/)) {
            alert("🛑 Thats a number");

            //// USER INPUTS CORRECT GUESS
          } else if (randomWord.includes(userGuess)) {
            // Loop through the random word and check every letter for a match
            for (let i = 0; i < randomWord.length; i++) {
              if (randomWord[i] === userGuess) {
                correctGuesses++;

                // update hidden word display
                addBlankWords = document.querySelectorAll(
                  ".display__word-blanks"
                )[i];
                addBlankWords.textContent = userGuess.toUpperCase();

                cw(`Correct Guesses: ${correctGuesses}`); // DEBUGGING
              }
              // update previous guesses display
              displayPrevious.textContent = `Previous: ${previousGuesses}`;

              checkGameOver(); // check if game is over
            }
            // USER INPUTS INCORRECT GUESS
          } else {
            incorrectGuesses++; // increment the incorrect guesses counter

            // update previous guesses display
            displayPrevious.textContent = `Previous: ${previousGuesses}`;

            // draw the next stage of the hangman
            document
              .querySelector(`.stage${incorrectGuesses}`)
              .classList.remove("hidden");

            alert("💥 That letter is not in the word.");

            cw(`Incorrect: ${incorrectGuesses}`); // DEBUGGING

            checkGameOver(); // check if game is over
          }
        }
      }
    }
  });

/////////////////////////////////////////////////
// CHECK IF THE PLAYER HAS WON OR LOST THE GAME
const checkGameOver = function () {
  //// PLAYER HAS WON
  if (correctGuesses === randomWord.length) {
    setTimeout(function () {
      alert("🥳 Congratulations! YOU WON!");
    }, 500);

    gameIsOn = false; // RESET GAME STATE

    // CHANGE HANGMAN STAGE COLORS
    base.style.backgroundColor = "#98D8AA";
    pole.style.backgroundColor = "#98D8AA";
    topp.style.backgroundColor = "#98D8AA";
    drop.style.backgroundColor = "#98D8AA";
    stage1.style.outlineColor = "#98D8AA";
    stage2.style.backgroundColor = "#98D8AA";
    stage3.style.backgroundColor = "#98D8AA";
    stage4.style.backgroundColor = "#98D8AA";
    stage5.style.backgroundColor = "#98D8AA";
    stage6.style.backgroundColor = "#98D8AA";

    //// PLAYER HAS LOST THE GAME
  } else if (incorrectGuesses === 6) {
    setTimeout(function () {
      alert(`🆘 You Lost! The Answer was: ${randomWord}`);
    }, 500);

    gameIsOn = false; // RESET GAME STATE

    // CHANGE HANGMAN STAGE COLORS
    base.style.backgroundColor = "#FF6969";
    pole.style.backgroundColor = "#FF6969";
    topp.style.backgroundColor = "#FF6969";
    drop.style.backgroundColor = "#FF6969";
    stage1.style.outlineColor = "#FF6969";
    stage2.style.backgroundColor = "#FF6969";
    stage3.style.backgroundColor = "#FF6969";
    stage4.style.backgroundColor = "#FF6969";
    stage5.style.backgroundColor = "#FF6969";
    stage6.style.backgroundColor = "#FF6969";
  }
};

const restartGame = function () {
  document
    .querySelector(".btn--restart-game")
    .addEventListener("click", function () {
      for (let i = 0; i < randomWord.length; i++) {
        const removeBlanks = document.querySelector(".display__word-blanks");
        document.querySelector(".display__word-box").removeChild(removeBlanks); // remove div from a parent element
      }
      init();
    });
};

const gameInfo = function () {
  document
    .querySelector(".btn--game-info")
    .addEventListener("click", function () {
      document.querySelector(".popup-game-info").classList.toggle("hidden");
      document.querySelector(".overlay").classList.toggle("hidden");
    });

  // close game info w/X
  document.querySelector(".popup-exit").addEventListener("click", function () {
    document.querySelector(".popup-game-info").classList.toggle("hidden");
    document.querySelector(".overlay").classList.toggle("hidden");
  });

  // close game with escape key
  document;
  window.addEventListener("keydown", function (escape) {
    if (escape.key === "Escape") {
      document.querySelector(".popup-game-info").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
    } else {
    }
  });

  // close game with click outside
  document.querySelector(".overlay").addEventListener("click", function () {
    document.querySelector(".popup-game-info").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
  });
};

restartGame();
gameInfo();
// comment code better
// refactor code
