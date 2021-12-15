// ----------------------Declare Global Constants--------------------------
const colorLight = "#dfdfdf";
const colorDark = "#808080";
const colorWhite = "#ffffff";
const colorBlack = "#000000";
const canvas = document.getElementById("myCanvas");
// ----------------------Declare Global Variables--------------------------
var colorKeyUpStroke;
var colorKeyUpFill;
var colorKeyFontUp;
var testing = false;
var speed;
var lives;
var scoreNote1;
var scoreNote2;
var ctx;
var ballRadius;
var dx;
var dy;
var interval;
var score;
var directionV;
var directionH;
var gameOn;

resetGlobalVars();

function resetGlobalVars() {

	var host = window.location.hostname;
	// ----------------------FOR TESTING-------------------------------------
	testing = host.indexOf('localhost') > -1 ? true : false;
	// ----------------------------------------------------------------------

	//Force Redirect to use SSL, need to comment while doing local development
	if(!testing && window.location.protocol == 'http:'){
		window.location.href = 'https://'+host;
	}

	if (testing === true) {
		console.log(`* * * TESTING = TRUE * * * `);
		speed = 1; // test super fast
		lives = 1; // test
	} else  {
		speed = 0.3; //normal
		lives = 3; //normal
	}
	colorKeyUpStroke = colorLight;
	colorKeyUpFill = colorWhite;
	colorKeyFontUp = colorLight;
	scoreNote1 = 493.883;
	scoreNote2 = 659.255;
	ctx = canvas.getContext("2d");
	ballRadius = 10;
	dx = speed;
	dy = -1 * dx;
	interval = "";
	score = 0;
	directionV = "north";
	directionH = "east";
	gameOn = false;
}
//------------------------------------------
const BASE_URL = "https://evening-hollows-06706.herokuapp.com";
const PLAYERS_URL = `${BASE_URL}/players`;
const GAMES_URL = `${BASE_URL}/games`;
const leaderboard = document.getElementById("leaderboard");
const colorKeyDownStroke = colorBlack;
const colorKeyDownFill = colorBlack;
const colorKeyFontDown = colorWhite;
const colorKeyGrayFill = colorDark;
const colorBallFill = colorBlack;
const colorBallStroke = colorBlack;
const strokeThickness = 1;
const livesText = document.getElementById("livesText");
const scoreText = document.getElementById("scoreText");
const scoreIncrement = 1000;
const keySegments = 15;
const factor = 5 / keySegments;
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
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

document.addEventListener("DOMContentLoaded", (event) => {
	// ----------------------Get Elements--------------------------
	var contentAbout = "";
	var contentHireMe = "";
	function getContent() {
		Promise.all([
			fetch("content/about.html").then((x) => x.text()),
			fetch("content/hireMe.html").then((x) => x.text()),
		]).then(([about, hireMe]) => {
			contentAbout = about;
			contentHireMe = hireMe;
		});
	}

	getContent();

	const aboutNav = document.getElementById("aboutNav");

	aboutNav.addEventListener("click", () => {
		showModal("About", contentAbout, [
			{
				label: "Close",
				onClick: (modal) => {},
			},
		]);
	});

	const hireMeNav = document.getElementById("hireMeNav");

	hireMeNav.addEventListener("click", () => {
		showModal("Hire Me!", contentHireMe, [
			{
				label: "Close",
				onClick: (modal) => {},
			},
		]);
	});

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
		// console.log(`soundScore()`);
		// Play a 'B4' now that lasts for 0.116 seconds
		playNote(scoreNote1, context.currentTime, 0.116, "square");

		// Play an 'E5' just as the previous note finishes, that lasts for 0.232 seconds
		playNote(scoreNote2, context.currentTime + 0.116, 0.232, "square");
	}

	function soundGameStart() {
		// console.log(`soundGameStart()`);
		// Play a 'G4' now that lasts for 0.116 seconds
		playNote(391.995, context.currentTime, 0.116, "square");

		// Play a 'G4' now that lasts for 0.116 seconds
		playNote(391.995, context.currentTime + 0.116, 0.116, "square");

		// Play an 'C5' just as the previous note finishes, that lasts for 0.232 seconds
		playNote(523.251, context.currentTime + 0.232, 0.232, "square");
	}

	function soundGameOver() {
		if (testing) {
			console.log(`soundGameOver()`);
		}
		// Play a 'A Flat/G#' now that lasts for 0.116 seconds
		playNote(207.652, context.currentTime, 0.116, "square");

		// Play a 'F3' now that lasts for 0.116 seconds
		playNote(174.614, context.currentTime + 0.116, 0.116, "square");

		// Play an 'D3' just as the previous note finishes, that lasts for 0.232 seconds
		playNote(146.832, context.currentTime + 0.232, 0.232, "square");
	}

	function soundNext() {
		// console.log(`soundNext()`);
		// Play a 'f3' now that lasts for 0.116 seconds
		playNote(174.614, context.currentTime, 0.116, "square");

		// Play a 'g3' now that lasts for 0.116 seconds
		playNote(195.998, context.currentTime + 0.116, 0.116, "square");

		// Play an 'a3' just as the previous note finishes, that lasts for 0.232 seconds
		playNote(220.0, context.currentTime + 0.232, 0.232, "square");
	}

	function soundDie() {
		// console.log(`soundDie()`);
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

	function showModal(titleHtml, content) {
		if (testing) {
			console.log(`showModal()`);
		}
		const modal = document.createElement("div");
		modal.classList.add("modal--");
		modal.innerHTML = `
      <div class="modal--inner">
        <div class="modal--top">
          <div class="modal--title">${titleHtml}</div>
          <button type="button" class="modal--close">
            <span class="material-icons">close</span>
          </button>
        </div>
        <div class="modal--content">${content}</div>
        <div class="modal--bottom"></div>
      </div>
    `;

		modal.querySelector(".modal--close").addEventListener("click", () => {
			if (testing) {
				console.log(`showModal modal--close`);
			}
			document.body.removeChild(modal);
		});

		document.body.appendChild(modal);
	}

	function showSaveModal() {
		// console.log("showSaveModal()");
		const modal = document.createElement("div");
		modal.classList.add("modal--");
		modal.innerHTML = `
      <div class="modal--inner">
        <div class="modal--top">
          <div class="modal--title">Save Your Score</div>
          <button type="button" class="modal--close">
            <span class="material-icons">close</span>
          </button>
        </div>
        <div class="modal--content">
          <p>Type your name below</p>
          <input type="name" id="nameField" required />
        </div>
        <div class="modal--bottom"></div>
      </div>
    `;

		// Close Button
		modal.querySelector(".modal--close").addEventListener("click", () => {
			if (testing) {
				console.log(`showSaveModal: close`);
			}
			document.body.removeChild(modal);
			skip();
		});

		// Skip Button
		const skipButton = document.createElement("button");
		skipButton.setAttribute("type", "button");
		skipButton.classList.add("modal--button");
		skipButton.textContent = "Skip This";
		skipButton.addEventListener("click", () => {
			if (testing) {
				console.log(`showSaveModal: skip`);
			}
			document.body.removeChild(modal);
			skip();
		});
		modal.querySelector(".modal--bottom").appendChild(skipButton);

		// Save Button
		const saveButton = document.createElement("button");
		saveButton.setAttribute("type", "button");
		saveButton.classList.add("modal--button");
		saveButton.textContent = "Save";
		saveButton.addEventListener("click", () => {
			if (testing) {
				console.log(`showSaveModal: save`);
			}
			savePlayer(nameField.value.toUpperCase());
			document.body.removeChild(modal);
		});
		modal.querySelector(".modal--bottom").appendChild(saveButton);

		document.body.appendChild(modal);
	}

	// ----------------------Launch--------------------------

	function getLeaderboard() {
		if (testing) {
			console.log("getLeaderboard()");
		}
		fetch(GAMES_URL)
			.then((res) => res.json())
			.then((json) => {
				const objs = json;
				renderLeaderboard(objs);
			});
	}

	function initAllKeys() {
		if (testing) {
			console.log("initAllKeys()");
		}
		KEY_ARRAY = [];
		initKeys(row0);
		initKeys(row1);
		initKeys(row2);
		initKeys(row3);
		initKeys(row4);
	}

	function renderGameboard() {
		if (testing) {
			console.log(`renderGameboard()`);
		}
		initAllKeys();
		drawKeysUp(KEY_ARRAY);
		drawKeysDown(KEY_ARRAY);
		getLeaderboard();
	}

	function initKeys(keys) {
		// console.log("initKeys()");
		for (let i = 0; i < keys.length; i++) {
			let k = keys[i].name;
			let c = keys[i].code;
			// console.log(`Drawing = ${k}`);
			let w = Math.round(keys[i].segments * keyWidth);
			let h = keyHeight;
			let x = keys[i].position * keyWidth;
			let y = keys[i].row * keyHeight;
			let s = keys[i].status;
			KEY_ARRAY.push({ name: k, code: c, x: x, y: y, w: w, h: h, s: s });
		}
		// console.dir(KEY_ARRAY);
	}

	function drawKeysUp(array) {
		// console.log(`drawKeysUp()`);
		// console.log(`drawKeysUp()`, array);
		for (let i = 0; i < array.length; i++) {
			let key = array[i];
			drawSingleKeyUp(key.name, key.code, key.x, key.y, key.w, key.h);
		}
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

	function drawSingleKeyUp(name, code, keyX, keyY, keyWidth, keyHeight) {
		// console.log("drawSingleKeyUp()");
		// console.log(`Drawing = ${name}`);
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

	function renderLeaderboard(arr) {
		if (testing) {
			console.log("renderLeaderboard()");
		}
		soundNext();
		let filteredArr = arr.filter((element) => element.player.name !== null);
		let h1 = document.createElement("h1");
		h1.className = "title";
		h1.innerText = "Top Scores";
		filteredArr.sort((a, b) => (a.score < b.score ? 1 : -1));
		let ol = document.createElement("ol");
		for (let i = 0; i < getMax(filteredArr, 10); i++) {
			let li = document.createElement("li");
			li.className = "list-item";
			let element = filteredArr[i];
			if (filteredArr.length > 0) {
				let s = element["score"];
				let p = element["player"]["name"];
				li.innerText = `${s} points......${p}`;
			}
			ol.append(li);
		}

		const btnPlay = document.createElement("a");
		btnPlay.setAttribute("id", "btn-play");
		btnPlay.setAttribute("class", "playBtn");
		btnPlay.innerHTML = "PLAY";
		btnPlay.addEventListener("click", () => createPlayer());

		const centerWrapper = document.createElement("div");
		centerWrapper.setAttribute("class", "centerWrapper");
		centerWrapper.append(btnPlay);

		leaderboard.append(h1);
		leaderboard.append(ol);
		leaderboard.append(centerWrapper);
		drawScore();
		drawLives();
	}

	function getMax(arr, max) {
		// console.log("getMax()");
		if (arr.length < max) {
			return arr.length;
		} else {
			return max;
		}
	}

	function initializeWindowListener() {
		if (testing) {
			console.log(`initializeWindowListener()`);
		}
		window.addEventListener("resize", resizeCanvas, false);
	}

	function initializeCanvas() {
		if (testing) {
			console.log(`initializeCanvas()`);
		}
		w = window.innerWidth;
		h = window.innerHeight;
		typeFont = window.innerWidth / 100 + "px Courier New";
		canvas.width = w;
		canvas.height = factor * w;
		x = canvas.width / 2;
		y = canvas.height / 2;
		keyWidth = w / keySegments;
		keyHeight = keyWidth;
		renderGameboard();
	}

	function resizeCanvas() {
		// console.log(`resizeCanvas()`);
		w = window.innerWidth;
		h = window.innerHeight;
		typeFont = window.innerWidth / 100 + "px Courier New";
		canvas.width = w;
		canvas.height = factor * w;
		x = canvas.width / 2;
		y = canvas.height / 2;
		keyWidth = w / keySegments;
		keyHeight = keyWidth;
		initAllKeys();
		drawKeysUp(KEY_ARRAY);
		drawKeysDown(KEY_ARRAY);
	}

	initializeWindowListener();

	// ----------------------Start Game--------------------------

	function createPlayer() {
		if (testing) {
			console.log(`createPlayer()`);
		}
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

	function setCurrentPlayer(obj) {
		if (testing) {
			console.log(`setCurrentPlayer(): obj =`, obj);
		}
		CURRENT_PLAYER = obj.id;
		createGame(CURRENT_PLAYER);
	}

	function createGame(id) {
		if (testing) {
			console.log(`createGame()`);
		}
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
			.then((res) => res.json())
			.then((obj) => setCurrentGame(obj))
			.catch((errors) => console.log(`createGame Failed: ${errors}`));
	}

	function setCurrentGame(obj) {
		if (testing) {
			console.log(`setCurrentGame(): obj =`, obj);
		}
		CURRENT_GAME = obj.id;
		startGame();
	}

	function startGame() {
		if (testing) {
			console.log(`startGame()`);
		}
		gameOn = true;
		toggleColor();
		soundGameStart();
		activateKeyListeners();
		initAllKeys();
		interval = setInterval(draw, 10);
	}

	function activateKeyListeners() {
		if (testing) {
			console.log("activateKeyListeners()");
		}
		document.body.addEventListener("keydown", (ev) => captureKeyDown(ev));
		document.body.addEventListener("keyup", (ev) => captureKeyUp(ev));
	}

	function captureKeyDown(ev) {
		// console.log("captureKeyDown()");
		let keyPressed = ev.code;

		if (preventDefaultKeys[keyPressed]) {
			ev.preventDefault();
		}

		let keyObj = KEY_ARRAY.find(({ code }) => code === keyPressed);
		if (keyObj) keyObj.s = 1;

		return false;
	}

	function captureKeyUp(ev) {
		// console.log("captureKeyUp()");
		let keyReleased = ev.code;
		let keyObj = KEY_ARRAY.find(({ code }) => code === keyReleased);
		if (keyObj) keyObj.s = 0;
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
					// if ball is traveling EAST and overlaps LEFT side
					if (
						x > leftSide - ballDiameter &&
						x < leftSide + ballDiameter &&
						directionH === "east"
					) {
						dx = -dx;
						toggleDirectionH();
						scorePoint();
					}
					// if ball is traveling WEST and overlaps RIGHT side
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
					// if ball is traveling SOUTH and overlaps TOP side
					if (
						y > topSide - ballDiameter &&
						y < topSide + ballDiameter &&
						directionV === "south"
					) {
						dy = -dy;
						toggleDirectionV();
						scorePoint();
					}
					// if ball is traveling NORTH and overlaps BOTTOM side
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
		// console.log(`Drawing = ${name}`)
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
		if (testing) {
			console.log("fail()");
		}
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
		if (testing) {
			console.log("initNextPlay()");
		}
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
		if (testing) {
			console.log("endGame()");
		}
		gameOn = false;
		toggleColor();
		soundGameOver();
		clearInterval(interval);
		interval = "";
		// console.log(`endGame: CURRENT_GAME = ${CURRENT_GAME}, CURRENT_PLAYER = ${CURRENT_PLAYER}`);
		preSaveOrNot();
	}

	function preSaveOrNot() {
		if (testing) {
			console.log(`preSaveOrNot()`);
		}
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
			.then((res) => res.json())
			.then(saveOrNot())
			.catch((errors) => console.log(`endGame: ${errors}`));
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
		if (testing) {
			console.log(`saveOrNot()`);
		}
		if (score > 0) {
			showSaveModal();
		} else {
			skip();
		}
	}

	function skip() {
		if (testing) {
			console.log(`skip()`);
		}
		reloadGame();
	}
	// ----------------------Save Player--------------------------
	function savePlayer(name) {
		if (testing) {
			console.log(`savePlayer:name = ${name}`);
		}
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
			.then((res) => res.json())
			.then(updateGame(name))
			.catch((errors) => console.log(`savePlayer: ${errors}`));
	}

	function updateGame(name) {
		if (testing) {
			console.log(`updateGame(): git name = ${name}`);
		}
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
			.then((res) => res.json())
			.then(() => reloadGame())
			.catch((errors) => console.log(`updateGame: ${errors}`));
	}

	function reloadGame() {
		if (testing) {
			console.log(`reloadGame()`);
		}
		resetGlobalVars();
		initializeCanvas();
		leaderboard.innerHTML = "";
	}

	initializeCanvas();
});
