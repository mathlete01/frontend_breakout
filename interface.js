const BASE_URL = "http://localhost:3000";
const PLAYERS_URL = `${BASE_URL}/players`;
const GAMES_URL = `${BASE_URL}/games`;

document.addEventListener("DOMContentLoaded", (event) => {
  function setCurrentPlayer(obj) {
    CURRENT_PLAYER = obj.id;
    console.log(`CURRENT_PLAYER = ${CURRENT_PLAYER}`);
    createGame(CURRENT_PLAYER);
  }

  function setCurrentGame(obj) {
    CURRENT_GAME = obj.id;
    console.log(`CURRENT_GAME = ${CURRENT_GAME}`);
  }

  function createPlayer() {

    let configObjCreate = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(PLAYERS_URL, configObjCreate)
      .then((res) => res.json())
      .then((data) => setCurrentPlayer(data))
      .catch((errors) => console.log(`createPlayer: ${errors}`));
  }

  function createGame(id) {
    console.log(`createGame id = ${id}`);
    let formData = {
      player_id: id,
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(GAMES_URL, configObj)
      .then((res) => res.json())
      .then((obj) => setCurrentGame(obj))
      .then(startGame())
      .catch((errors) => console.log(`createGame: ${errors}`));
  }

  function startGame() {
    initKeys(keys);
    interval = setInterval(draw, 10);
  }

  function endGame() {
    clearInterval(interval);
    interval = "";
    console.log(
      `endGame called, CURRENT_GAME = ${CURRENT_GAME}, CURRENT_PLAYER = ${CURRENT_PLAYER}`
    );
    let formData = {
      id: CURRENT_GAME,
      score: score,
    };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(GAMES_URL, configObj)
      .then((res) => res.json())
      .then(renderForm())
      .catch((errors) => console.log(`endGame: ${errors}`));
  }

  function savePlayer(name) {
    console.log(`savePlayer:name = ${name}`);
    let formData = {
      id: CURRENT_PLAYER,
      name: name,
    };

    let configOb = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(PLAYERS_URL, configOb)
      .then((res) => res.json())
      .then((obj) => console.log(obj))
      .then(updateGame(name))
      .catch((errors) => console.log(`savePlayer: ${errors}`));
  }

  function updateGame(name) {
    console.log(`updateGame called: name = ${name}`);
    let formData = {
      id: CURRENT_GAME,
      name: name,
    };

    let configOb = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(GAMES_URL, configOb)
      .then((res) => res.json())
      .then((obj) => console.log(obj))
      .then(document.location.reload())
      .catch((errors) => console.log(`updateGame: ${errors}`));
  }

  function renderForm() {
    console.log("renderForm called");
    const playername = document.createElement("input");
    playername.setAttribute("name", "playername");
    playername.placeholder = "enter name";

    const btnSave = document.createElement("button");
    btnSave.innerText = "Save Game";
    btnSave.addEventListener("click", () => savePlayer(playername.value));

    const form = document.getElementById("form");
    form.append(playername);
    form.append(btnSave);
  }

  function renderInterface() {
    const browser = navigator.appName;
    const platform = navigator.platform;

    const btnStart = document.createElement("button");
    btnStart.setAttribute("id", "btn-start");
    btnStart.innerHTML = "Start Game";
    btnStart.addEventListener("click", () => createPlayer());

    const interface = document.getElementById("interface");
    interface.append(btnStart);
  }

  renderInterface();

  document.body.addEventListener("keydown", function (ev) {
    let keyPressed = ev.key;
    let keyObj = KEY_ARRAY.find(({ name }) => name === keyPressed);
    keyObj.s = 1;
    ev.preventDefault(); // cancels default actions
    return false; // cancels this function only
  });

  document.body.addEventListener("keyup", function (ev) {
    let keyReleased = ev.key;
    let keyObj = KEY_ARRAY.find(({ name }) => name === keyReleased);
    keyObj.s = 0;
    ev.preventDefault(); // cancels default actions
    return false; // cancels this function only
  });

  function collisionDetection(KEY_ARRAY) {
    for (let i = 0; i < KEY_ARRAY.length; i++) {
      let b = KEY_ARRAY[i];
      console.log(`b = ${b}`);
      console.log(`b.s = ${b.s}`);
      if (b.s == 1) {
        if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          score++;
        }
      }
    }
  }
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

  KEY_ARRAY = [];

  function initKeys(keys) {
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i].name;
      let w = keys[i].segments * brickWidth;
      let h = brickHeight;
      let x = w * i;
      let y = keys[i].row * brickHeight;
      let s = keys[i].status;
      KEY_ARRAY.push({ name: k, x: x, y: y, w: w, h: h, s: s });
    }
  }

  function drawKeys(array) {
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
      if (key.s == 1) {
        drawKey(key.k, key.x, key.y, key.w, key.h);
      }
    }
  }

  function drawKey(name, brickX, brickY, brickWidth, brickHeight) {
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.id = name;
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(name, brickX + brickWidth / 2, brickY + brickHeight / 2);
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 8, 20);
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
  }

  let myReq;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawKeys(KEY_ARRAY);
    drawBall();
    drawScore();
    drawLives();
    collisionDetection(KEY_ARRAY);

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        lives--;
        if (!lives) {
          console.log("GAME OVER");
          endGame();
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = speed;
          dy = -1 * speed;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;

  }

  const w = window.innerWidth;
  const h = window.innerHeight;
  let speed = 0.3
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let ballRadius = 10;
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = speed;
  let dy = -1 * dx
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;
  let rightPressed = false;
  let leftPressed = false;
  let brickRowCount = 5;
  let brickColumnCount = 10;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  let keySegments = 15;
  let brickWidth = w / keySegments;
  let brickHeight = brickWidth;
  let topRow = 100;
  let interval = "";
  let score = 0;
  let lives = 3;
  const keys = [
    { name: "Tab", row: 1, segments: 2, status: 0 },
    { name: "q", row: 1, segments: 1, status: 0 },
    { name: "w", row: 1, segments: 1, status: 0 },
    { name: "e", row: 1, segments: 1, status: 0 },
    { name: "r", row: 1, segments: 1, status: 0 },
    { name: "t", row: 1, segments: 1, status: 0 },
    { name: "y", row: 1, segments: 1, status: 0 },
    { name: "u", row: 1, segments: 1, status: 0 },
    { name: "i", row: 1, segments: 1, status: 0 },
    { name: "o", row: 1, segments: 1, status: 0 },
    { name: "p", row: 1, segments: 1, status: 0 },
    { name: "[", row: 1, segments: 1, status: 0 },
    { name: "]", row: 1, segments: 1, status: 0 },
    { name: "\\", row: 1, segments: 1, status: 0 },
    // { name: "CapsLock", row: 2, segments: 3, status: 0 },
    // { name: "Enter", row: 2, segments: 1, status: 0 },
    // { name: "ArrowLeft", row: 4, segments: 1, status: 0 },
    // { name: "ArrowRight", row: 4, segments: 1, status: 0 }
  ];
});
