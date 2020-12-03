const BASE_URL = "http://localhost:3000"
const PLAYERS_URL = `${BASE_URL}/players`
const GAMES_URL = `${BASE_URL}/games`
//const CURR_PLAYER = "" 

document.addEventListener("DOMContentLoaded", (event) => {

  const leaderboard = document.getElementById("leaderboard")
  const form = document.getElementById("form")

  function setCurrentPlayer(obj){
    console.log(`setCurrentPlayer run...`)
    console.dir(obj)
    CURRENT_PLAYER = obj.id
    //console.log(`CURRENT_PLAYER = ${CURRENT_PLAYER}`)
  }

  function createPlayer(){
    console.log("createPlayer run")
    let formDataCreate = {
      score: 0,
      lives: 3
    }

    let configObjCreate = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formDataCreate)
    }

    fetch(PLAYERS_URL, configObjCreate)
        .then(res => res.json())
        //.then(obj => console.log(obj))
        .then(data => setCurrentPlayer(data))
        .catch(errors=>alert(errors))
    
  }
  
  function savePlayer(name){
    console.log(`savePlayer:name = ${name}`)
    //console.log(`CURRENT_PLAYER = ${CURRENT_PLAYER}`)
    // console.log(`event.target = ${event.target}`)
    // console.log(`event.target.playername = ${event.target.playername}`)
    // console.log(`event.target.playername.value = ${event.target.playername.value}`)
    let saveData = {
      id: CURRENT_PLAYER,
      name: name,
      score: 100,
      lives: 0
    }

    let configObjSave = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(saveData)
    }

    fetch(PLAYERS_URL, configObjSave)
        .then(res => res.json())
        .then(obj => console.log(obj))
        .catch(errors => alert(errors))
    
  }


  fetch("http://localhost:3000/players")
    .then((res) => res.json())
    .then(json => {
      const objs = json
      makeLeaderboard(objs)
  })

  function renderForm() {
    console.log("renderForm run")
      // build all elements with createElement
      // OR build it like Lantz with a big string
      const form = document.getElementById("form")
      // const playerName = document.createElement("input")
      // playerName.placeholder = "enter name"
      // form.append
      const btnStart = document.createElement("button")
      btnStart.setAttribute("id", "btn-start")
      btnStart.innerHTML = "Start Game"
      btnStart.addEventListener("click", () => createPlayer())
      const interface = document.getElementById("interface")
      interface.append(btnStart)

      const playername = document.createElement("input")
      playername.setAttribute("name", "playername")
      playername.placeholder = "enter name"
      const btnSave = document.createElement("button")
      btnSave.innerText = "Save Game"
      interface.append(playername)
      interface.append(btnSave)

      // form.innerHTML =
      //     `
      //         <input id="playername"></input>
      //         <br>
      //         <button class='btn-submit'>Submit</button>
      //     `
      //const btnSave = form.querySelector('.btn-submit')
      //btnSave.addEventListener('click', (event) => savePlayer(event))
      btnSave.addEventListener('click', () => savePlayer(playername.value))
  }

  renderForm()
  
  function makeLeaderboard(arr){
    console.log(`makeLeaderboard run...`)
    console.dir(arr)
    let ol = document.createElement("ol")
    for(element of arr){
      let li = document.createElement("li")
      li.innerText = `${element.name}......${element.score}`
      ol.append(li)
    }
    leaderboard.append(ol)
  }

  // GAME CODE

  // Variable Declariations

  // Canvas
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext("2d")
  
  let x = canvas.width/2
  let y = canvas.height-30

  //Ball

  // dx and dy = the incremental x and y movement
  let dx = 2
  let dy = -2
  let ballRadius = 10

  // Paddle
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width-paddleWidth) / 2;
  let paddleIncrement = 7

  
  // Interactivity
  let rightPressed = false;
  let leftPressed = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

// Methods

  function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = false;
      }
      else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = false;
      }
  }
  
  function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    x += dx
    y += dy

    // Make it bounce off the walls
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    if(rightPressed) {
      paddleX += paddleIncrement;
      if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
      }
    }
    else if(leftPressed) {
        paddleX -= paddleIncrement;
        if (paddleX < 0){
          paddleX = 0;
        }
      }
    }

    function drawBall(){
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    
    setInterval(draw, 10)

    // Semitransparant blue stroke rect
    // ctx.beginPath();
    // ctx.rect(160, 10, 100, 40);
    // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    // ctx.stroke();
    // ctx.closePath();

    const input = document.querySelector('input');
    const log = document.getElementById('log');
    const w = window.innerWidth;
    const h = window.innerHeight;
    const browser = navigator.appName
    const platform = navigator.platform
    //const browser = document.getElementById("browser")
    //const platform = document.getElementById("platform")


    let width = document.getElementById("window-width")
    let height = document.getElementById("window-height")
    width.innerText += w
    height.innerText += h
    //browser.innerText += browser
    //platform.innerText += platform
    
    input.addEventListener('keydown', logKey);
    
    function logKey(e) {
      log.textContent += ` ${e.code}`;
    }

    
});
