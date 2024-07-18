// Select Element
let allButtonMenu = document.querySelectorAll(".menu button");
let allOptionMenu = document.querySelectorAll(".list ul");
let worngSelector = document.querySelector(".wrong-attempts");
let worngSelectorSpan = document.querySelector(".wrong-attempts span");
let getLettersContainer = document.querySelector(".letters-container");
let wordContainer = document.querySelector(".word-container");
let playButton = document.querySelector(".play");
let containermenu = document.querySelector(".menu");
let home = document.querySelector(".fa-house");
let man = document.querySelector(".victim");
let roller = document.querySelector(".roller");
// Audios
let correctAudio = new Audio("/audios/correct.mp3");
let worngAudio = new Audio("/audios/worng.mp3");
let pullAudio = new Audio("/audios/hang.mp3");
let rollerAudio = new Audio("/audios/rotate.mp3");
let loseAudio = new Audio("/audios/lose.mp3");

// Menu
//  Hide the options menu when the play button is pressed
playButton.addEventListener("click", () => {
  containermenu.classList.add("hide");
});

// Display options and selection
allButtonMenu.forEach(function (button, index) {
  button.addEventListener("click", () => {
    // Display the dropdown menu when the button is clicked
    let currentMenu = allOptionMenu[index - 1];
    allOptionMenu.forEach(function (menu) {
      if (menu !== currentMenu) {
        menu.classList.remove("show-option");
      }
    });
    currentMenu.classList.toggle("show-option");

    // Update the button's label based on the user's selection
    let option = button.parentElement.querySelectorAll("ul li");
    option.forEach(function (selection) {
      selection.addEventListener("click", () => {
        button.innerHTML = selection.textContent;
        currentMenu.classList.remove("show-option");
      });
    });
  });
});

// Make words
//  Esay words
let easyWords = {
  countries: [
    "China",
    "Japan",
    "United States",
    "Germany",
    "France",
    "Italy",
    "United Kingdom",
    "India",
  ],
  animals: [
    "bird",
    "cat",
    "dog",
    "elephant",
    "lion",
    "tiger",
    "giraffe",
    "zebra",
  ],
  food: [
    "Pizza",
    "Burger",
    "Sushi",
    "Pasta",
    "Taco",
    "Falafel",
    "Paella",
    "Curry",
  ],
  sports: [
    "football",
    "basketball",
    "tennis",
    "cricket",
    "baseball",
    "golf",
    "swimming",
    "volleyball",
  ],
};
// Medium Words
let mediumWords = {
  countries: [
    "Argentina",
    "Australia",
    "Brazil",
    "Canada",
    "Egypt",
    "Greece",
    "Mexico",
    "Russia",
  ],
  animals: [
    "dolphin",
    "kangaroo",
    "penguin",
    "rhinoceros",
    "squirrel",
    "hippopotamus",
    "chimpanzee",
    "crocodile",
  ],
  food: [
    "Lasagna",
    "Quiche",
    "Tempura",
    "Gnocchi",
    "Moussaka",
    "Pierogi",
    "Shawarma",
    "Biryani",
  ],
  sports: [
    "hockey",
    "badminton",
    "rugby",
    "squash",
    "boxing",
    "archery",
    "cycling",
    "judo",
  ],
};
// HardWords
let hardWords = {
  countries: [
    "Azerbaijan",
    "Liechtenstein",
    "Luxembourg",
    "Mauritius",
    "Nicaragua",
    "Papua New Guinea",
    "Seychelles",
    "Turkmenistan",
  ],
  animals: [
    "axolotl",
    "echidna",
    "pangolin",
    "platypus",
    "aardvark",
    "narwhal",
    "okapi",
    "quokka",
  ],
  food: [
    "Bouillabaisse",
    "Ceviche",
    "Gazpacho",
    "Khao Soi",
    "Pho",
    "Ratatouille",
    "Spanakopita",
    "Xiao Long Bao",
  ],
  sports: [
    "triathlon",
    "equestrian",
    "biathlon",
    "fencing",
    "gymnastics",
    "pentathlon",
    "weightlifting",
    "yachting",
  ],
};
// Game
playButton.addEventListener("click", () => {
  setLabel();
  makeletters();
  let selectDifficulty = document.querySelector(".dandc span").textContent;
  let selectCategory = document.querySelector(".dandc h1").textContent;
  let difficulty;
  // defain wrongAttempts ;
  let wrongAttempts = 5;
  // Determine difficulty level based on user selection
  if (selectDifficulty === "Easy") {
    difficulty = easyWords;
    wrongAttempts = 7;
  } else if (selectDifficulty === "Medium") {
    difficulty = mediumWords;
  } else {
    difficulty = hardWords;
    wrongAttempts = 3;
  }
  worngSelectorSpan.innerHTML = wrongAttempts;
  worngSelector.classList.remove("hide");
  //random index to fetch a random word
  let random = Math.floor(
    Math.random() * difficulty[selectCategory.toLocaleLowerCase()].length
  );
  // Create word container and display each letter of the word in inside spans
  let word = difficulty[selectCategory.toLocaleLowerCase()][random];
  for (let i = 0; i < word.length; i++) {
    let newSpan = document.createElement("span");
    newSpan.innerHTML = word[i].toUpperCase();
    wordContainer.appendChild(newSpan);
  }

  // Check if the letter exists or not
  let LetterButtons = document.querySelectorAll(".letters-container button");
  let wordLetters = document.querySelectorAll(".word-container span");
  LetterButtons.forEach(function (button) {
    button.addEventListener("click", () => {
      let isMatch = false;
      for (let i = 0; i < word.length; i++) {
        if (button.textContent === word[i].toUpperCase()) {
          isMatch = true;
          wordLetters[i].classList.add("remove-hide");
        }
      }
      if (isMatch) {
        button.style.color = "green";
        button.style.border = "green solid";
        correctAudio.play();
      } else {
        button.style.color = "red";
        button.style.border = "red solid";
        wrongAttempts--;
        worngSelectorSpan.innerHTML = wrongAttempts;
        worngAudio.play();
        pullAudio.play();
        rollerAudio.play();
        pullTheRope();
      }
      button.classList.add("block-pointer");
      if (wrongAttempts <= 0) {
        getLettersContainer.classList.add("block-pointer");
        gameOver(word);
        loseAudio.play();
      } else {
        let win = false;
        let countCorrect = [...wordLetters].filter((letter) => {
          return letter.classList.contains("remove-hide");
        });
        if (countCorrect.length === wordLetters.length) {
          win = true;
        }
        showWinMessage(win);
      }
    });
  });
});

// Set the default difficulty and the default category
let defaultDifficulty = "Medium";
let defaultCategory = "Countries";
// set Category And  set Difficulty
function setLabel() {
  // set Category
  let setCategory = document.querySelector(".dandc h1");
  let labelCategory = document.querySelector(".category").textContent;
  setCategory.innerHTML = defaultCategory;
  if (labelCategory != "Category") {
    setCategory.innerHTML = labelCategory;
  }
  // set Difficulty
  let setDifficulty = document.querySelector(".dandc span");
  let labelDifficulty = document.querySelector(".difficulty").textContent;
  setDifficulty.innerHTML = defaultDifficulty;
  if (labelDifficulty != "Difficulty") {
    setDifficulty.innerHTML = labelDifficulty;
  }
}

function makeletters() {
  // Define the letters and create button for each letter
  let letters = [..."abcdefghijklmnopqrstuvwxyz "];
  letters.forEach((letter) => {
    let newEle = document.createElement("button");
    newEle.innerHTML = letter.toUpperCase();
    getLettersContainer.appendChild(newEle);
  });
}
// Game Over
function gameOver(word) {
  setTimeout(() => {
    let gameOverContainer = document.createElement("div");
    let h2GameOver = document.createElement("h2");
    let pGameover = document.createElement("p");
    let spanWord = document.createElement("span");
    let containerButton = document.createElement("div");
    let menuButton = document.createElement("button");
    let restartButton = document.createElement("button");
    gameOverContainer.classList.add("over-container");
    containerButton.classList.add("button-container");
    document.body.prepend(gameOverContainer);
    gameOverContainer.appendChild(h2GameOver);
    gameOverContainer.appendChild(pGameover);
    gameOverContainer.appendChild(containerButton);
    menuButton.textContent = "menu";
    restartButton.textContent = "restart";
    containerButton.appendChild(menuButton);
    containerButton.appendChild(restartButton);
    h2GameOver.textContent = "Game Over";
    pGameover.textContent =
      " You've run out of attempts and didn't guess the word. The correct word was : ";
    spanWord.textContent = word;
    pGameover.appendChild(spanWord);
    // menu
    menuGame(menuButton, gameOverContainer);
    //restart
    restartGame(restartButton, gameOverContainer);
  }, 500);
}

// menu function
function menuGame(menuButton, gameOverContainer) {
  menuButton.addEventListener("click", () => {
    gameOverContainer.classList.add("hide");
    containermenu.classList.remove("hide");
    getLettersContainer.textContent = null;
    wordContainer.textContent = null;

    restartPull();
    getLettersContainer.classList.remove("block-pointer");
  });
}
// restart function
function restartGame(restartButton, gameOverContainer) {
  restartButton.addEventListener("click", () => {
    containermenu.classList.remove("hide");
    gameOverContainer.classList.add("hide");
    getLettersContainer.textContent = null;
    wordContainer.textContent = null;
    getLettersContainer.classList.remove("block-pointer");
    restartPull();
    playButton.click();
  });
}

// Win messsage function

function showWinMessage(win) {
  if (win === true) {
    setTimeout(() => {
      let winContainer = document.createElement("div");
      let h2WinMessage = document.createElement("h2");
      let pWinMessage = document.createElement("p");
      let containerButton = document.createElement("div");
      let menuButton = document.createElement("button");
      let continueButton = document.createElement("button");
      winContainer.classList.add("win-container");
      containerButton.classList.add("button-container");
      h2WinMessage.textContent = "Congratulations";
      pWinMessage.textContent =
        "You successfully guessed the correct word without exhausting all your attempts,Maybe it's time to increase the difficulty level";
      document.body.prepend(winContainer);
      winContainer.appendChild(h2WinMessage);
      winContainer.appendChild(pWinMessage);
      winContainer.appendChild(containerButton);
      menuButton.textContent = "Menu";
      continueButton.textContent = "Continue";
      containerButton.appendChild(menuButton);
      containerButton.appendChild(continueButton);
      // menu
      menuwin(menuButton, winContainer);
      //restart
      continueWin(continueButton, winContainer);
    }, 500);
  }
}
function menuwin(menuButton, winContainer) {
  menuButton.addEventListener("click", () => {
    winContainer.classList.add("hide");
    containermenu.classList.remove("hide");
    getLettersContainer.textContent = null;
    wordContainer.textContent = null;
    restartPull();
    getLettersContainer.classList.remove("block-pointer");
  });
}
function continueWin(continueButton, winContainer) {
  continueButton.addEventListener("click", () => {
    winContainer.classList.add("hide");
    containermenu.classList.remove("hide");
    getLettersContainer.textContent = null;
    wordContainer.textContent = null;
    getLettersContainer.classList.remove("block-pointer");
    restartPull();
    playButton.click();
  });
}
// Home Icon
home.addEventListener("click", () => {
  containermenu.classList.remove("hide");
  getLettersContainer.textContent = null;
  wordContainer.textContent = null;
  restartPull();
  getLettersContainer.classList.remove("block-pointer");
});
// Pull the rope
let pull = -7.142;
let rotate = 360;
function pullTheRope() {
  man.style.transform = `translateY(${pull}px)`;
  pull = pull - 7.142;
  man.style.transition = "transform 2s";
  roller.style.transform = `rotate(${rotate}deg)`;
  roller.style.transition = "transform 2s";
  rotate = rotate + 360;
}
function restartPull() {
  man.style.transform = `translateY(0px)`;
  pull = -7.142;
  roller.style.transform = "rotate(0deg)";
  rotate = 360;
}
