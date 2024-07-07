"use strict";

//// LOGGING
const cw = function (msg) {
  console.warn(msg);
};

//// STASHING HTML ELEMENTS
const avgerageGuess = document.querySelector(".avg-guesses");
const totalGames = document.querySelector(".total-games");
const TotalWins = document.querySelector(".total-wins");
const displayPrevious = document.querySelector(".display__previous");
const displayGuessInput = document.querySelector("#display__guess-input");
const displayWordBox = document.querySelector(".display__word-box");
const popUpGameInfo = document.querySelector(".popup-game-info");
const btnGameInfo = document.querySelector(".btn--game-info");
const overlay = document.querySelector(".overlay");
const popUpExit = document.querySelector(".popup-exit");
const btnRestartGame = document.querySelector(".btn--restart-game");
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
const onePlayer = document.querySelector(".game-mode-pick--1player");
const twoPlayer = document.querySelector(".game-mode-pick--2player");
const wordListPick = document.querySelector(".word-list-pick");
const wordListPickEasyWords = document.querySelector(
  ".word-list-pick--easy-words"
);
const wordListPickHardWords = document.querySelector(
  ".word-list-pick--hard-words"
);
const reveal = document.querySelector(".btn--reveal");
const revealLetterStyling = document.querySelector(".btn--reveal");
const totalCoins = document.querySelector(".total-coins");

//// LIST OF RANDOM WORDS
import { easyWordList, hardWordList } from "./wordList.js";

//// DECLARING GAME VARIABLES
let easyWords = false;
let hardWords = false;
let gameIsOn = true;
let gameModeSelect = true;
let wins = 0;
let gamesPlayed = 0;
let avgGuesses = 0;
let totalGuesses = 0;
let coins = 0;
let randomWord,
  answerDisplay,
  userGuess,
  previousGuesses,
  incorrectGuesses,
  correctGuesses,
  newBlanks,
  addBlankWords,
  isTwoPlayer;

const avgGuess = function () {
  // calc avg guess
  avgGuesses = Math.trunc(totalGuesses / gamesPlayed); // average guesses it takes the user to guess correctly
  //   cw(`Average Guesses: ${avgGuesses}`); // DEBUGGING
};

/////////////////////////////////////////////////
//// RESET & INITIALIZE GAME
const init = function () {
  //// RESET GAME VARIABLES
  //   randomWord = wordList[0][Math.trunc(Math.random() * wordList.length)]; // generate random word
  gameIsOn = true;
  answerDisplay = [];
  userGuess = "";
  previousGuesses = [];
  incorrectGuesses = 0;
  correctGuesses = 0;
  newBlanks = "";

  //// RESET HANGMAN STAGE COLORS
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

  //// RESET HANGMAN STAGES
  for (let i = 1; i < 7; i++) {
    if (
      document.querySelector(`.stage${i}`).classList.contains("hidden") !=
      "hidden"
    ) {
      document.querySelector(`.stage${i}`).classList.add("hidden");
    }
  }

  //// RESET PREVIOUS GUESSES
  displayPrevious.textContent = `Previous: `;

  //// CREATE BLANKS TO RANDOM WORD
  for (let i = 0; i < randomWord.length; i++) {
    newBlanks = document.createElement("div"); // create div
    newBlanks.classList.add("display__word-blanks"); // attach class to div
    document.querySelector(".display__word-box").appendChild(newBlanks); // assign div to a parent element
  }

  //   console.clear(); // DEBUGGING
};

const onePlayerInit = function () {
  easyWords == true
    ? (randomWord =
        easyWordList[Math.trunc(Math.random() * easyWordList.length)])
    : (randomWord =
        hardWordList[Math.trunc(Math.random() * hardWordList.length)]); // generate random word
  init();
};

const twoPlayerInit = function () {
  randomWord = prompt("Enter a word to guess").toLowerCase();
  init();
};

/////////////////////////////////////////////////
//// GAME LOGIC
const gameLogic = function () {
  //// CHECK IF THE GAME STATE IS ON (IS THE GAME RUNNING?)
  if (gameIsOn) {
    revealLetter();
    // cw(`Coins: ${coins}`); // DEBUGGING
    // cw(`Random Word: ${randomWord}`); // DEBUGGING

    //// CHECK IF USER INPUTS NOTHING OR ANYTHING THATS NOT A LETTER OR MORE THAN 1 NUMBER OR LETTER
    if (!userGuess || !userGuess.match(/[a-z]/) || userGuess.length > 1) {
      alert("🛑 Invalid input, One Letter at a time! Please try again.");

      //// CHECK IF USER HAS GUESSED THAT LETTER ALREADY
    } else {
      if (previousGuesses.includes(userGuess)) {
        alert("📕 You have already guessed that letter. Please try again.");
      } else {
        previousGuesses.push(userGuess); // update previous guesses display
        // cw(`Previous Guessed: ${previousGuesses}`); // DEBUGGING

        //// CHECK IF USER INPUTS CORRECT GUESS
        if (randomWord.includes(userGuess)) {
          totalGuesses += 1; // increment avg guesses
          //   cw(`Total Guesses: ${totalGuesses}`); // DEBUGGING

          //// LOOP THE LENGTH OF THE RANDOM WORD AND CHECK EACH LETTER FOR A MATCH
          for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === userGuess) {
              correctGuesses++;

              // UPDATE BLANKS DISPLAY TO SHOW CORRECT GUESS
              addBlankWords = document.querySelectorAll(
                ".display__word-blanks"
              )[i]; // locate the correct blank to assign the word to
              addBlankWords.textContent = userGuess.toUpperCase(); // assign word to the blank

              //   cw(`Correct Guesses: ${correctGuesses}`); // DEBUGGING
            }
            //// UPDATE PREVIOUS GUESSES DISPLAY
            displayPrevious.textContent = `Previous: ${previousGuesses}`;
          }
          //// CHECK IF USER INPUTS INCORRECT GUESS
        } else {
          totalGuesses += 1; // increment avg guesses
          //   cw(`Total Guesses: ${totalGuesses}`); // DEBUGGING

          incorrectGuesses++;

          // UPDATE PREVIOUS GUESSES DISPLAY
          displayPrevious.textContent = `Previous: ${previousGuesses}`;

          // DRAW THE NEXT STAGE OF THE HANGMAN
          document
            .querySelector(`.stage${incorrectGuesses}`)
            .classList.remove("hidden");

          //   cw(`Incorrect: ${incorrectGuesses}`); // DEBUGGING
        }
      }
    }
    checkGameOver();
  }
};

/////////////////////////////////////////////////
//// GAME LOOP
const gameLoop = function () {
  displayGuessInput.addEventListener("keydown", function (enter) {
    //// CHECK IF USER PRESSED ENTER & STORE THE GUESS IF TRUE
    if (enter.key === "Enter") {
      userGuess = displayGuessInput.value.toLowerCase();
      displayGuessInput.value = ""; // clear input box after user pressed enter
      // revealLetterStyle(); // check if user can use the reveal letter button

      //   cw(`User Guess: ${userGuess}`); // DEBUGGING

      gameLogic();
      revealLetterStyle(); // check if user can use the reveal letter button
    }
  });
};

/////////////////////////////////////////////////
//// WIN CONDITION
const checkGameOver = function () {
  //// PLAYER HAS WON
  if (correctGuesses === randomWord.length) {
    setTimeout(function () {
      alert("🥳 Congratulations! YOU WON!");
    }, 500);

    wins += 1; // increment wins
    coins += 2;
    gamesPlayed += 1; // increment games played
    totalCoins.textContent = `Coins: ${coins}`;
    totalGames.textContent = `Games Played: ${gamesPlayed}`;
    TotalWins.textContent = `Total Wins: ${wins}`;
    // cw(`Games Played: ${gamesPlayed}`); // DEBUGGING
    gameIsOn = false; // RESET GAME STATE
    avgGuess();
    avgerageGuess.textContent = `Average Guesses: ${avgGuesses}`;

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
  } else if (incorrectGuesses == 6) {
    setTimeout(function () {
      alert(`🆘 You Lost! The Answer was: ${randomWord}`);
    }, 500);

    gamesPlayed = gamesPlayed + 1;
    totalGames.textContent = `Games Played: ${gamesPlayed}`;
    TotalWins.textContent = `Total Wins: ${wins}`;
    // cw(`Games Played: ${gamesPlayed}`); // DEBUGGING
    gameIsOn = false; // RESET GAME STATE
    avgGuess();
    avgerageGuess.textContent = `Average Guesses: ${avgGuesses}`;

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

/////////////////////////////////////////////////
//// REVEAL A LETTER (STYLING)

const revealLetterStyle = function () {
  if (coins >= 1) {
    revealLetterStyling.classList.remove("red");
  } else if (coins <= 0) {
    revealLetterStyling.classList.add("red");
  }
};

/////////////////////////////////////////////////
//// REVEAL A LETTER
const revealLetter = function () {
  reveal.addEventListener("click", function () {
    revealLetterStyle(); // check if user can use the reveal letter button

    if (coins >= 1) {
      let randomLetterFromRandomWord =
        randomWord[Math.trunc(Math.random() * randomWord.length)]; // display random letter from random word

      if (!previousGuesses.includes(randomLetterFromRandomWord)) {
        coins -= 1;
        totalCoins.textContent = `Coins: ${coins}`; // update total coins display
        userGuess = randomLetterFromRandomWord.toLowerCase();
        cw(`Random Letter From Random Word: ${randomLetterFromRandomWord}`);
        cw(`Coins: ${coins}`);
      }

      gameLogic();
    } else {
      alert("🌕 You have no coins! Win a game to gain coins!");
    }
  });
};

/////////////////////////////////////////////////
//// RESTART GAME
const restartGame = function () {
  revealLetterStyle(); // check if user can use the reveal letter button

  //// REMOVE BLANKS FROM THE DISPLAY
  btnRestartGame.addEventListener("click", function () {
    for (let i = 0; i < randomWord.length; i++) {
      const removeBlanks = document.querySelector(".display__word-blanks");
      displayWordBox.removeChild(removeBlanks); // remove div from a parent element
    }
    //// EXECUE INIT FUNCTION (RESET GAME VARIABLES & STATE)
    if (isTwoPlayer) {
      avgGuess();
      twoPlayerInit();
    } else {
      avgGuess();
      onePlayerInit();
    }
  });
};

/////////////////////////////////////////////////
//// DISPLAY GAME INFO
const gameInfo = function () {
  const closePopUp = function () {
    popUpGameInfo.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  const openPopUp = function () {
    popUpGameInfo.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  // OPEN GAME INFO POP ON CLICK
  btnGameInfo.addEventListener("click", function () {
    openPopUp();
  });

  // CLOSE GAME INFO POPUP ON CLICK OF THE "X" (popup-exit) element
  popUpExit.addEventListener("click", function () {
    closePopUp();
  });

  // CLOSE GAME INFO POPUP ON "ESCAPE" KEYDOWN
  document;
  window.addEventListener("keydown", function (escape) {
    if (escape.key === "Escape") {
      closePopUp();
    }
  });

  // CLOSE GAME INFO POPUP WITH CLICK OUTSIDE OF THE POPUP
  overlay.addEventListener("click", function () {
    closePopUp();
  });
};

/////////////////////////////////////////////////
//// FIRST THING TO RUN!! (SELECT GAME MODES!)
const gameMode = function () {
  // PLAYER 1
  if (gameModeSelect) {
    onePlayer.addEventListener("click", function () {
      cw("Selected Game Mode: 1 Player");

      document.querySelector(".word-list-pick").classList.remove("hidden");
      document.querySelector(".game-mode-pick").classList.add("hidden");
      if (gameModeSelect) {
        //    LISTEN FOR CLICK EVENT FOR EASY WORDS
        wordListPickEasyWords.addEventListener("click", function () {
          document.querySelector(".word-list-pick").classList.add("hidden");
          randomWord =
            easyWordList[Math.trunc(Math.random() * easyWordList.length)]; // generate random word
          gameModeSelect = false;
          easyWords = true;
          startGame();

          //   cw(`Word List: ${easyWordList}`); // DEBUGGING
          //   cw(`Difficulty: Easy`); // DEBUGGING
          //   cw(`Random Word: ${randomWord}`); // DEBUGGING
        });

        // LISTEN FOR CLICK EVENT FOR HARD WORDS
        wordListPickHardWords.addEventListener("click", function () {
          wordListPick.classList.add("hidden");
          randomWord =
            hardWordList[Math.trunc(Math.random() * hardWordList.length)]; // generate random word
          gameModeSelect = false;
          hardWords = true;

          // run game for multiplayer
          startGame();

          //   cw(`Word List: ${hardWordList}`); // DEBUGGING
          //   cw(`Difficulty: Hard`); // DEBUGGING
          //   cw(`Random Word: ${randomWord}`); // DEBUGGING
        });
      }
    });

    //// PLAYER 2
    twoPlayer.addEventListener("click", function () {
      cw("Selected Game Mode: 2 Player");

      document.querySelector(".game-mode-pick").classList.add("hidden");
      randomWord = prompt("Enter a word to guess").toLowerCase();
      gameModeSelect = false;
      isTwoPlayer = true;
      //   cw(randomWord); // DEBUGGING

      // run game for single player
      startGame();
    });
  }
};

/////////////////////////////////////////////////
//// EXECUTE ALL GAME FUNCTIONS
const startGame = function () {
  init();
  //   cw("Init running"); // DEBUGGING
  gameLoop();
  //   cw("Game loop running"); // DEBUGGING
  restartGame();
  //   cw("Restart running"); // DEBUGGING
};

/////////////////////////////////////////////////
//// START THE GAME
gameInfo();
// cw("gameInfo running"); // DEBUGGING

gameMode();
// cw("gameMode running"); // DEBUGGING
