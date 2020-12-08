const BASE_URL = "http://localhost:3000";
const PLAYERS_URL = `${BASE_URL}/players`;
const GAMES_URL = `${BASE_URL}/games`;
const interface = document.getElementById("interface");
const leaderboard = document.getElementById("leaderboard");
const browser = navigator.appName;
const platform = navigator.platform;
const w = window.innerWidth;
const h = window.innerHeight;
let speed = 0.9;
let lives = 3;
let canvas = document.getElementById("myCanvas");
let keySegments = 15;
const factor = 5 / keySegments;
canvas.width = w;
canvas.height = factor * w;
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = speed;
let dy = -1 * dx;
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
const row0 = [
  {
    name: "`",
    code: "Backquote",
    row: 0,
    segments: 1,
    status: 0,
    position: 0,
  },
  { name: "1", code: "Digit1", row: 0, segments: 1, status: 0, position: 1 },
  { name: "2", code: "Digit2", row: 0, segments: 1, status: 0, position: 2 },
  { name: "3", code: "Digit3", row: 0, segments: 1, status: 0, position: 3 },
  { name: "4", code: "Digit4", row: 0, segments: 1, status: 0, position: 4 },
  { name: "5", code: "Digit5", row: 0, segments: 1, status: 0, position: 5 },
  { name: "6", code: "Digit6", row: 0, segments: 1, status: 0, position: 6 },
  { name: "7", code: "Digit7", row: 0, segments: 1, status: 0, position: 7 },
  { name: "8", code: "Digit8", row: 0, segments: 1, status: 0, position: 8 },
  { name: "9", code: "Digit9", row: 0, segments: 1, status: 0, position: 9 },
  { name: "0", code: "Digit0", row: 0, segments: 1, status: 0, position: 10 },
  { name: "-", code: "Minus", row: 0, segments: 1, status: 0, position: 11 },
  { name: "=", code: "Equal", row: 0, segments: 1, status: 0, position: 12 },
  {
    name: "Backspace",
    code: "Backspace",
    row: 0,
    segments: 2,
    status: 0,
    position: 13,
  },
];
const row1 = [
  { name: "Tab", code: "Tab", row: 1, segments: 2, status: 0, position: 0 },
  { name: "q", code: "KeyQ", row: 1, segments: 1, status: 0, position: 2 },
  { name: "w", code: "KeyW", row: 1, segments: 1, status: 0, position: 3 },
  { name: "e", code: "KeyE", row: 1, segments: 1, status: 0, position: 4 },
  { name: "r", code: "KeyR", row: 1, segments: 1, status: 0, position: 5 },
  { name: "t", code: "KeyT", row: 1, segments: 1, status: 0, position: 6 },
  { name: "y", code: "KeyY", row: 1, segments: 1, status: 0, position: 7 },
  { name: "u", code: "KeyU", row: 1, segments: 1, status: 0, position: 8 },
  { name: "i", code: "KeyI", row: 1, segments: 1, status: 0, position: 9 },
  { name: "o", code: "KeyO", row: 1, segments: 1, status: 0, position: 10 },
  { name: "p", code: "KeyP", row: 1, segments: 1, status: 0, position: 11 },
  {
    name: "[",
    code: "BracketLeft",
    row: 1,
    segments: 1,
    status: 0,
    position: 12,
  },
  {
    name: "]",
    code: "BracketRight",
    row: 1,
    segments: 1,
    status: 0,
    position: 13,
  },
  {
    name: "\\",
    code: "Backslash",
    row: 1,
    segments: 1,
    status: 0,
    position: 14,
  },
];
const row2 = [
  {
    name: "CapsLock",
    code: "CapsLock",
    row: 2,
    segments: 2,
    status: 0,
    position: 0,
  },
  { name: "a", code: "KeyA", row: 2, segments: 1, status: 0, position: 2 },
  { name: "s", code: "KeyS", row: 2, segments: 1, status: 0, position: 3 },
  { name: "d", code: "KeyD", row: 2, segments: 1, status: 0, position: 4 },
  { name: "f", code: "KeyF", row: 2, segments: 1, status: 0, position: 5 },
  { name: "g", code: "KeyG", row: 2, segments: 1, status: 0, position: 6 },
  { name: "h", code: "KeyH", row: 2, segments: 1, status: 0, position: 7 },
  { name: "j", code: "KeyJ", row: 2, segments: 1, status: 0, position: 8 },
  { name: "k", code: "KeyK", row: 2, segments: 1, status: 0, position: 9 },
  { name: "l", code: "KeyL", row: 2, segments: 1, status: 0, position: 10 },
  {
    name: ":",
    code: "Semicolon",
    row: 2,
    segments: 1,
    status: 0,
    position: 11,
  },
  { name: "'", code: "Quote", row: 2, segments: 1, status: 0, position: 12 },
  {
    name: "Enter",
    code: "Enter",
    row: 2,
    segments: 2,
    status: 0,
    position: 13,
  },
];
const row3 = [
  {
    name: "Shift",
    code: "ShiftLeft",
    row: 3,
    segments: 2.5,
    status: 0,
    position: 0,
  },
  { name: "z", code: "KeyZ", row: 3, segments: 1, status: 0, position: 2.5 },
  { name: "x", code: "KeyX", row: 3, segments: 1, status: 0, position: 3.5 },
  { name: "c", code: "KeyC", row: 3, segments: 1, status: 0, position: 4.5 },
  { name: "v", code: "KeyV", row: 3, segments: 1, status: 0, position: 5.5 },
  { name: "b", code: "KeyB", row: 3, segments: 1, status: 0, position: 6.5 },
  { name: "n", code: "KeyN", row: 3, segments: 1, status: 0, position: 7.5 },
  { name: "m", code: "KeyM", row: 3, segments: 1, status: 0, position: 8.5 },
  { name: ",", code: "Comma", row: 3, segments: 1, status: 0, position: 9.5 },
  {
    name: ".",
    code: "Period",
    row: 3,
    segments: 1,
    status: 0,
    position: 10.5,
  },
  {
    name: "/",
    code: "Slash",
    row: 3,
    segments: 1,
    status: 0,
    position: 11.5,
  },
  {
    name: "Shift",
    code: "ShiftRight",
    row: 3,
    segments: 2.5,
    status: 0,
    position: 12.5,
  },
];
const row4 = [
  { name: "Function", code: "", row: 4, segments: 1, status: 0, position: 0 },
  {
    name: "Control",
    code: "ControlLeft",
    row: 4,
    segments: 1,
    status: 0,
    position: 1,
  },
  {
    name: "Alt",
    code: "AltLeft",
    row: 4,
    segments: 1,
    status: 0,
    position: 2,
  },
  {
    name: "⌘",
    code: "MetaLeft",
    row: 4,
    segments: 1.5,
    status: 0,
    position: 3,
  },
  {
    name: "Space",
    code: "Space",
    row: 4,
    segments: 5,
    status: 0,
    position: 4.5,
  },
  {
    name: "⌘",
    code: "MetaRight",
    row: 4,
    segments: 1.5,
    status: 0,
    position: 9.5,
  },
  {
    name: "Alt",
    code: "AltRight",
    row: 4,
    segments: 1,
    status: 0,
    position: 11,
  },
  {
    name: "←",
    code: "ArrowLeft",
    row: 4,
    segments: 1,
    status: 0,
    position: 12,
  },
  {
    name: "↑",
    code: "ArrowUp",
    row: 4,
    segments: 1,
    status: 0,
    position: 13,
  },
  {
    name: "↓",
    code: "ArrowDown",
    row: 4,
    segments: 1,
    status: 0,
    position: 13,
  },
  {
    name: "→",
    code: "ArrowRight",
    row: 4,
    segments: 1,
    status: 0,
    position: 14,
  },
];

document.addEventListener("DOMContentLoaded", (event) => {
  function bringToFront(obj) {
    obj.style.zIndex = "1";
  }

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
    leaderboard.innerHTML = "";
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
    activateKeyListeners();
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
    //alert(`endGame called, CURRENT_GAME = ${CURRENT_GAME}, CURRENT_PLAYER = ${CURRENT_PLAYER}`)
    // console.log(
    //   `endGame called, CURRENT_GAME = ${CURRENT_GAME}, CURRENT_PLAYER = ${CURRENT_PLAYER}`
    // );
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
    //alert(`savePlayer:name = ${name}`)
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
    //alert(`updateGame called: name = ${name}`)
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
      //.then(getLeaderboard())
      .catch((errors) => console.log(`updateGame: ${errors}`));
  }

  function getLeaderboard() {
    fetch("http://localhost:3000/games")
      .then((res) => res.json())
      .then((json) => {
        const objs = json;
        renderLeaderboard(objs);
      });
  }

  getLeaderboard();

  function renderLeaderboard(arr) {
    arr.sort((a, b) => (a.score < b.score ? 1 : -1));
    let h1 = document.createElement("h1");
    h1.innerText = "Top Ten Scores";
    let ol = document.createElement("ol");
    ol.setAttribute("padding-left", 30);
    ol.setAttribute("list-style-position", "inside");
    ol.setAttribute("margin-left", "20px");
    for (let i = 0; i < 10; i++) {
      let li = document.createElement("li");
      li.setAttribute("display", "list-item");
      li.setAttribute("list-style-position", "inside");
      let element = arr[i];
      let s = element["score"];
      let p = element["player"]["name"];
      li.innerText = `${p}......${s} points`;
      ol.append(li);
    }
    leaderboard.append(h1);
    leaderboard.append(ol);
    const btnStart = document.createElement("button");
    btnStart.setAttribute("id", "btn-start");
    btnStart.innerHTML = "Start Game";
    btnStart.addEventListener("click", () => createPlayer());
    leaderboard.append(btnStart);
    bringToFront(leaderboard);
  }

  function renderForm() {
    //deactivateKeyListeners();
    console.log("renderForm called");
    const playername = document.createElement("input");
    playername.setAttribute("name", "playername");
    playername.placeholder = "enter name";
    playername.focus();

    const btnSave = document.createElement("button");
    btnSave.innerText = "Save Game";
    btnSave.addEventListener("click", () => savePlayer(playername.value));

    const form = document.getElementById("form");
    form.append(playername);
    form.append(btnSave);
    bringToFront(form);
  }

  function activateKeyListeners() {
    document.body.addEventListener("keydown", (ev) => captureKeyDown(ev));
    document.body.addEventListener("keyup", (ev) => captureKeyUp(ev));
  }

  function captureKeyDown(ev) {
    //ev.preventDefault();
    let keyPressed = ev.code;
    let keyObj = KEY_ARRAY.find(({ code }) => code === keyPressed);
    keyObj.s = 1;
    return false;
  }

  function captureKeyUp(ev) {
    //ev.preventDefault();
    let keyReleased = ev.code;
    let keyObj = KEY_ARRAY.find(({ code }) => code === keyReleased);
    keyObj.s = 0;
    return false;
  }

  function deactivateKeyListeners() {
    document.body.removeEventListener("keydown", captureKeyDown);
    document.body.removeEventListener("keyup", captureKeyUp);
  }

  function collisionDetection(KEY_ARRAY) {
    for (let i = 0; i < KEY_ARRAY.length; i++) {
      let b = KEY_ARRAY[i];
      if (b.s == 1) {
        if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + keyHeight) {
          dy = -dy;
          score++;
          releaseAllKeys(KEY_ARRAY);
          speed = speed + 0.1;
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

  KEY_ARRAY = [];

  hotkeys("ctrl+a,ctrl+b,r,f", function (event, handler) {
    switch (handler.key) {
      case "ctrl+a":
        alert("you pressed ctrl+a!");
        break;
      case "ctrl+b":
        alert("you pressed ctrl+b!");
        break;
      case "r":
        alert("you pressed r!");
        break;
      case "f":
        alert("you pressed f!");
        break;
      default:
        alert(event);
    }
  });

  function initKeys(keys) {
    //console.log(`keys.length = ${keys.length}`)
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i].name;
      let c = keys[i].code;
      //console.log(`Drawing = ${k}`)
      let w = Math.round(keys[i].segments * keyWidth);
      let h = keyHeight;
      let x = keys[i].position * keyWidth;
      let y = keys[i].row * keyHeight;
      let s = keys[i].status;
      KEY_ARRAY.push({ name: k, code: c, x: x, y: y, w: w, h: h, s: s });
    }
    //console.dir(KEY_ARRAY);
  }

  function drawKeys(array) {
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
      drawKeyOutline(key.name, key.code, key.x, key.y, key.w, key.h);
      if (key.s == 1) {
        drawKey(key.name, key.code, key.x, key.y, key.w, key.h);
      }
    }
  }

  function drawOutlines(array) {
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
      drawKeyOutline(key.name, key.code, key.x, key.y, key.w, key.h);
    }
  }

  function drawKeyOutline(name, code, keyX, keyY, keyWidth, keyHeight) {
    //console.log(`Drawing = ${name}`);
    ctx.beginPath();
    ctx.rect(keyX, keyY, keyWidth, keyHeight);
    ctx.stroke();
    ctx.closePath();
    ctx.id = code;
    ctx.strokeStyle = "#d9d9d9";
    //ctx.font = "16px Arial";
    //ctx.fillStyle = "red";
    //ctx.fillText(name, keyX + keyWidth / 2, keyY + keyHeight / 2);
  }

  function drawKey(name, code, keyX, keyY, keyWidth, keyHeight) {
    //console.log(`Drawing = ${name}`)
    ctx.beginPath();
    ctx.rect(keyX, keyY, keyWidth, keyHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.id = code;
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(name, keyX + keyWidth / 2, keyY + keyHeight / 2);
  }

  function releaseAllKeys(array) {
    for (key of array) {
      key.s = 0;
    }
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
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = "#0000FF"
    drawKeys(KEY_ARRAY);
    drawBall();
    drawScore();
    drawLives();
    collisionDetection(KEY_ARRAY);

    if (lives < 1) {
      fail();
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      fail();
    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      fail();
    }

    x += dx;
    y += dy;

    function fail() {
      lives--;
      if (!lives) {
        console.log("GAME OVER");
        endGame()
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = speed;
        dy = -1 * speed;
      }
    }
  }

  function renderGameboard() {
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    console.log(`ctx.width = ${ctx.width}`);
    console.log(`window.innerWidth = ${window.innerWidth}`);
    initKeys(row0);
    initKeys(row1);
    initKeys(row2);
    initKeys(row3);
    initKeys(row4);
    drawOutlines(KEY_ARRAY);
  }

  renderGameboard();
});
