document.addEventListener("DOMContentLoaded", (event) => {

  const leaderboard = document.getElementById("leaderboard")
  //const players = []

    fetch("http://localhost:3000/players")
      .then((res) => res.json())
      .then(json => {
        const players = json
        makeLeaderboard(players)
      })

    function makeLeaderboard(arr){
      let ul = document.createElement("ul")
      for(element of arr){
        let li = document.createElement("li")
        li.innerText = `${element.name}......${element.score}`
        ul.append(li)
      }
      leaderboard.append(ul)
    }

    //makeLeaderboard()

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
