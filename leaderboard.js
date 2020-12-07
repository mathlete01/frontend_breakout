document.addEventListener("DOMContentLoaded", (event) => {
  const leaderboard = document.getElementById("leaderboard");
  //const form = document.getElementById("form");

  fetch("http://localhost:3000/games")
    .then((res) => res.json())
    .then((json) => {
      const objs = json;
      renderLeaderboard(objs);
    });

    function renderLeaderboard(arr) {
      //console.dir(arr)
      arr.sort((a, b) => (a.score < b.score) ? 1 : -1)
      let h1 = document.createElement("h1")
      h1.innerText="Top Ten Scores"
      let ol = document.createElement("ol");
      ol.setAttribute("padding-left", 30)
      ol.setAttribute("list-style-position", "inside")
      ol.setAttribute("margin-left", "20px")
      for(let i = 0; i < 10; i ++){
        let li = document.createElement("li");
        li.setAttribute("display", "list-item")
        li.setAttribute("list-style-position", "inside")
        let element = arr[i]
        let s = element["score"]
        //let p = element["player_id"]
        let p = element["player"]["name"]
        // console.log(`element["score"] = ${element["score"]}`)
        // console.log(`element["player_id"] = ${element["player_id"]}`)
        li.innerText = `${p}......${s} points`;
        ol.append(li);
      }
      
      leaderboard.append(h1)
      leaderboard.append(ol);
    }
  });