document.addEventListener("DOMContentLoaded", (event) => {
  const leaderboard = document.getElementById("leaderboard");
  //const form = document.getElementById("form");

  fetch("http://localhost:3000/players")
    .then((res) => res.json())
    .then((json) => {
      const objs = json;
      renderLeaderboard(objs);
    });

  function renderLeaderboard(arr) {
    let h1 = document.createElement("h1")
    h1.innerText="Top Scores"
    let ol = document.createElement("ol");
    for (element of arr) {
      let li = document.createElement("li");
      li.innerText = `${element.name}......${element.score}`;
      ol.append(li);
    }
    leaderboard.append(h1)
    leaderboard.append(ol);
  }
});
