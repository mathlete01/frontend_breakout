const BASE_URL = "http://localhost:3000";
const PLAYERS_URL = `${BASE_URL}/players`;
const GAMES_URL = `${BASE_URL}/games`;

document.addEventListener("DOMContentLoaded", (event) => {
  function setCurrentPlayer(obj) {
    CURRENT_PLAYER = obj.id;
  }

  function createPlayer() {
    draw();
    let formDataCreate = {
      score: 0,
      lives: 3,
    };

    let configObjCreate = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formDataCreate),
    };

    fetch(PLAYERS_URL, configObjCreate)
      .then((res) => res.json())
      //.then(obj => console.log(obj))
      .then((data) => setCurrentPlayer(data))
      .catch((errors) => alert(errors));
  }

  function savePlayer(name) {
    console.log(`savePlayer:name = ${name}`);
    //console.log(`CURRENT_PLAYER = ${CURRENT_PLAYER}`)
    // console.log(`event.target = ${event.target}`)
    // console.log(`event.target.playername = ${event.target.playername}`)
    // console.log(`event.target.playername.value = ${event.target.playername.value}`)
    let saveData = {
      id: CURRENT_PLAYER,
      name: name,
      score: 100,
      lives: 0,
    };

    let configObjSave = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(saveData),
    };

    fetch(PLAYERS_URL, configObjSave)
      .then((res) => res.json())
      //.then(obj => console.log(obj))
      .catch((errors) => alert(errors));
  }

  const w = window.innerWidth;
  const h = window.innerHeight;

  function renderInterface() {
    const browser = navigator.appName;
    const platform = navigator.platform;

    let width = document.getElementById("window-width");
    let height = document.getElementById("window-height");
    width.innerText += w;
    height.innerText += h;
    const btnStart = document.createElement("button");
    btnStart.setAttribute("id", "btn-start");
    btnStart.innerHTML = "Start Game";
    btnStart.addEventListener("click", () => createPlayer());

    const playername = document.createElement("input");
    playername.setAttribute("name", "playername");
    playername.placeholder = "enter name";

    const btnSave = document.createElement("button");
    btnSave.innerText = "Save Game";
    btnSave.addEventListener("click", () => savePlayer(playername.value));

    const interface = document.getElementById("interface");
    interface.append(btnStart);
    interface.append(playername);
    interface.append(btnSave);
  }

  renderInterface();

  document.body.addEventListener("keydown", function (ev) {
    let keyPressed = ev.key;
    console.log(`keyPressed = ${keyPressed}`);
    let keyObj = KEY_ARRAY.find(({ name }) => name === keyPressed);
    keyObj.s = 0;
    console.dir(keyObj);
    if (ev.key == "Right" || ev.key == "ArrowRight") {
      rightPressed = true;
    } else if (ev.key == "Left" || ev.key == "ArrowLeft") {
      leftPressed = true;
    }
    ev.preventDefault(); // cancels default actions
    return false; // cancels this function only
  });

  document.body.addEventListener("keyup", function (ev) {
    if (ev.key == "Right" || ev.key == "ArrowRight") {
      rightPressed = false;
    } else if (ev.key == "Left" || ev.key == "ArrowLeft") {
      leftPressed = false;
    }
    ev.preventDefault(); // cancels default actions
    return false; // cancels this function only
  });

  function collisionDetection() {
    for (let i = 0; i < KEY_ARRAY.length; i++) {
      let b = KEY_ARRAY[i];
      //if(b.status == 1) {
      if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + brickHeight) {
        dy = -dy;
        //b.status = 0;
        score++;
      }
    }
    //}
  }
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  KEY_ARRAY = [];

  function drawKeys(keys) {
    KEY_ARRAY = [];
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i].name;
      let w = keys[i].segments * brickWidth;
      let h = brickHeight;
      let x = w * i;
      let y = keys[i].row * brickHeight;
      let s = keys[i].status;
      KEY_ARRAY.push({ name: k, x: x, y: y, w: w, h: h, s: s });
      drawKey(k, x, y, w, h);
    }
  }

  function drawKey(key, brickX, brickY, brickWidth, brickHeight) {
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    ctx.id = key;
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(key, brickX + brickWidth / 2, brickY + brickHeight / 2);
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawKeys(keys);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

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
          //alert("GAME OVER");
          console.log("GAME OVER");
          document.location.reload();
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 2;
          dy = -2;
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

    requestAnimationFrame(draw);
  }

  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let ballRadius = 10;
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 2;
  let dy = -2;
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
  let topRow = 100
  let score = 0;
  let lives = 3;
  const keys = [
    { name: "Tab", row: 1, segments: 2, status: 1 },
    { name: "q", row: 1, segments: 1, status: 1 },
    { name: "w", row: 1, segments: 1, status: 1 },
    { name: "e", row: 1, segments: 1, status: 1 },
    { name: "r", row: 1, segments: 1, status: 1 },
    { name: "t", row: 1, segments: 1, status: 1 },
    { name: "y", row: 1, segments: 1, status: 1 },
    { name: "u", row: 1, segments: 1, status: 1 },
    { name: "i", row: 1, segments: 1, status: 1 },
    { name: "o", row: 1, segments: 1, status: 1 },
    { name: "p", row: 1, segments: 1, status: 1 },
    { name: "[", row: 1, segments: 1, status: 1 },
    { name: "]", row: 1, segments: 1, status: 1 },
    { name: "\\", row: 1, segments: 1, status: 1 },
    { name: "CapsLock", row: 2, segments: 3, status: 1 },
    { name: "Enter", row: 2, segments: 1, status: 1 },
  ];
});