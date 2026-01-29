let holes = [];
let scoreDisplay;
let timeDisplay;
let startScreen;
let gameScreen;
let resultPopup;
let finalScore;

let score = 0;
let timeLeft = 30;
let activeHole = null;
let gameTimer;
let penguinTimer;

document.addEventListener("DOMContentLoaded", () => {
  holes = document.querySelectorAll(".hole");
  scoreDisplay = document.getElementById("score");
  timeDisplay = document.getElementById("time");
  startScreen = document.getElementById("startScreen");
  gameScreen = document.getElementById("game");
  resultPopup = document.getElementById("resultPopup");
  finalScore = document.getElementById("finalScore");

  // ✅ SINGLE click handler (only once)
  holes.forEach(hole => {
    hole.addEventListener("click", () => {
      if (hole === activeHole) {
        score++;
        scoreDisplay.textContent = score;
        hole.classList.remove("active");
        activeHole = null; // ⭐ VERY IMPORTANT
      }
    });
  });
});

// START GAME
function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  penguinTimer = setInterval(showPenguin, 800);
  gameTimer = setInterval(countDown, 1000);
}

// SHOW PENGUIN
function showPenguin() {
  if (activeHole !== null) return;

  holes.forEach(hole => hole.classList.remove("active"));
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  randomHole.classList.add("active");
  activeHole = randomHole;
}
function showPenguin() {
  if (activeHole !== null) return;

  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  randomHole.classList.add("active");
  activeHole = randomHole;

  // 🐧 auto-disappear after 800ms
  setTimeout(() => {
    if (activeHole === randomHole) {
      randomHole.classList.remove("active");
      activeHole = null;
    }
  }, 800);
}

// COUNTDOWN
function countDown() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;

  if (timeLeft === 0) {
    clearInterval(gameTimer);
    clearInterval(penguinTimer);

    holes.forEach(hole => hole.classList.remove("active"));
    activeHole = null;

    finalScore.textContent = score;
    resultPopup.classList.add("show");
  }
}

// RESTART GAME
function restartGame() {
  resultPopup.classList.remove("show");
  gameScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
