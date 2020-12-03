const BASE_URL = "http://localhost:3000"
const PLAYERS_URL = `${BASE_URL}/players`
const GAMES_URL = `${BASE_URL}/games`

document.addEventListener("DOMContentLoaded", (event) => {

  const leaderboard = document.getElementById("leaderboard")
  const form = document.getElementById("form")

  function createPlayer(){
    let formData = {
      score: 0,
      lives: 3
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(PLAYERS_URL, configObj)
        .then(res => res.json())
        .then(obj => console.log(obj))
        .catch(errors=>alert(errors))
    
  }
  
  function savePlayer(target){
    console.log("target", target)
    fetch(PLAYERS_URL, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'trainer_id': target})
    })
        .then(res => res.json())
  }


  fetch("http://localhost:3000/players")
    .then((res) => res.json())
    .then(json => {
      const players = json
      makeLeaderboard(players)
  })

  function renderForm() {
      // build all elements with createElement
      // OR build it like Lantz with a big string
      const form = document.getElementById("form")
      // const playerName = document.createElement("input")
      // playerName.placeholder = "enter name"
      // form.append
      const btnStart = document.createElement("button")
      btnStart.setAttribute("id", "btn-start")
      btnStart.innerHTML = "Start Game, yo"
      btnStart.addEventListener("click", () => createPlayer())
      const interface = document.getElementById("interface")
      interface.append(btnStart)

      form.innerHTML =
          `
              <input id="playername"></input>
              <br>
              <button class='btn-submit'>Submit</button>
          `
      const submitButton = form.querySelector('.btn-submit')
      submitButton.addEventListener('click', () => submitName())
  }

    renderForm()
    
    function makeLeaderboard(arr){
      let ul = document.createElement("ul")
      for(element of arr){
        let li = document.createElement("li")
        li.innerText = `${element.name}......${element.score}`
        ul.append(li)
      }
      leaderboard.append(ul)
    }

    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")
    
    let x = canvas.width/2
    let y = canvas.height-30
    let dx = 2
    let dy = -2

    function drawBall(){
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI*2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    }

    function draw(){
      ctx.clearRect(0,0,canvas.width, canvas.height)
      drawBall()
      x += dx
      y += dy
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
