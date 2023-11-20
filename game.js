const score = document.querySelector(".score");
const time = document.querySelector(".time");

const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const level = document.querySelector(".level");

let carElement = document.createElement("div");
carElement.setAttribute("class", "car");
carElement.style.backgroundImage = "url('assets/car.png')";
carElement.style.height = "200px"; // Set the height of the car
carElement.style.width = "px"; // Set the width of the car
carElement.style.backgroundSize = "cover"; // Ensure the image covers the div completely
gameArea.appendChild(carElement);

// loading audio files

let gameStart = new Audio();
let gameOver = new Audio();

let isGoodCollisionActive = false;
let isBadCollisionActive = false;

const levelSpeed = { easy: 7, moderate: 10, difficult: 14 };

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
let player = { speed: 7, score: 0, time: 60 };
startScreen.addEventListener("click", (e) => {
  player.speed = 6;
});

function setPositionWithExclusion(collisionElement, otherCollisionActive) {
  let position;
  do {
    position = Math.floor(Math.random() * 350);
  } while (
    otherCollisionActive &&
    Math.abs(position - otherCollisionLeft) < 100
  ); // Avoid overlap
  collisionElement.style.left = position + "px";
  return position;
}

startScreen.addEventListener("click", () => {
  // gameArea.classList.remove('hide');
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  gameStart.play();
  gameStart.loop = true;
  player.score = 0;
  player.time = 60;
  updateTimerDisplay();
  window.requestAnimationFrame(gamePlay);
  player.timer = setInterval(function () {
    if (player.time > 0) {
      player.time--;
      updateTimerDisplay();
    } else {
      clearInterval(player.timer); // Stop the timer
      onGameOver(); // Call Game Over when time is up
    }
  }, 1000);

  for (let i = 0; i < 5; i++) {
    let roadLineElement = document.createElement("div");
    roadLineElement.setAttribute("class", "roadLines");
    roadLineElement.y = i * 150;
    roadLineElement.style.top = roadLineElement.y + "px";
    gameArea.appendChild(roadLineElement);
  }

  let carElement = document.createElement("div");
  carElement.setAttribute("class", "car");
  gameArea.appendChild(carElement);

  player.x = carElement.offsetLeft;
  player.y = carElement.offsetTop;
});
function updateTimerDisplay() {
  time.innerHTML = "Time: " + player.time;
}

function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}

function onCollision(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function createGoodCollision() {
  if (!isGoodCollisionActive) {
    let goodCollision = document.createElement("div");
    goodCollision.setAttribute("class", "goodCollision");
    goodCollision.y = -350; // Start off-screen
    goodCollision.style.top = goodCollision.y + "px";
    const imageOptions = ["battery.png", "windmill.png", "chargingStation.png"];
    const chosenImage =
      imageOptions[Math.floor(Math.random() * imageOptions.length)];
    goodCollision.style.backgroundImage = `url('assets/${chosenImage}')`;
    goodCollision.style.left = Math.floor(Math.random() * 350) + "px";
    goodCollision.style.height = "80px";
    goodCollision.style.width = "80px";
    // Update in createGoodCollision and createBadCollision
    goodCollision.style.left = setPositionWithExclusion(
      goodCollision,
      isBadCollisionActive
    );

    gameArea.appendChild(goodCollision);
    isGoodCollisionActive = true;
  }
}

function createBadCollision() {
  if (!isBadCollisionActive) {
    let badCollision = document.createElement("div");
    badCollision.setAttribute("class", "badCollision");
    badCollision.y = -350; // Start off-screen
    badCollision.style.top = badCollision.y + "px";
    const imageOptions = ["oil.png", "petrol.png", "coal.png"];
    const chosenImage =
      imageOptions[Math.floor(Math.random() * imageOptions.length)];
    badCollision.style.backgroundImage = `url('assets/${chosenImage}')`;
    badCollision.style.left = Math.floor(Math.random() * 350) + "px";
    badCollision.style.height = "80px";
    badCollision.style.width = "80px";
    badCollision.style.left = setPositionWithExclusion(
      badCollision,
      isGoodCollisionActive
    );
    gameArea.appendChild(badCollision);
    isBadCollisionActive = true;
  }
}

function onGameOver() {
  player.start = false;
  gameStart.pause();
  gameOver.play();
  clearInterval(player.timer); // Clear the timer

  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "Game Over <br> Your final score is " +
    player.score +
    "<br> Press here to restart the game.";
}

function moveRoadLines() {
  let roadLines = document.querySelectorAll(".roadLines");
  roadLines.forEach((item) => {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function movegoodCollisions(carElement) {
  let goodCollisions = document.querySelectorAll(".goodCollision");
  goodCollisions.forEach((item) => {
    if (onCollision(carElement, item)) {
      player.time += 5; // Add 5 seconds
      updateTimerDisplay();
      item.remove(); // Remove the collision item from the game
      isGoodCollisionActive = false; // Reset the flag since the collision is gone
      // You don't need collisionOccurred here anymore
      let timeChange = document.createElement("div");
      timeChange.setAttribute("class", "timeChange");
      timeChange.style.backgroundImage = `url('assets/+10.png')`;
      timeChange.style.position = "absolute";
      timeChange.style.width = "800px";
      timeChange.style.height = "300px";
      timeChange.style.top = 0 + "px";
      // timeChange.style.left =  + "px";
      gameArea.appendChild(timeChange);

      setTimeout(() => timeChange.remove(), 1000); // Remove after 1 second
    } else if (item.y >= 750) {
      item.remove(); // Remove the collision item if it's off screen
      isGoodCollisionActive = false; // Reset the flag since the collision is gone
    } else {
      item.y += player.speed;
      item.style.top = item.y + "px";
    }
  });
}

function movebadCollisions(carElement) {
  let badCollisions = document.querySelectorAll(".badCollision");
  badCollisions.forEach((item) => {
    if (onCollision(carElement, item)) {
      player.time -= 10;
      updateTimerDisplay();
      item.remove();
      isBadCollisionActive = false;

      let timeChange = document.createElement("div");
      timeChange.setAttribute("class", "timeChange");
      timeChange.style.backgroundImage = `url('assets/-10.png')`;
      timeChange.style.position = "absolute";
      timeChange.style.width = "800px";
      timeChange.style.height = "300px";
      timeChange.style.top = 0 + "px";
      // timeChange.style.left =  + "px";
      gameArea.appendChild(timeChange);

      setTimeout(() => timeChange.remove(), 1000); // Remove after 1 second

      if (player.time <= 0) {
        onGameOver();
      }
    } else if (item.y >= 750) {
      item.remove();
      isBadCollisionActive = false;
    } else {
      item.y += player.speed;
      item.style.top = item.y + "px";
    }
  });
}

function gamePlay() {
  let carElement = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    moveRoadLines();
    movegoodCollisions(carElement);
    movebadCollisions(carElement);

    if (keys.ArrowUp && player.y > road.top + 70) player.y -= player.speed;
    if (keys.ArrowDown && player.y < road.bottom - 85) player.y += player.speed;
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < road.width - 70) player.x += player.speed;

    carElement.style.top = player.y + "px";
    carElement.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    if (Math.random() < 0.5) {
      // Adjust this probability as needed
      createGoodCollision();
    }
    if (Math.random() < 0.5) {
      // Adjust this probability as needed
      createBadCollision();
    }

    player.score++;
    const ps = player.score - 1;
    score.innerHTML = "Score: " + ps;
    time.innerHTML = "Time: " + player.time;
  }
}
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  e.preventDefault();
  keys[e.key] = false;
});
