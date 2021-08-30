// ----------------------Initialize Variables--------------------------

// function initVars() {
// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://evening-hollows-06706.herokuapp.com";
const PLAYERS_URL = `${BASE_URL}/players`;
const GAMES_URL = `${BASE_URL}/games`;
const leaderboard = document.getElementById("leaderboard");
const browser = navigator.appName;
const platform = navigator.platform;
const w = window.innerWidth;
const h = window.innerHeight;
const colorLight = "#dfdfdf";
const colorDark = "#808080";
const colorWhite = "#ffffff";
const colorBlack = "#000000";
let colorKeyUpStroke = colorLight;
let colorKeyUpFill = colorWhite;
let colorKeyFontUp = colorLight;
const colorKeyDownStroke = colorBlack;
const colorKeyDownFill = colorBlack;
const colorKeyFontDown = colorWhite;
const colorKeyGrayFill = colorDark;
const colorBallFill = colorBlack; //red
const colorBallStroke = colorBlack; //green
const strokeThickness = 1;
// const typeFont = "16pt Courier New";
const typeFont = window.innerWidth / 100 + "px Courier New";
// ----------------------FOR TESTING--------------------------
let speed = 0.3; //normal
// let speed = 1; // test super fast
//
let lives = 3; //normal
// let lives = 2; // test
// -----------------------------------------------------------
const livesText = document.getElementById("livesText");
const scoreText = document.getElementById("scoreText");
let scoreNote1 = 493.883;
let scoreNote2 = 659.255;
const scoreIncrement = 1000;
let canvas = document.getElementById("myCanvas");
let keySegments = 15;
const factor = 5 / keySegments;
canvas.width = w;
canvas.height = factor * w;
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
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
let directionV = "north";
let directionH = "east";
var AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let gameOn = false;
const vol = 0.05;

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

const preventDefaultKeys = {
  Tab: true,
  Enter: true,
};

KEY_ARRAY = [];
// }

// initVars();

//Exceptions: function,command+spacebar, command+tab

// hotkeys(
//   "command+`,command+1,command+2,command+3,command+4,command+5,command+6,command+7,command+8,command+9,command+0,command+-,command+=,command+delete,command+tab,command+q,command+w,command+e,command+r,command+t,command+y,command+u,command+i,command+o,command+p,command+[,command+],command+\\,command+capslock,command+a,command+s,command+d,command+f,command+g,command+h,command+j,command+k,command+l,command+;,command+',command+enter,command+shift,command+z,command+x,command+c,command+v,command+b,command+n,command+m,command+,,command+.,command+/,command+crtl,command+option,command+left,command+right,command+up,command+down,ctrl+`,ctrl+1,ctrl+2,ctrl+3,ctrl+4,ctrl+5,ctrl+6,ctrl+7,ctrl+8,ctrl+9,ctrl+0,ctrl+-,ctrl+=,ctrl+delete,ctrl+tab,ctrl+q,ctrl+w,ctrl+e,ctrl+r,ctrl+t,ctrl+y,ctrl+u,ctrl+i,ctrl+o,ctrl+p,ctrl+[,ctrl+],ctrl+\\,ctrl+capslock,ctrl+a,ctrl+s,ctrl+d,ctrl+f,ctrl+g,ctrl+h,ctrl+j,ctrl+k,ctrl+l,ctrl+;,ctrl+',ctrl+enter,ctrl+shift,ctrl+z,ctrl+x,ctrl+c,ctrl+v,ctrl+b,ctrl+n,ctrl+m,ctrl+,,ctrl+.,ctrl+/,ctrl+crtl,ctrl+option,ctrl+left,ctrl+right,ctrl+up,ctrl+down,option+`,option+1,option+2,option+3,option+4,option+5,option+6,option+7,option+8,option+9,option+0,option+-,option+=,option+delete,option+tab,option+q,option+w,option+e,option+r,option+t,option+y,option+u,option+i,option+o,option+p,option+[,option+],option+\\,option+capslock,option+a,option+s,option+d,option+f,option+g,option+h,option+j,option+k,option+l,option+;,option+',option+enter,option+shift,option+z,option+x,option+c,option+v,option+b,option+n,option+m,option+,,option+.,option+/,option+crtl,option+option,option+left,option+right,option+up,option+down",
//   function () {
//     //alert('stopped it!');
//     releaseAllKeys(KEY_ARRAY);
//     //return false;
//   }
// );

//Trying out with the event handler and returning false
// hotkeys('option+\\,command+left,command+=,command+-,command+9,command+8,command+5,command+4,command+3,command+2,command+tab,command+q,command+w,command+e,command+r,command+t,command+y,command+u,command+i,command+o,command+p,command+[,command+],command+\\,command+a,command+s,command+d,command+f,command+g,command+h,command+j,command+k,command+l,command+;,command+\',command+enter,command+z,command+x,command+c,command+v,command+b,command+n,command+m,command+,,command+.,command+/,command+', function(event,handler) {
//   //alert('stopped it!');
//   event.preventDefault()
//   releaseAllKeys(KEY_ARRAY)
//   //return false;
// });

document.addEventListener("DOMContentLoaded", (event) => {
  // ----------------------Get Elements--------------------------

  let nameField = document.getElementById("nameField");
  nameField.placeholder = "Enter your name";

  const skipButton = document.getElementById("skipButton");
  skipButton.addEventListener("click", () => skip());

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () =>
    savePlayer(nameField.value.toUpperCase())
  );

  const aboutNav = document.getElementById("aboutNav");
  aboutNav.addEventListener("click", () => aboutModal.toggle());

  const hireMeNav = document.getElementById("hireMeNav");
  hireMeNav.addEventListener("click", () => hireMeModal.toggle());

  const closeAboutButton = document.getElementById("closeAboutButton");
  closeAboutButton.addEventListener("click", () => aboutModal.toggle());

  const closeHireMeButton = document.getElementById("closeHireMeButton");
  closeHireMeButton.addEventListener("click", () => hireMeModal.toggle());

  const saveModal = new bootstrap.Modal(document.getElementById("saveModal"), {
    keyboard: false,
  });

  const aboutModal = new bootstrap.Modal(
    document.getElementById("aboutModal"),
    {
      keyboard: false,
    }
  );

  const hireMeModal = new bootstrap.Modal(
    document.getElementById("hireMeModal"),
    {
      keyboard: false,
    }
  );

  // ----------------------Sounds--------------------------

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
    playNote(scoreNote1, context.currentTime, 0.116, "square");

    // Play an 'E5' just as the previous note finishes, that lasts for 0.232 seconds
    playNote(scoreNote2, context.currentTime + 0.116, 0.232, "square");
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

  // ----------------------Toggles--------------------------

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

  // ----------------------Launch--------------------------

  function getLeaderboard() {
    // console.log("getLeaderboard()");
    fetch(GAMES_URL)
    then((res) => res.json())
    then((json) => {
        const objs = json;
        renderLeaderboard(objs);
      });
  }

  function renderGameboard() {
    // console.log(`renderGameboard()`);
    soundNext();
    ctx.width = window.innerWidth;
    // console.log(`ctx.width = `, ctx.width)
    ctx.height = window.innerHeight;
    initKeys(row0);
    initKeys(row1);
    initKeys(row2);
    initKeys(row3);
    initKeys(row4);
    drawKeysUp(KEY_ARRAY);
    drawScore();
    drawLives();
  }

  function initKeys(keys) {
    // console.log("initKeys()");
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
    ctx.font = typeFont;
    ctx.fillStyle = colorKeyFontUp;
    let capName = name.toUpperCase();
    ctx.textAlign = "center";
    ctx.fillText(capName, keyX + keyWidth / 2, keyY + keyHeight / 2 + 4);
  }

  function renderLeaderboard(arr) {
    // console.log("renderLeaderboard()");
    let filteredArr = arr.filter((element) => element.player.name !== null);
    let h1 = document.createElement("h1");
    h1.style = "font-size:3vw; text-center";
    h1.innerText = "Top Scores";
    filteredArr.sort((a, b) => (a.score < b.score ? 1 : -1));
    let ol = document.createElement("ol");
    for (let i = 0; i < getMax(filteredArr, 10); i++) {
      let li = document.createElement("li");
      li.style = "font-size:1.5vw;";
      let element = filteredArr[i];
      if (filteredArr.length > 0) {
        let s = element["score"];
        let p = element["player"]["name"];
        li.innerText = `${s} points......${p}`;
      }
      ol.append(li);
    }

    const btnPlay = document.createElement("button");
    btnPlay.setAttribute("id", "btn-play");
    btnPlay.setAttribute("class", "btn btn-dark btn-lg");
    btnPlay.setAttribute("type", "button");
    btnPlay.innerHTML = "Play";
    btnPlay.addEventListener("click", () => createPlayer());

    const centerWrapper = document.createElement("div");
    centerWrapper.setAttribute("id", "centerWrapper");
    centerWrapper.append(btnPlay);

    leaderboard.append(h1);
    leaderboard.append(ol);
    leaderboard.append(centerWrapper);
  }

  function getMax(arr, max) {
    // console.log("getMax()");
    if (arr.length < max) {
      return arr.length;
    } else {
      return max;
    }
  }

  // ----------------------Start Game--------------------------

  function createPlayer() {
    // console.log(`createPlayer()`);
    let configObjCreate = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(PLAYERS_URL, configObjCreate)
    then((res) => res.json())
    then((data) => setCurrentPlayer(data))
    catch((errors) => console.log(`createPlayer: ${errors}`));
  }

  function setCurrentPlayer(obj) {
    // console.log(`setCurrentPlayer(): obj =`, obj);
    CURRENT_PLAYER = obj.id;
    createGame(CURRENT_PLAYER);
  }

  function createGame(id) {
    // console.log(`createGame()`);
    leaderboard.innerHTML = "";
    let data = {
      player_id: id,
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(GAMES_URL, configObj)
    then((res) => res.json())
    then((obj) => setCurrentGame(obj))
    catch((errors) => console.log(`createGame Failed: ${errors}`));
  }

  function setCurrentGame(obj) {
    // console.log(`setCurrentGame(): obj =`, obj);
    CURRENT_GAME = obj.id;
    startGame();
  }

  function startGame() {
    // console.log(`startGame()`);
    gameOn = true;
    toggleColor();
    soundGameStart();
    activateKeyListeners();
    initKeys(row0);
    initKeys(row1);
    initKeys(row2);
    initKeys(row3);
    initKeys(row4);
    interval = setInterval(draw, 10);
  }

  function activateKeyListeners() {
    // console.log("activateKeyListeners()");
    document.body.addEventListener("keydown", (ev) => captureKeyDown(ev));
    document.body.addEventListener("keyup", (ev) => captureKeyUp(ev));
  }

  function captureKeyDown(ev) {
    // console.log("captureKeyDown()");
    //ev.preventDefault();
    let keyPressed = ev.code;

    if (preventDefaultKeys[keyPressed]) {
      ev.preventDefault();
    }

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

  // ----------------------Game Play--------------------------

  function draw() {
    // console.log("draw()");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = strokeThickness;
    ctx.strokeStyle = colorKeyUpStroke;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    drawKeysUp(KEY_ARRAY);
    drawKeysDown(KEY_ARRAY);
    drawScore();
    drawLives();
    collisionDetection(KEY_ARRAY);
    drawBall();

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
  }

  function drawKeysDown(array) {
    // console.log("drawKeysDown()");
    for (let i = 0; i < array.length; i++) {
      let key = array[i];
      if (key.s == 1) {
        drawSingleKeyDown(key.name, key.code, key.x, key.y, key.w, key.h);
      }
    }
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

  function drawScore() {
    // console.log("drawScore()");
    scoreText.innerText = "Score: " + score;
  }

  function drawLives() {
    livesText.innerText = "Lives: " + lives;
    // console.log("drawLives()");
  }

  function collisionDetection(KEY_ARRAY) {
    for (let i = 0; i < KEY_ARRAY.length; i++) {
      let thisKey = KEY_ARRAY[i];
      let leftSide = Math.round(thisKey.x);
      let rightSide = Math.round(thisKey.x + thisKey.w);
      let topSide = Math.round(thisKey.y);
      let bottomSide = Math.round(thisKey.y + thisKey.h);
      let ballDiameter = ballRadius;
      // if ball is active
      if (thisKey.s == 1) {
        // if ball is overlapping middle of a key, that key can't be depressed
        if (
          y > topSide + ballDiameter &&
          y < bottomSide - ballDiameter &&
          x > leftSide + ballDiameter &&
          x < rightSide - ballDiameter
        ) {
          thisKey.s == 0;
          drawSingleKeyGray(
            thisKey.name,
            thisKey.code,
            thisKey.x,
            thisKey.y,
            thisKey.w,
            thisKey.h
          );
        }
        // If ball is within the vertical bounds of the key
        if (y > topSide - ballDiameter && y < bottomSide + ballDiameter) {
          //if ball is traveling EAST and overlaps LEFT side
          if (
            x > leftSide - ballDiameter &&
            x < leftSide + ballDiameter &&
            directionH === "east"
          ) {
            dx = -dx;
            toggleDirectionH();
            scorePoint();
          }
          //if ball is traveling WEST and overlaps RIGHT side
          if (
            x > rightSide - ballDiameter &&
            x < rightSide + ballDiameter &&
            directionH === "west"
          ) {
            dx = -dx;
            toggleDirectionH();
            scorePoint();
          }
        }
        // If ball is within the horizontal bounds of the key
        if (x > leftSide - ballDiameter && x < rightSide + ballDiameter) {
          //if ball is traveling SOUTH and overlaps TOP side
          if (
            y > topSide - ballDiameter &&
            y < topSide + ballDiameter &&
            directionV === "south"
          ) {
            dy = -dy;
            toggleDirectionV();
            scorePoint();
          }
          //if ball is traveling NORTH and overlaps BOTTOM side
          if (
            y > bottomSide - ballDiameter &&
            y < bottomSide + ballDiameter &&
            directionV === "north"
          ) {
            dy = -dy;
            toggleDirectionV();
            scorePoint();
          }
        }
      }
    }
  }

  function drawSingleKeyGray(name, code, keyX, keyY, keyWidth, keyHeight) {
    // console.log("drawSingleKeyDown()");
    //console.log(`Drawing = ${name}`)
    ctx.beginPath();
    ctx.rect(keyX, keyY, keyWidth, keyHeight);
    ctx.strokeStyle = colorKeyDownStroke;
    ctx.lineWidth = strokeThickness;
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = colorKeyGrayFill;
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

  function scorePoint() {
    releaseAllKeys(KEY_ARRAY);
    soundScore();
    score = score + scoreIncrement;
    scoreNote1 = scoreNote1 + 10;
    scoreNote2 = scoreNote2 + 10;
    dx = dx * 1.3;
  }

  function fail() {
    // console.log("fail()");
    lives--;
    soundDie();
    if (!lives) {
      // console.log("GAME OVER");
      endGame();
    } else {
      // console.log("LIFE LOST");
      initNextPlay();
    }
  }

  function initNextPlay() {
    // console.log("initNextPlay()");
    scoreNote1 = 493.883;
    scoreNote2 = 659.255;
    x = canvas.width / 2;
    y = canvas.height / 2;
    ranNumX =
      Math.ceil(Math.random() * 1) * (Math.round(Math.random()) ? 1 : -1);
    ranNumY =
      Math.ceil(Math.random() * 1) * (Math.round(Math.random()) ? 1 : -1);
    // console.log(`ranNumX = `, ranNumX);
    // console.log(`ranNumY = `, ranNumY);
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

  // ----------------------Game Over--------------------------
  function endGame() {
    // console.log("endGame()");
    gameOn = false;
    toggleColor();
    soundGameOver();
    clearInterval(interval);
    interval = "";
    // console.log(
    //   `endGame: CURRENT_GAME = ${CURRENT_GAME}, CURRENT_PLAYER = ${CURRENT_PLAYER}`
    // );
    let data = {
      id: CURRENT_GAME,
      score: score,
    };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(GAMES_URL, configObj)
    then((res) => res.json())
    then(saveOrNot())
    catch((errors) => console.log(`endGame: ${errors}`));
  }

  function toggleColor() {
    if (gameOn === true) {
      colorKeyUpStroke = colorBlack;
      colorKeyUpFill = colorWhite;
      colorKeyFontUp = colorBlack;
    } else if (gameOn === false) {
      colorKeyUpStroke = colorLight;
      colorKeyUpFill = colorWhite;
      colorKeyFontUp = colorLight;
    }
  }

  function saveOrNot() {
    // console.log(`saveOrNot()`);
    if (score > 0) {
      saveModal.toggle();
    } else {
      document.location.reload();
    }
  }

  function skip() {
    // console.log(`skip()`);
    document.location.reload();
    // soundNext()
  }
  // ----------------------Save Player--------------------------
  function savePlayer(name) {
    // console.log(`savePlayer:name = ${name}`);
    let data = {
      id: CURRENT_PLAYER,
      name: name,
    };

    let configOb = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(PLAYERS_URL, configOb)
    then((res) => res.json())
    then(updateGame(name))
    catch((errors) => console.log(`savePlayer: ${errors}`));
  }

  function updateGame(name) {
    // console.log(`updateGame(): name = ${name}`);
    let data = {
      id: CURRENT_GAME,
      name: name,
    };

    let configOb = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(GAMES_URL, configOb)
    then((res) => res.json())
    then((obj) => getPersonalLeaderboard(obj.player_id))
    catch((errors) => console.log(`updateGame: ${errors}`));
  }

  function getPersonalLeaderboard(id) {
    // console.log("getPersonalLeaderboard()");
    saveModal.toggle();
    document.location.reload();
  }

  // ---------------------------------------------------

  getLeaderboard();
  renderGameboard();
});
