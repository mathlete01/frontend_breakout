const BASE_URL = "http://localhost:3000";
const PLAYERS_URL = `${BASE_URL}/players`;
const GAMES_URL = `${BASE_URL}/games`;

document.addEventListener("DOMContentLoaded", (event) => {
  
  function setCurrentPlayer(obj) {
    console.log("setCurrentPlayer called")
    console.dir(obj)
    CURRENT_PLAYER = obj.id;
    console.log(`CURRENT_PLAYER = ${CURRENT_PLAYER}`)
    createGame(CURRENT_PLAYER)
  }

  function setCurrentGame(obj) {
    console.log("setCurrentGame called")
    console.log(`setCurrentGame: obj = ${obj}`)
    console.dir(obj)
    CURRENT_GAME = obj.id;
    console.log(`CURRENT_GAME = ${CURRENT_GAME}`)
  }

  function createPlayer() {
    
    // let formDataCreate = {
    //   score: 0,
    //   lives: 3,
    // };

    let configObjCreate = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
      // body: JSON.stringify(formDataCreate),
    };

    fetch(PLAYERS_URL, configObjCreate)
      .then((res) => res.json())
      //.then(obj => console.log(obj))
      
      .then((data) => setCurrentPlayer(data))
      //.then(obj => createGame(obj))
      //.then(draw())
      //.catch((errors) => alert(`createPlayer: ${errors}`));
      .catch((errors) => console.log(`createPlayer: ${errors}`));
  }

  function createGame(id) {
    console.log(`createGame id = ${id}`)
    let formData = {
      //score: score
      player_id: id
    };
    //document.location.reload()
    //window.cancelAnimationFrame(myReq)
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData),
    };

    fetch(GAMES_URL, configObj)
      .then((res) => res.json())
      //.then(obj => console.log(obj))
      //.then((data) => console.log(data))
      //.then(cancelAnimationFrame(myReq))
      //.then(document.location.reload())
      //.then(renderForm())
      .then(obj => setCurrentGame(obj))
      .then(draw())
      .catch((errors) => console.log(`createGame: ${errors}`));
      //.catch((errors) => console.log(errors));
  }

  function endGame() {
    console.log(`endGame called, CURRENT_GAME = ${CURRENT_GAME}`);
    //console.log(`CURRENT_GAME = ${CURRENT_GAME}`)
    // console.log(`event.target = ${event.target}`)
    // console.log(`event.target.playername = ${event.target.playername}`)
    // console.log(`event.target.playername.value = ${event.target.playername.value}`)
    let formData = {
      id: CURRENT_GAME,
      score: score,
    };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(PLAYERS_URL, configObj)
      .then((res) => res.json())
      //.then(obj => console.log(obj))
      .then(renderForm())
      .catch((errors) => alert(`endGame: ${errors}`));
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
        "Accept": "application/json",
      },
      body: JSON.stringify(saveData),
    };

    fetch(PLAYERS_URL, configObjSave)
      .then((res) => res.json())
      //.then(obj => console.log(obj))
      .catch((errors) => alert(`savePlayer: ${errors}`));
  }

  function renderForm() {
    console.log("renderForm called")
    //window.cancelAnimationFrame()
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  renderForm()

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
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.id = key;
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(key, brickX + brickWidth / 2, brickY + brickHeight / 2);
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

  let myReq

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
          //createGame();
          endGame()
          //document.location.reload();
          //renderForm()
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

    myReq = window.requestAnimationFrame(draw);
  }

  const w = window.innerWidth;
  const h = window.innerHeight;
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
    { name: "ArrowLeft", row: 4, segments: 1, status: 1 },
    { name: "ArrowRight", row: 4, segments: 1, status: 1 }
  ];
});
