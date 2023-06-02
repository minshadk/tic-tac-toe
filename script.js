oImage = "./images//icon-o.svg";
xImage = "./images//icon-x.svg";
xImageDefault = "./images//icon-x.svg";
oImageDefault = "./images//icon-o.svg";
let isOPlaying = false;
let isXPlaying = true;
let gamePad = null;

let grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

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
        console.log("X wins");
        return null;
      } else if (sum === 3) {
        console.log("O wins");
        return null;
      } else {
        console.log("no winner");
        console.log(sum);
      }
    }
  }
  // column wise
  for (let row = 0; row <= 2; row++) {
    sum = 0;

    for (let col = 0; col <= 2; col++) {
      sum = grid[col][row] + sum;
      console.log(sum);
      console.log("consoleing from colum wise" + sum);
      if (sum === 12) {
        console.log("X wins");
        return null;
      } else if (sum === 3) {
        console.log("O wins");
        return null;
      } else {
        console.log("no winner");
        console.log(sum);
      }
    }
  }
  // diagonal wise from right
  sum = 0;
  for (let i = 0; i <= 2; i++) {
    sum = grid[i][i] + sum;
    if (i === 2) {
      if (sum === 12) {
        console.log("X wins");
        return null;
      } else if (sum === 3) {
        console.log("O wins");
        return null;
      } else {
        console.log("no winner");
        console.log(sum);
      }
    }
  }
  // diagonal wise from left
  sum = 0;
  for (let row = 0, col = 2; row <= 2; row++, col--) {
    sum = grid[row][col] + sum;
    if (row === 2) {
      if (sum === 12) {
        console.log(`consoleing sum for x wining ${sum}`);
        console.log("X wins");
        return null;
      } else if (sum === 3) {
        console.log("O wins");
        return null;
      } else {
        console.log("no winner");
        console.log(sum);
      }
    }
  }
};

const gamePads = document.querySelectorAll(".game-pad");
gamePads.forEach((gamePad) => gamePad.addEventListener("click", playing));
