const BASE_URL = "http://localhost:3000";
const PLAYERS_URL = `${BASE_URL}/players`;
const GAMES_URL = `${BASE_URL}/games`;
const interface = document.getElementById("interface");
const leaderboard = document.getElementById("leaderboard");
const form = document.getElementById("form");
const browser = navigator.appName;
const platform = navigator.platform;
const w = window.innerWidth;
const h = window.innerHeight;
const colorLight = "#dfdfdf"
let colorKeyUpStroke = colorLight;
let colorKeyUpFill = "#ffffff";
let colorKeyFontUp = colorLight;
const colorKeyDownStroke = "#000000";
const colorKeyDownFill = "#000000";
const colorKeyFontDown = "#ffffff";
const colorBallFill = "#000000"; //red
const colorBallStroke = "#000000"; //green
const strokeThickness = 1
const typeFont = "16pt Courier New";
let speed = 0.3;
// let speed = 3;
// let speed = 0.1;
let lives = 3;
const playButtonDiv = document.getElementById("playButtonDiv");
const livesText = document.getElementById("livesText");
const scoreText = document.getElementById("scoreText");
const scoreIncrement = 1000;
let canvas = document.getElementById("myCanvas");
let keySegments = 15;
const factor = 5 / keySegments;
canvas.width = w;
canvas.height = factor * w;
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height /2;
let dx = speed;
let dy = -1 * dx;
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
let directionV = "north";
let directionH = "east";
const context = new AudioContext();
let gameOn = false;
const vol = 0.02

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
  // Audio
  // Play oscillators at certain frequency and for a certain time
  function playNote(frequency, startTime, duration, waveType) {
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const volume = context.createGain();

    // Set oscillator wave type
    osc1.type = waveType;
    osc2.type = waveType;

    volume.gain.value = vol;

    // Set up node routing
    osc1.connect(volume);
    osc2.connect(volume);
    volume.connect(context.destination);

    // Detune oscillators for chorus effect
    osc1.frequency.value = frequency + 1;
    osc2.frequency.value = frequency - 2;

    // Fade out
    volume.gain.setValueAtTime(vol, startTime + duration - 0.05);
    volume.gain.linearRampToValueAtTime(0, startTime + duration);

    // Start oscillators
    osc1.start(startTime);
    osc2.start(startTime);

    // Stop oscillators
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  function soundScore() {
    // Play a 'B4' now that lasts for 0.116 seconds
    playNote(493.883, context.currentTime, 0.116, "square");

    // Play an 'E5' just as the previous note finishes, that lasts for 0.232 seconds
    playNote(659.255, context.currentTime + 0.116, 0.232, "square");
  }

  function soundGameStart() {
    // Play a 'G4' now that lasts for 0.116 seconds
    playNote(391.995, context.currentTime, 0.116, "square");

    // Play a 'G4' now that lasts for 0.116 seconds
    playNote(391.995, context.currentTime + 0.116, 0.116, "square");

    // Play an 'C5' just as the previous note finishes, that lasts for 0.232 seconds
    playNote(523.251, context.currentTime + 0.232, 0.232, "square");
  }

  function soundGameOver() {
    // Play a 'A Flat/G#' now that lasts for 0.116 seconds
    playNote(207.652, context.currentTime, 0.116, "square");

    // Play a 'F3' now that lasts for 0.116 seconds
    playNote(174.614, context.currentTime + 0.116, 0.116, "square");

    // Play an 'D3' just as the previous note finishes, that lasts for 0.232 seconds
    playNote(146.832, context.currentTime + 0.232, 0.232, "square");
  }

  function soundPress() {
    // Play a 'B2' now that lasts for 0.116 seconds
    playNote(123.471, context.currentTime, 0.116, "square");
  }

  function soundNext() {
    // Play a 'f3' now that lasts for 0.116 seconds
    playNote(174.614, context.currentTime, 0.116, "square");

    // Play a 'g3' now that lasts for 0.116 seconds
    playNote(195.998, context.currentTime + 0.116, 0.116, "square");

    // Play an 'a3' just as the previous note finishes, that lasts for 0.232 seconds
    playNote(220.0, context.currentTime + 0.232, 0.232, "square");
  }

  function soundDie() {
    // Play a 'e2' now that lasts for 0.116 seconds
    playNote(82.407, context.currentTime, 0.116, "square");

    // Play a 'd#' now that lasts for 0.116 seconds
    playNote(77.782, context.currentTime + 0.116, 0.116, "square");

    // Play an 'c#' just as the previous note finishes, that lasts for 0.232 seconds
    playNote(69.296, context.currentTime + 0.232, 0.232, "square");
  }

  // ------------------------------------------------

  function toggleDirectionV() {
    // console.log("toggleDirectionV()");
    switch (directionV) {
      case "north":
        directionV = "south";
        break;
      case "south":
        directionV = "north";
        break;
      default:
        return null;
    }
  }

  function toggleView(x) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function toggleColor() {
    if (gameOn === true) {
      colorKeyUpStroke = "#000000";
      colorKeyUpFill = "#ffffff";
      colorKeyFontUp = "#000000";
    }else if(gameOn === false) {
      colorKeyUpStroke = colorLight;
      colorKeyUpFill = "#ffffff";
      colorKeyFontUp = colorLight;
    }
  }

  function toggleDirectionH() {
    // console.log("toggleDirectionH()");
    switch (directionH) {
      case "east":
        directionH = "west";
        break;
      case "west":
        directionH = "east";
        break;
      default:
        return null;
    }
  }

  function bringToFront1(obj) {
    // console.log("bringToFront1()");
    obj.style.zIndex = "1";
  }

  function bringToFront2(obj) {
    // console.log("bringToFront2()");
    obj.style.zIndex = "2";
  }

  function sendToBack(obj) {
    console.log("sendToBack()");
    obj.style.zIndex = "-10";
  }

  function setCurrentPlayer(obj) {
    // console.log(`2. setCurrentPlayer(): obj = ${obj}`);
    // console.log(obj);
    CURRENT_PLAYER = obj.id;
    // console.log(`2. setCurrentPlayer(): obj.id = ${obj.id}`);
    createGame(CURRENT_PLAYER);
  }

  function setCurrentGame(obj) {
    // console.log(`4. setCurrentGame(): obj = ${obj}`);
    // console.log(obj);
    CURRENT_GAME = obj.id;
    // console.log(`4. setCurrentGame(): obj.id = ${obj.id}`);
    startGame();
  }

  function createPlayer() {
    // console.log(`1. createPlayer()`);
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

  function skip() {
    document.location.reload();
    // soundNext()
  }

  const playButton = document.getElementById("playButton");
  playButton.addEventListener("click", () => createPlayer());

  let nameField = document.getElementById("nameField");
  nameField.placeholder = "Enter your name";

  const skipButton = document.getElementById("skipButton");
  skipButton.addEventListener("click", () => skip());

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () => savePlayer(nameField.value));

  function createGame(id) {
    // console.log(`3. createGame()`);
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
      .catch((errors) => console.log(`createGame Failed: ${errors}`));
  }

  function startGame() {
    // console.log(`5. startGame()`);
    gameOn = true;
    toggleColor();
    soundGameStart();
    toggleView(playButtonDiv);
    activateKeyListeners();
    initKeys(row0);
    initKeys(row1);
    initKeys(row2);
    initKeys(row3);
    initKeys(row4);
    interval = setInterval(draw, 10);
    // draw();
    // console.log(`directionV = `, directionV);
    // console.log(`directionH = `, directionH);
  }

  function endGame() {
    console.log("endGame()");
    gameOn = false;
    toggleColor();
    soundGameOver();
    clearInterval(interval);
    interval = "";
    console.log(
      `endGame: CURRENT_GAME = ${CURRENT_GAME}, CURRENT_PLAYER = ${CURRENT_PLAYER}`
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
      .then(saveModal.toggle())
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
      //.then((obj) => console.log(obj))
      .then(updateGame(name))
      .catch((errors) => console.log(`savePlayer: ${errors}`));
  }

  function updateGame(name) {
    console.log(`updateGame(): name = ${name}`);
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
      .then((obj) => getPersonalLeaderboard(obj.player_id))
      .catch((errors) => console.log(`updateGame: ${errors}`));
  }

  function getLeaderboard() {
    // console.log("getLeaderboard()");
    fetch("http://localhost:3000/games")
      .then((res) => res.json())
      .then((json) => {
        const objs = json;
        renderLeaderboard(objs);
      });
  }

  getLeaderboard();

  function getPersonalLeaderboard(id) {
    console.log("getPersonalLeaderboard()");
    saveModal.toggle();
    form.innerHTML = "";
    fetch("http://localhost:3000/games")
      .then((res) => res.json())
      .then((json) => {
        const objs = json;
        renderPersonalLeaderboard(objs, id);
      });
  }

  function getMax(arr, max) {
    // console.log("getMax()");
    if (arr.length < max) {
      return arr.length;
    } else {
      return max;
    }
  }

  function renderLeaderboard(arr) {
    // console.log("renderLeaderboard()");
    let h1 = document.createElement("h1");
    h1.innerText = "Top Ten Scores";
    arr.sort((a, b) => (a.score < b.score ? 1 : -1));
    let ol = document.createElement("ol");
    for (let i = 0; i < getMax(arr, 10); i++) {
      let li = document.createElement("li");
      let element = arr[i];
      if (arr.length > 0) {
        let s = element["score"];
        let p = element["player"]["name"];
        // li.innerText = `${p}......${s} points`;
        li.innerText = `${s} points......${p}`;
      }
      ol.append(li);
    }
    leaderboard.append(h1);
    leaderboard.append(ol);

    bringToFront1(leaderboard);
    bringToFront2(playButtonDiv);
  }

  function renderPersonalLeaderboard(arr, id) {
    console.log("renderPersonalLeaderboard()");
    //console.log(`arr = ${arr}`)
    //console.log(`id = ${id}`)
    let filteredList = arr.filter((element) => element["player_id"] == id);
    console.log(`filteredList = ${filteredList}`);
    let h1 = document.createElement("h1");
    h1.innerText = "Your Top 3 Scores";
    filteredList.sort((a, b) => (a.score < b.score ? 1 : -1));
    let ol = document.createElement("ol");
    console.log(`filteredList = ${filteredList}`);
    for (let i = 0; i < getMax(filteredList, 3); i++) {
      let li = document.createElement("li");
      console.log(`filteredList[i] = ${filteredList[i]}`);
      let element = filteredList[i];
      console.log(`element = ${element}`);
      if (filteredList.length > 0) {
        let s = element["score"];
        let p = element["player"]["name"];
        // li.innerText = `${p}......${s} points`;
        li.innerText = `${s} points......${p}`;
      }
      ol.append(li);
    }
    leaderboard.append(h1);
    leaderboard.append(ol);
    const btnOK = document.createElement("button");
    btnOK.setAttribute("id", "btn-ok");
    btnOK.innerHTML = "Okay";
    btnOK.addEventListener("click", () => document.location.reload());
    leaderboard.append(btnOK);
    bringToFront1(leaderboard);
    bringToFront2(playButtonDiv);
  }

  function activateKeyListeners() {
    // console.log("activateKeyListeners()");
    document.body.addEventListener("keydown", (ev) => captureKeyDown(ev));
    document.body.addEventListener("keyup", (ev) => captureKeyUp(ev));
  }

  // GAMEPLAY

  function captureKeyDown(ev) {
    // console.log("captureKeyDown()");
    //ev.preventDefault();
    let keyPressed = ev.code;
    let keyObj = KEY_ARRAY.find(({ code }) => code === keyPressed);
    keyObj.s = 1;
    // soundPress();
    return false;
  }

  function captureKeyUp(ev) {
    // console.log("captureKeyUp()");
    //ev.preventDefault();
    let keyReleased = ev.code;
    let keyObj = KEY_ARRAY.find(({ code }) => code === keyReleased);
    keyObj.s = 0;
    return false;
  }

  function deactivateKeyListeners() {
    console.log("deactivateKeyListeners()");
    document.body.removeEventListener("keydown", captureKeyDown);
    document.body.removeEventListener("keyup", captureKeyUp);
  }

  function collisionDetection(KEY_ARRAY) {
    // console.log("CollisionDetection()");
    for (let i = 0; i < KEY_ARRAY.length; i++) {
      let b = KEY_ARRAY[i];
      if (b.s == 1) {
        if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h) {
          let myHash = {};
          myHash[Math.round(Math.abs(x - (b.x - ballRadius)))] = "leftEdge";
          myHash[Math.round(Math.abs(x - (b.x + b.w + ballRadius)))] =
            "rightEdge";
          myHash[Math.round(Math.abs(y - (b.y - ballRadius)))] = "topEdge";
          myHash[Math.round(Math.abs(y - (b.y + b.h + ballRadius)))] =
            "bottomEdge";
          // console.log(`myHash = `, myHash)
          myArrayOfKeys = Object.keys(myHash);
          let min = Math.min.apply(Math, myArrayOfKeys);
          console.log(
            `directionH = `,
            directionH,
            `| directionV = `,
            directionV,
            `| myHash[min] = `,
            myHash[min]
          );
          if (
            (myHash[min] === "topEdge" && directionV === "south") ||
            (myHash[min] === "bottomEdge" && directionV === "north")
          ) {
            dy = -dy;
            toggleDirectionV();
            releaseAllKeys(KEY_ARRAY);
            soundScore();
            score = score + scoreIncrement;
            dx = dx * 1.3;
          }
          if (
            (myHash[min] === "leftEdge" && directionH === "east") ||
            (myHash[min] === "rightEdge" && directionH === "west")
          ) {
            dx = -dx;
            toggleDirectionH();
            releaseAllKeys(KEY_ARRAY);
            soundScore();
            score = score + scoreIncrement;
            dx = dx * 1.3;
          }
          releaseAllKeys(KEY_ARRAY);
        }
      }
    }
  }

  function drawBall() {
    // console.log("drawBall()");
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = colorBallFill;
    ctx.fill();
    ctx.closePath();
    ctx.strokeStyle = colorBallStroke;
    ctx.stroke();
    ctx.closePath();
  }

  KEY_ARRAY = [];

  //Exceptions: function,command+spacebar, command+tab

  hotkeys(
    "command+`,command+1,command+2,command+3,command+4,command+5,command+6,command+7,command+8,command+9,command+0,command+-,command+=,command+delete,command+tab,command+q,command+w,command+e,command+r,command+t,command+y,command+u,command+i,command+o,command+p,command+[,command+],command+\\,command+capslock,command+a,command+s,command+d,command+f,command+g,command+h,command+j,command+k,command+l,command+;,command+',command+enter,command+shift,command+z,command+x,command+c,command+v,command+b,command+n,command+m,command+,,command+.,command+/,command+crtl,command+option,command+left,command+right,command+up,command+down,ctrl+`,ctrl+1,ctrl+2,ctrl+3,ctrl+4,ctrl+5,ctrl+6,ctrl+7,ctrl+8,ctrl+9,ctrl+0,ctrl+-,ctrl+=,ctrl+delete,ctrl+tab,ctrl+q,ctrl+w,ctrl+e,ctrl+r,ctrl+t,ctrl+y,ctrl+u,ctrl+i,ctrl+o,ctrl+p,ctrl+[,ctrl+],ctrl+\\,ctrl+capslock,ctrl+a,ctrl+s,ctrl+d,ctrl+f,ctrl+g,ctrl+h,ctrl+j,ctrl+k,ctrl+l,ctrl+;,ctrl+',ctrl+enter,ctrl+shift,ctrl+z,ctrl+x,ctrl+c,ctrl+v,ctrl+b,ctrl+n,ctrl+m,ctrl+,,ctrl+.,ctrl+/,ctrl+crtl,ctrl+option,ctrl+left,ctrl+right,ctrl+up,ctrl+down,option+`,option+1,option+2,option+3,option+4,option+5,option+6,option+7,option+8,option+9,option+0,option+-,option+=,option+delete,option+tab,option+q,option+w,option+e,option+r,option+t,option+y,option+u,option+i,option+o,option+p,option+[,option+],option+\\,option+capslock,option+a,option+s,option+d,option+f,option+g,option+h,option+j,option+k,option+l,option+;,option+',option+enter,option+shift,option+z,option+x,option+c,option+v,option+b,option+n,option+m,option+,,option+.,option+/,option+crtl,option+option,option+left,option+right,option+up,option+down",
    function () {
      //alert('stopped it!');
      releaseAllKeys(KEY_ARRAY);
      //return false;
    }
  );

  //Trying out with the event handler and returning false
  // hotkeys('option+\\,command+left,command+=,command+-,command+9,command+8,command+5,command+4,command+3,command+2,command+tab,command+q,command+w,command+e,command+r,command+t,command+y,command+u,command+i,command+o,command+p,command+[,command+],command+\\,command+a,command+s,command+d,command+f,command+g,command+h,command+j,command+k,command+l,command+;,command+\',command+enter,command+z,command+x,command+c,command+v,command+b,command+n,command+m,command+,,command+.,command+/,command+', function(event,handler) {
  //   //alert('stopped it!');
  //   event.preventDefault()
  //   releaseAllKeys(KEY_ARRAY)
  //   //return false;
  // });

  function initKeys(keys) {
    // console.log("initKeys()");
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

  function drawKeysDown(array) {
    // console.log("drawKeysDown()");
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
      // drawSingleKeyUp(key.name, key.code, key.x, key.y, key.w, key.h);
      if (key.s == 1) {
        drawSingleKeyDown(key.name, key.code, key.x, key.y, key.w, key.h);
      }
    }
  }

  function drawKeysUp(array) {
    // console.log("drawKeysUp()");
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
      drawSingleKeyUp(key.name, key.code, key.x, key.y, key.w, key.h);
    }
  }

  function drawSingleKeyUp(name, code, keyX, keyY, keyWidth, keyHeight) {
    // console.log("drawSingleKeyUp()");
    //console.log(`Drawing = ${name}`);
    ctx.beginPath();
    ctx.rect(keyX, keyY, keyWidth, keyHeight);
    ctx.strokeStyle = colorKeyUpStroke;
    ctx.lineWidth = strokeThickness;
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = colorKeyUpFill;
    ctx.fill();
    ctx.closePath();
    ctx.id = code;
    // BELOW DOESN'T APPEAR TO DO ANYTHING
    //ctx.strokeStyle = "blue";
    ctx.font = typeFont;
    ctx.fillStyle = colorKeyFontUp;
    let capName = name.toUpperCase();
    ctx.textAlign = "center";
    ctx.fillText(capName, keyX + keyWidth / 2, keyY + keyHeight / 2 + 4);
  }

  function drawSingleKeyDown(name, code, keyX, keyY, keyWidth, keyHeight) {
    // console.log("drawSingleKeyDown()");
    //console.log(`Drawing = ${name}`)
    ctx.beginPath();
    ctx.rect(keyX, keyY, keyWidth, keyHeight);
    ctx.strokeStyle = colorKeyDownStroke;
    ctx.lineWidth = strokeThickness;
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = colorKeyDownFill;
    ctx.fill();
    ctx.closePath();
    ctx.id = code;
    ctx.font = typeFont;
    ctx.fillStyle = colorKeyFontDown;
    let capName = name.toUpperCase();
    ctx.textAlign = "center";
    ctx.fillText(capName, keyX + keyWidth / 2, keyY + keyHeight / 2 + 4);
  }

  function releaseAllKeys(array) {
    // console.log("releaseAllKeys()");
    for (key of array) {
      key.s = 0;
    }
  }

  function drawScore() {
    // console.log("drawScore()");
    scoreText.innerText = "Score: " + score;
  }

  function drawLives() {
    livesText.innerText = "Lives: " + lives;
    // console.log("drawLives()");
  }

  let myReq;

  function draw() {
    // console.log("draw()");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = strokeThickness;
    ctx.strokeStyle = colorKeyUpStroke;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    drawKeysUp(KEY_ARRAY);
    drawKeysDown(KEY_ARRAY);
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
    //dx = speed
    // x += dx;
    // y += dy;
    // console.log(`dx = ${dx}, speed = ${speed}`);
    // requestAnimationFrame(draw);
  }

  function fail() {
    console.log("fail()")
    lives--;
    soundDie();
    if (!lives) {
      console.log("GAME OVER");
      endGame();
    } else {
      console.log("LIFE LOST");
      initNextPlay()
    }
  }

  function initNextPlay(){
    console.log("initNextPlay()")
    x = canvas.width / 2;
    y = canvas.height /2;
    ranNumX = Math.ceil(Math.random() * 1) * (Math.round(Math.random()) ? 1 : -1)
    ranNumY = Math.ceil(Math.random() * 1) * (Math.round(Math.random()) ? 1 : -1)
    console.log(`ranNumX = `, ranNumX)
    console.log(`ranNumY = `, ranNumY)
    switch (ranNumX) {
      case 1:
        directionH = "east";
        break;
      case -1:
        directionH = "west";
        break;
      default:
        return null;
    }
    switch (ranNumY) {
      case 1:
        directionV = "south";
        break;
      case -1:
        directionV = "north";
        break;
      default:
        return null;
    }
    dx = speed * ranNumX;
    dy = speed * ranNumY;
  }

  function renderGameboard() {
    console.log(`renderGameboard()`);
    soundNext();
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    console.log(`ctx.width = ${ctx.width}`);
    console.log(`window.innerWidth = ${window.innerWidth}`);
    initKeys(row0);
    initKeys(row1);
    initKeys(row2);
    initKeys(row3);
    initKeys(row4);
    drawKeysUp(KEY_ARRAY);
  }

  // var registerAccountButton = document.getElementById("registerAccountButton");
  var saveModal = new bootstrap.Modal(document.getElementById("saveModal"), {
    keyboard: false,
  });
  // registerAccountButton.addEventListener("click", function () {
  //   saveModal.toggle();
  // });

  renderGameboard();
});
