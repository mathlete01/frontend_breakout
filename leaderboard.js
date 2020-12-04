document.addEventListener("DOMContentLoaded", (event) => {

    const leaderboard = document.getElementById("leaderboard")
    // const form = document.getElementById("form")

    fetch("http://localhost:3000/players")
    .then((res) => res.json())
    .then(json => {
      const objs = json
      makeLeaderboard(objs)
  })

//   function renderForm() {
//     //console.log("renderForm run")
//       // build all elements with createElement
//       // OR build it like Lantz with a big string
//       const form = document.getElementById("form")
//       // const playerName = document.createElement("input")
//       // playerName.placeholder = "enter name"
//       // form.append
//       const btnStart = document.createElement("button")
//       btnStart.setAttribute("id", "btn-start")
//       btnStart.innerHTML = "Start Game"
//       btnStart.addEventListener("click", () => createPlayer())
//       const interface = document.getElementById("interface")
//       interface.append(btnStart)

//       const playername = document.createElement("input")
//       playername.setAttribute("name", "playername")
//       playername.placeholder = "enter name"
//       const btnSave = document.createElement("button")
//       btnSave.innerText = "Save Game"
//       interface.append(playername)
//       interface.append(btnSave)

//       // form.innerHTML =
//       //     `
//       //         <input id="playername"></input>
//       //         <br>
//       //         <button class='btn-submit'>Submit</button>
//       //     `
//       //const btnSave = form.querySelector('.btn-submit')
//       //btnSave.addEventListener('click', (event) => savePlayer(event))
//       btnSave.addEventListener('click', () => savePlayer(playername.value))
//   }

//   renderForm()
  
  function makeLeaderboard(arr){
    //console.log(`makeLeaderboard run...`)
    //console.dir(arr)
    let ol = document.createElement("ol")
    for(element of arr){
      let li = document.createElement("li")
      li.innerText = `${element.name}......${element.score}`
      ol.append(li)
    }
    leaderboard.append(ol)
  }
    
});