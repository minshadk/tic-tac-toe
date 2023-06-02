oImage = "./images//icon-o.svg";
xImage = "./images//icon-x.svg";
xImageDefault = "./images//icon-x.svg";
oImageDefault = "./images//icon-o.svg";
let isOPlaying = false;
let isXPlaying = true;
let gamePad = null;
let count = 0;
let grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const modals = document.querySelectorAll(".modal");
const modalResult = document.querySelector(".model-result");
const modalRestart = document.querySelector(".model-restart");
const gameIntegators = document.querySelectorAll(".game-integator");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

let resultImg = document.querySelector(".result-img");
let resultText = document.querySelector(".result-text");

const turnIndicatorImg = document.querySelector(`.turn-icon`);

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelectorAll("img").forEach(function (img) {
    img.onerror = function () {
      this.style.display = "none";
    };
  });
});

const trunIndiecater = () => {
  if (isXPlaying) turnIndicatorImg.src = xImageDefault;
  else turnIndicatorImg.src = oImageDefault;
};

const oPlaying = (x, y) => {
  let img = document.querySelector(`#game-pad-${x}-${y}`);
  img.style.display = "flex";

  document.querySelector(`#game-pad-${x}-${y}`).src = oImage;

  grid[x][y] = 1;
  isOPlaying = false;
  isXPlaying = true;
  trunIndiecater();
  findWinner();
};
const xPlaying = (x, y) => {
  let img = document.querySelector(`#game-pad-${x}-${y}`);
  img.style.display = "flex";

  document.querySelector(`#game-pad-${x}-${y}`).src = xImage;

  grid[x][y] = 4;
  isXPlaying = false;
  isOPlaying = true;
  trunIndiecater();
  findWinner();
};

const playing = (e) => {
  count++;
  x = e.target.getAttribute("data-key-x");
  y = e.target.getAttribute("data-key-y");
  if (isOPlaying) oPlaying(x, y);
  else if (isXPlaying) xPlaying(x, y);
  else console.log("no one is playing");
};

const findWinner = () => {
  let sum = 0;
  // row wise
  for (let row = 0; row <= 2; row++) {
    sum = 0;
    for (let col = 0; col <= 2; col++) {
      sum = grid[row][col] + sum;
      console.log(sum);
      if (sum === 12) {
        showResult("x");
        return null;
      } else if (sum === 3) {
        showResult("o");
        return null;
      }
    }
  }
  // column wise
  for (let row = 0; row <= 2; row++) {
    sum = 0;

    for (let col = 0; col <= 2; col++) {
      sum = grid[col][row] + sum;
      console.log(sum);
      if (sum === 12) {
        showResult("x");
        return null;
      } else if (sum === 3) {
        showResult("o");
        return null;
      }
    }
  }
  // diagonal wise from right
  sum = 0;
  for (let i = 0; i <= 2; i++) {
    sum = grid[i][i] + sum;
    if (i === 2) {
      if (sum === 12) {
        showResult("x");
        return null;
      } else if (sum === 3) {
        showResult("o");
        return null;
      }
    }
  }
  // diagonal wise from left
  sum = 0;
  for (let row = 0, col = 2; row <= 2; row++, col--) {
    sum = grid[row][col] + sum;
    if (row === 2) {
      if (sum === 12) {
        showResult("x");
        return null;
      } else if (sum === 3) {
        showResult("o");
        return null;
      }
    }
  }

  if (count === 9) {
    showResult("draw");
    return;
  }
};

const gamePads = document.querySelectorAll(".game-pad");
gamePads.forEach((gamePad) => gamePad.addEventListener("click", playing));

const showResult = (result) => {
  modalResult.classList.remove("hidden");
  overlay.classList.remove("hidden");
  resultImg.style.display = "flex";

  if (result === "x") {
    resultImg.src = xImage;
    resultText.classList.add("light-green-font");
  } else if (result === "o") {
    resultImg.src = oImage;
    resultText.classList.add("yellow-font");
  } else if (result === "draw") {
    resultImg.style.display = "none";
    resultText.innerHTML = "IT'S A DRAW";
    resultText.classList.add("grey-font");
  }
};

const restart = () => {
  modalRestart.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modals.forEach((model) => model.classList.add("hidden"));
  overlay.classList.add("hidden");
};

const restartGame = () => {
  gameIntegators.forEach((gameIntegator) => (gameIntegator.src = ""));
  isOPlaying = false;
  isXPlaying = true;
  // gamePad = null;
  count = 0;
  grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  modals.forEach((model) => model.classList.add("hidden"));
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
