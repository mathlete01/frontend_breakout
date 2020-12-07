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
    initKeys(row0);
    initKeys(row1);
    initKeys(row2);
    initKeys(row3);
    initKeys(row4);
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

  function renderGameboard(){
    ctx.width = window.innerWidth
    ctx.height = window.innerHeight
    console.log(`ctx.width = ${ctx.width}`)
    console.log(`window.innerWidth = ${window.innerWidth}`)
  }

  document.body.addEventListener("keydown", function (ev) {
    ev.preventDefault(); // cancels default actions
    let keyPressed = ev.key;
    console.log(`ev = ${ev}`)
    let keyObj = KEY_ARRAY.find(({ name }) => name === keyPressed);
    keyObj.s = 1;
    // ev.preventDefault(); // cancels default actions
    return false; // cancels this function only
  });

  document.body.addEventListener("keyup", function (ev) {
    ev.preventDefault(); // cancels default actions
    let keyReleased = ev.key;
    let keyObj = KEY_ARRAY.find(({ name }) => name === keyReleased);
    keyObj.s = 0;
    //ev.preventDefault(); // cancels default actions
    return false; // cancels this function only
  });

  function collisionDetection(KEY_ARRAY) {
    for (let i = 0; i < KEY_ARRAY.length; i++) {
      let b = KEY_ARRAY[i];
      if (b.s == 1) {
        if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + keyHeight) {
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
    //console.log(`keys.length = ${keys.length}`)
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i].name;
      //console.log(`Drawing = ${k}`)
      let w = keys[i].segments * keyWidth;
      let h = keyHeight;
      let x = w * i;
      let y = keys[i].row * keyHeight;
      let s = keys[i].status;
      KEY_ARRAY.push({ name: k, x: x, y: y, w: w, h: h, s: s });
    }
  }

  function drawKeys(array) {
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
     if (key.s == 1) {
        drawKey(key.name, key.x, key.y, key.w, key.h);
     }
    }
  }

  function drawKey(name, keyX, keyY, keyWidth, keyHeight) {
    //console.log(`Drawing = ${name}`)
    ctx.beginPath();
    ctx.rect(keyX, keyY, keyWidth, keyHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.id = name;
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(name, keyX + keyWidth / 2, keyY + keyHeight / 2);
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 8, 20);
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: " + lives, canvas.width - 80, 20);
  }

  let myReq;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2
    ctx.strokeStyle = "#000000"
    ctx.strokeRect(0,0,canvas.width, canvas.height)
    //ctx.fillStyle = "#0000FF"
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
  let keySegments = 15;
  const factor = 5/keySegments
  canvas.width = w
  canvas.height = factor * w
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
  let keyRowCount = 5;
  let keyColumnCount = 15;
  let keyPadding = 10;
  let keyOffsetTop = 30;
  let keyOffsetLeft = 30;
  let keyWidth = w / keySegments;
  let keyHeight = keyWidth;
  let topRow = 100;
  let interval = "";
  let score = 0;
  let lives = 3;
  const row0 = [
    { name: "`", row: 0, segments: 2, status: 0 },
    { name: "1", row: 0, segments: 1, status: 0 },
    { name: "2", row: 0, segments: 1, status: 0 },
    { name: "3", row: 0, segments: 1, status: 0 },
    { name: "4", row: 0, segments: 1, status: 0 },
    { name: "5", row: 0, segments: 1, status: 0 },
    { name: "6", row: 0, segments: 1, status: 0 },
    { name: "7", row: 0, segments: 1, status: 0 },
    { name: "8", row: 0, segments: 1, status: 0 },
    { name: "9", row: 0, segments: 1, status: 0 },
    { name: "0", row: 0, segments: 1, status: 0 },
    { name: "-", row: 0, segments: 1, status: 0 },
    { name: "=", row: 0, segments: 1, status: 0 },
    { name: "Backspace", row: 0, segments: 1, status: 0 }]
  const row1 = [
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
    { name: "\\", row: 1, segments: 1, status: 0 }]
  const row2 = [
    { name: "CapsLock", row: 2, segments: 3, status: 0 },
    { name: "a", row: 2, segments: 1, status: 0 },
    { name: "s", row: 2, segments: 1, status: 0 },
    { name: "d", row: 2, segments: 1, status: 0 },
    { name: "f", row: 2, segments: 1, status: 0 },
    { name: "g", row: 2, segments: 1, status: 0 },
    { name: "h", row: 2, segments: 1, status: 0 },
    { name: "j", row: 2, segments: 1, status: 0 },
    { name: "k", row: 2, segments: 1, status: 0 },
    { name: "l", row: 2, segments: 1, status: 0 },
    { name: ":", row: 2, segments: 1, status: 0 },
    { name: "'", row: 2, segments: 1, status: 0 },
    { name: "Enter", row: 2, segments: 2, status: 0 },
  ];
  const row3 = [
    { name: "Shift", row: 3, segments: 3, status: 0 },
    { name: "z", row: 3, segments: 1, status: 0 },
    { name: "x", row: 3, segments: 1, status: 0 },
    { name: "c", row: 3, segments: 1, status: 0 },
    { name: "v", row: 3, segments: 1, status: 0 },
    { name: "b", row: 3, segments: 1, status: 0 },
    { name: "n", row: 3, segments: 1, status: 0 },
    { name: "m", row: 3, segments: 1, status: 0 },
    { name: ",", row: 3, segments: 1, status: 0 },
    { name: ".", row: 3, segments: 1, status: 0 },
    { name: "/", row: 3, segments: 1, status: 0 },
    { name: "Shift", row: 3, segments: 3, status: 0 },
  ];
  const row4 = [
    { name: "Function", row: 4, segments: 1, status: 0 },
    { name: "Control", row: 4, segments: 1, status: 0 },
    { name: "Alt", row: 4, segments: 1, status: 0 },
    { name: "Meta", row: 4, segments: 1.5, status: 0 },
    { name: " ", row: 4, segments: 5, status: 0 },
    { name: "Meta", row: 4, segments: 1.5, status: 0 },
    { name: "Alt", row: 4, segments: 1, status: 0 },
    { name: "ArrowLeft", row: 4, segments: 1, status: 0 },
    { name: "ArrowUp", row: 4, segments: 1, status: 0 },
    { name: "ArrowDown", row: 4, segments: 1, status: 0 },
    { name: "ArrowRight", row: 4, segments: 1, status: 0 },
  ]

});
