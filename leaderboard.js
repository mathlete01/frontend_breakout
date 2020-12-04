document.addEventListener("DOMContentLoaded", (event) => {

    const leaderboard = document.getElementById("leaderboard")
    const form = document.getElementById("form")

    fetch("http://localhost:3000/players")
    .then((res) => res.json())
    .then(json => {
      const objs = json
      makeLeaderboard(objs)
  })
  
  function makeLeaderboard(arr){
    let ol = document.createElement("ol")
    for(element of arr){
      let li = document.createElement("li")
      li.innerText = `${element.name}......${element.score}`
      ol.append(li)
    }
    leaderboard.append(ol)
  }
    
});