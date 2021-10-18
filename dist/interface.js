const BASE_URL="https://evening-hollows-06706.herokuapp.com",PLAYERS_URL=`${BASE_URL}/players`,GAMES_URL=`${BASE_URL}/games`,leaderboard=document.getElementById("leaderboard"),browser=navigator.appName,platform=navigator.platform,colorLight="#dfdfdf",colorDark="#808080",colorWhite="#ffffff",colorBlack="#000000";let colorKeyUpStroke=colorLight,colorKeyUpFill=colorWhite,colorKeyFontUp=colorLight;const colorKeyDownStroke=colorBlack,colorKeyDownFill=colorBlack,colorKeyFontDown=colorWhite,colorKeyGrayFill=colorDark,colorBallFill=colorBlack,colorBallStroke=colorBlack,strokeThickness=1;let logging=!1,testing=!1,speed=.3,lives=3;if(testing){console.log("* * * TESTING = TRUE * * * ");let e=1,t=2;logging=!0}const livesText=document.getElementById("livesText"),scoreText=document.getElementById("scoreText");let scoreNote1=493.883,scoreNote2=659.255;const scoreIncrement=1e3,canvas=document.getElementById("myCanvas");let keySegments=15;const factor=5/keySegments;let ctx=canvas.getContext("2d"),ballRadius=10,dx=speed,dy=-1*dx,rightPressed=!1,leftPressed=!1,keyRowCount=5,keyColumnCount=15,keyPadding=10,keyOffsetTop=30,keyOffsetLeft=30,topRow=100,interval="",score=0,directionV="north",directionH="east";var AudioContext=window.AudioContext||window.webkitAudioContext;const context=new AudioContext;let gameOn=!1;const vol=.05,row0=[{name:"`",code:"Backquote",row:0,segments:1,status:0,position:0},{name:"1",code:"Digit1",row:0,segments:1,status:0,position:1},{name:"2",code:"Digit2",row:0,segments:1,status:0,position:2},{name:"3",code:"Digit3",row:0,segments:1,status:0,position:3},{name:"4",code:"Digit4",row:0,segments:1,status:0,position:4},{name:"5",code:"Digit5",row:0,segments:1,status:0,position:5},{name:"6",code:"Digit6",row:0,segments:1,status:0,position:6},{name:"7",code:"Digit7",row:0,segments:1,status:0,position:7},{name:"8",code:"Digit8",row:0,segments:1,status:0,position:8},{name:"9",code:"Digit9",row:0,segments:1,status:0,position:9},{name:"0",code:"Digit0",row:0,segments:1,status:0,position:10},{name:"-",code:"Minus",row:0,segments:1,status:0,position:11},{name:"=",code:"Equal",row:0,segments:1,status:0,position:12},{name:"Backspace",code:"Backspace",row:0,segments:2,status:0,position:13}],row1=[{name:"Tab",code:"Tab",row:1,segments:2,status:0,position:0},{name:"q",code:"KeyQ",row:1,segments:1,status:0,position:2},{name:"w",code:"KeyW",row:1,segments:1,status:0,position:3},{name:"e",code:"KeyE",row:1,segments:1,status:0,position:4},{name:"r",code:"KeyR",row:1,segments:1,status:0,position:5},{name:"t",code:"KeyT",row:1,segments:1,status:0,position:6},{name:"y",code:"KeyY",row:1,segments:1,status:0,position:7},{name:"u",code:"KeyU",row:1,segments:1,status:0,position:8},{name:"i",code:"KeyI",row:1,segments:1,status:0,position:9},{name:"o",code:"KeyO",row:1,segments:1,status:0,position:10},{name:"p",code:"KeyP",row:1,segments:1,status:0,position:11},{name:"[",code:"BracketLeft",row:1,segments:1,status:0,position:12},{name:"]",code:"BracketRight",row:1,segments:1,status:0,position:13},{name:"\\",code:"Backslash",row:1,segments:1,status:0,position:14}],row2=[{name:"CapsLock",code:"CapsLock",row:2,segments:2,status:0,position:0},{name:"a",code:"KeyA",row:2,segments:1,status:0,position:2},{name:"s",code:"KeyS",row:2,segments:1,status:0,position:3},{name:"d",code:"KeyD",row:2,segments:1,status:0,position:4},{name:"f",code:"KeyF",row:2,segments:1,status:0,position:5},{name:"g",code:"KeyG",row:2,segments:1,status:0,position:6},{name:"h",code:"KeyH",row:2,segments:1,status:0,position:7},{name:"j",code:"KeyJ",row:2,segments:1,status:0,position:8},{name:"k",code:"KeyK",row:2,segments:1,status:0,position:9},{name:"l",code:"KeyL",row:2,segments:1,status:0,position:10},{name:":",code:"Semicolon",row:2,segments:1,status:0,position:11},{name:"'",code:"Quote",row:2,segments:1,status:0,position:12},{name:"Enter",code:"Enter",row:2,segments:2,status:0,position:13}],row3=[{name:"Shift",code:"ShiftLeft",row:3,segments:2.5,status:0,position:0},{name:"z",code:"KeyZ",row:3,segments:1,status:0,position:2.5},{name:"x",code:"KeyX",row:3,segments:1,status:0,position:3.5},{name:"c",code:"KeyC",row:3,segments:1,status:0,position:4.5},{name:"v",code:"KeyV",row:3,segments:1,status:0,position:5.5},{name:"b",code:"KeyB",row:3,segments:1,status:0,position:6.5},{name:"n",code:"KeyN",row:3,segments:1,status:0,position:7.5},{name:"m",code:"KeyM",row:3,segments:1,status:0,position:8.5},{name:",",code:"Comma",row:3,segments:1,status:0,position:9.5},{name:".",code:"Period",row:3,segments:1,status:0,position:10.5},{name:"/",code:"Slash",row:3,segments:1,status:0,position:11.5},{name:"Shift",code:"ShiftRight",row:3,segments:2.5,status:0,position:12.5}],row4=[{name:"Function",code:"",row:4,segments:1,status:0,position:0},{name:"Control",code:"ControlLeft",row:4,segments:1,status:0,position:1},{name:"Alt",code:"AltLeft",row:4,segments:1,status:0,position:2},{name:"⌘",code:"MetaLeft",row:4,segments:1.5,status:0,position:3},{name:"Space",code:"Space",row:4,segments:5,status:0,position:4.5},{name:"⌘",code:"MetaRight",row:4,segments:1.5,status:0,position:9.5},{name:"Alt",code:"AltRight",row:4,segments:1,status:0,position:11},{name:"←",code:"ArrowLeft",row:4,segments:1,status:0,position:12},{name:"↑",code:"ArrowUp",row:4,segments:1,status:0,position:13},{name:"↓",code:"ArrowDown",row:4,segments:1,status:0,position:13},{name:"→",code:"ArrowRight",row:4,segments:1,status:0,position:14}],preventDefaultKeys={Tab:!0,Enter:!0};document.addEventListener("DOMContentLoaded",e=>{const t=document.getElementById("aboutNav");t.addEventListener("click",()=>n("About",`<p>
  QWERTYBall is the realization of an idea I had years ago that it
  would be fun to create a twist on the classic game of
  <a
  class="blue" href="https://en.wikipedia.org/wiki/Breakout_(video_game)"
    target="_blank"
    >Breakout</a
  >
  by transposing my keyboard onto my screen so that you had to
  bang on the keys to keep the ball in play.
</p>
<p>
  For whatever reason, the idea stuck with me, so when I
  <a
    class="blue"  
    href="https://flatironschool.com/career-courses/coding-bootcamp/online"
    target="_blank"
    >decided to get back into programming</a
  >
  and needed a project to work on, I decided to make this game for
  real.
</p>
<p>
  I employed the Canvas API to dynamically draw the keyboard on
  the user’s screen, and I used the Web Audio API to add original
  sound effects to make the game feel more responsive
</p>
<p>
  I hope you enjoy it. Feel free to
  <a class="blue" href="mailto:msallin@gmail.com">get in touch</a> if you have
  any feedback!
</p>
<p>-Matty</p>`,[{label:"Close",onClick:e=>{},triggerClose:!0}]));const o=document.getElementById("hireMeNav");function r(e,t,o,n){const s=context.createOscillator(),a=context.createOscillator(),i=context.createGain();s.type=n,a.type=n,i.gain.value=vol,s.connect(i),a.connect(i),i.connect(context.destination),s.frequency.value=e+1,a.frequency.value=e-2,i.gain.setValueAtTime(vol,t+o-.05),i.gain.linearRampToValueAtTime(0,t+o),s.start(t),a.start(t),s.stop(t+o),a.stop(t+o)}function l(){switch(directionV){case"north":directionV="south";break;case"south":directionV="north";break;default:return}}function d(){switch(directionH){case"east":directionH="west";break;case"west":directionH="east";break;default:return}}function n(e,t,o){const n=document.createElement("div");n.classList.add("modal--"),n.innerHTML=`
      <div class="modal--inner">
        <div class="modal--top">
          <div class="modal--title">${e}</div>
          <button type="button" class="modal--close">
            <span class="material-icons">close</span>
          </button>
        </div>
        <div class="modal--content">${t}</div>
        <div class="modal--bottom"></div>
      </div>
    `;for(const s of o){const a=document.createElement("button");a.setAttribute("type","button"),a.classList.add("modal--button"),a.textContent=s.label,a.addEventListener("click",()=>{s.triggerClose&&document.body.removeChild(n),s.onClick(n)}),n.querySelector(".modal--bottom").appendChild(a)}n.querySelector(".modal--close").addEventListener("click",()=>{document.body.removeChild(n)}),document.body.appendChild(n)}function s(){const e=document.createElement("div");e.classList.add("modal--"),e.innerHTML=`
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
    `,e.querySelector(".modal--close").addEventListener("click",()=>A());const t=document.createElement("button");t.setAttribute("type","button"),t.classList.add("modal--button"),t.textContent="Skip This",t.addEventListener("click",()=>A()),e.querySelector(".modal--bottom").appendChild(t);const o=document.createElement("button");o.setAttribute("type","button"),o.classList.add("modal--button"),o.textContent="Save",o.addEventListener("click",()=>{!function(e){testing&&console.log(`savePlayer:name = ${e}`);var t={id:CURRENT_PLAYER,name:e},t={method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)};fetch(PLAYERS_URL,t).then(e=>e.json()).then(function(e){testing&&console.log(`updateGame(): git name = ${e}`);e={id:CURRENT_GAME,name:e},e={method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};fetch(GAMES_URL,e).then(e=>e.json()).then(()=>document.location.reload()).catch(e=>console.log(`updateGame: ${e}`))}(e)).catch(e=>console.log(`savePlayer: ${e}`))}(nameField.value.toUpperCase())}),e.querySelector(".modal--bottom").appendChild(o),document.body.appendChild(e)}function m(){testing&&console.log("initAllKeys()"),KEY_ARRAY=[],a(row0),a(row1),a(row2),a(row3),a(row4)}function a(t){for(let e=0;e<t.length;e++){var o=t[e].name,n=t[e].code,s=Math.round(t[e].segments*keyWidth),a=keyHeight,i=t[e].position*keyWidth,c=t[e].row*keyHeight,r=t[e].status;KEY_ARRAY.push({name:o,code:n,x:i,y:c,w:s,h:a,s:r})}}function i(t){for(let e=0;e<t.length;e++){var o=t[e];!function(e,t,o,n,s,a){ctx.beginPath(),ctx.rect(o,n,s,a),ctx.strokeStyle=colorKeyUpStroke,ctx.lineWidth=strokeThickness,ctx.stroke(),ctx.closePath(),ctx.fillStyle=colorKeyUpFill,ctx.fill(),ctx.closePath(),ctx.id=t,ctx.font=typeFont,ctx.fillStyle=colorKeyFontUp;e=e.toUpperCase();ctx.textAlign="center",ctx.fillText(e,o+s/2,n+a/2+4)}(o.name,o.code,o.x,o.y,o.w,o.h)}}function c(t){for(let e=0;e<t.length;e++){var o=t[e];1==o.s&&function(e,t,o,n,s,a){ctx.beginPath(),ctx.rect(o,n,s,a),ctx.strokeStyle=colorKeyDownStroke,ctx.lineWidth=strokeThickness,ctx.stroke(),ctx.closePath(),ctx.fillStyle=colorKeyDownFill,ctx.fill(),ctx.closePath(),ctx.id=t,ctx.font=typeFont,ctx.fillStyle=colorKeyFontDown;e=e.toUpperCase();ctx.textAlign="center",ctx.fillText(e,o+s/2,n+a/2+4)}(o.name,o.code,o.x,o.y,o.w,o.h)}}function u(){w=window.innerWidth,h=window.innerHeight,typeFont=window.innerWidth/100+"px Courier New",canvas.width=w,canvas.height=factor*w,x=canvas.width/2,y=canvas.height/2,keyWidth=w/keySegments,keyHeight=keyWidth,m(),i(KEY_ARRAY),c(KEY_ARRAY)}function p(){ctx.clearRect(0,0,canvas.width,canvas.height),ctx.lineWidth=strokeThickness,ctx.strokeStyle=colorKeyUpStroke,ctx.strokeRect(0,0,canvas.width,canvas.height),i(KEY_ARRAY),c(KEY_ARRAY),g(),f(),function(t){for(let e=0;e<t.length;e++){var o=t[e],n=Math.round(o.x),s=Math.round(o.x+o.w),a=Math.round(o.y),i=Math.round(o.y+o.h),c=ballRadius;1==o.s&&(y>a+c&&y<i-c&&x>n+c&&x<s-c&&(o.s,function(e,t,o,n,s,a){ctx.beginPath(),ctx.rect(o,n,s,a),ctx.strokeStyle=colorKeyDownStroke,ctx.lineWidth=strokeThickness,ctx.stroke(),ctx.closePath(),ctx.fillStyle=colorKeyGrayFill,ctx.fill(),ctx.closePath(),ctx.id=t,ctx.font=typeFont,ctx.fillStyle=colorKeyFontDown;e=e.toUpperCase();ctx.textAlign="center",ctx.fillText(e,o+s/2,n+a/2+4)}(o.name,o.code,o.x,o.y,o.w,o.h)),y>a-c&&y<i+c&&(x>n-c&&x<n+c&&"east"===directionH&&(dx=-dx,d(),k()),x>s-c&&x<s+c&&"west"===directionH&&(dx=-dx,d(),k())),x>n-c&&x<s+c&&(y>a-c&&y<a+c&&"south"===directionV&&(dy=-dy,l(),k()),y>i-c&&y<i+c&&"north"===directionV&&(dy=-dy,l(),k())))}}(KEY_ARRAY),ctx.beginPath(),ctx.arc(x,y,ballRadius,0,2*Math.PI),ctx.fillStyle=colorBallFill,ctx.fill(),ctx.closePath(),ctx.strokeStyle=colorBallStroke,ctx.stroke(),ctx.closePath(),lives<1&&b(),(x+dx>canvas.width-ballRadius||x+dx<ballRadius)&&b(),(y+dy>canvas.height-ballRadius||y+dy<ballRadius)&&b(),x+=dx,y+=dy}function g(){scoreText.innerText="Score: "+score}function f(){livesText.innerText="Lives: "+lives}function k(){!function(e){for(key of e)key.s=0}(KEY_ARRAY),r(scoreNote1,context.currentTime,.116,"square"),r(scoreNote2,context.currentTime+.116,.232,"square"),score+=scoreIncrement,scoreNote1+=10,scoreNote2+=10,dx*=1.3}function b(){testing&&console.log("fail()"),lives--,r(82.407,context.currentTime,.116,"square"),r(77.782,context.currentTime+.116,.116,"square"),r(69.296,context.currentTime+.232,.232,"square"),(lives?function(){testing&&console.log("initNextPlay()");switch(scoreNote1=493.883,scoreNote2=659.255,x=canvas.width/2,y=canvas.height/2,ranNumX=Math.ceil(+Math.random())*(Math.round(Math.random())?1:-1),ranNumY=Math.ceil(+Math.random())*(Math.round(Math.random())?1:-1),ranNumX){case 1:directionH="east";break;case-1:directionH="west";break;default:return}switch(ranNumY){case 1:directionV="south";break;case-1:directionV="north";break;default:return}dx=speed*ranNumX,dy=speed*ranNumY}:function(){testing&&console.log("endGame()");gameOn=!1,v(),testing&&console.log("soundGameOver()"),r(207.652,context.currentTime,.116,"square"),r(174.614,context.currentTime+.116,.116,"square"),r(146.832,context.currentTime+.232,.232,"square"),clearInterval(interval),interval="",function(){testing&&console.log("preSaveOrNot()");var e={id:CURRENT_GAME,score:score},e={method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};fetch(GAMES_URL,e).then(e=>e.json()).then(function(){testing&&console.log("saveOrNot()");(0<score?s:A)()}()).catch(e=>console.log(`endGame: ${e}`))}()})()}function v(){!0===gameOn?(colorKeyUpStroke=colorBlack,colorKeyUpFill=colorWhite,colorKeyFontUp=colorBlack):!1===gameOn&&(colorKeyUpStroke=colorLight,colorKeyUpFill=colorWhite,colorKeyFontUp=colorLight)}function A(){testing&&console.log("skip()"),document.location.reload()}o.addEventListener("click",()=>{n("Hire Me!",`
  <p>
  After focusing on User Experience for years, I recently decided
  to get back into programming. In Spring 2021 I completed a
  <a
  class="blue" href="https://flatironschool.com/career-courses/coding-bootcamp/online"
    target="_blank"
    >Software Engineering course at Flatiron School</a
  >
  and this is one of the projects I made.
</p>

<p>
  I've learned a tremendous amount about front-end engineering,
  backend engineering, and the mechanics of web applications. I'm
  looking forward to applying new programming skills and my old UX
  skills to a new job opportunity. This web app was built in
  Rails/React, but I'm eager to learn more programming languages
  going forward.
</p>

<p>
  Wanna know more?
  <a class="blue" href="mailto:msallin@gmail.com">Get in touch!</a>
</p>

<p>-Matty</p>
<p>
  <a class="blue" href="http://www.linkedin.com/in/msallin" target="_blank"
    >LinkedIn</a
  >
  •
  <a class="blue" href="http://www.mathlete.com" target="_blank">Portfolio</a>
</p>
  `,[{label:"Close",onClick:e=>{},triggerClose:!0}])}),testing&&console.log("initializeCanvas()"),w=window.innerWidth,h=window.innerHeight,typeFont=window.innerWidth/100+"px Courier New",canvas.width=w,canvas.height=factor*w,x=canvas.width/2,y=canvas.height/2,keyWidth=w/keySegments,keyHeight=keyWidth,testing&&console.log("renderGameboard()"),m(),i(KEY_ARRAY),c(KEY_ARRAY),testing&&console.log("initializeWindowListener()"),window.addEventListener("resize",u,!1),testing&&console.log("getLeaderboard()"),fetch(GAMES_URL).then(e=>e.json()).then(e=>{!function(e){testing&&console.log("renderLeaderboard()");r(174.614,context.currentTime,.116,"square"),r(195.998,context.currentTime+.116,.116,"square"),r(220,context.currentTime+.232,.232,"square");let o=e.filter(e=>null!==e.player.name),t=document.createElement("h1");t.className="title",t.innerText="Top Scores",o.sort((e,t)=>e.score<t.score?1:-1);let n=document.createElement("ol");for(let t=0;t<function(e,t){return e.length<t?e.length:t}(o,10);t++){let e=document.createElement("li");e.className="list-item";var s,a=o[t];0<o.length&&(s=a.score,a=a.player.name,e.innerText=`${s} points......${a}`),n.append(e)}const i=document.createElement("a");i.setAttribute("id","btn-play"),i.setAttribute("class","playBtn"),i.innerHTML="PLAY",i.addEventListener("click",()=>function(){testing&&console.log("createPlayer()");fetch(PLAYERS_URL,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(e=>e.json()).then(e=>function(e){testing&&console.log("setCurrentPlayer(): obj =",e);CURRENT_PLAYER=e.id,function(e){testing&&console.log("createGame()");leaderboard.innerHTML="";e={player_id:e},e={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};fetch(GAMES_URL,e).then(e=>e.json()).then(e=>function(e){testing&&console.log("setCurrentGame(): obj =",e);CURRENT_GAME=e.id,function(){testing&&console.log("startGame()");gameOn=!0,v(),r(391.995,context.currentTime,.116,"square"),r(391.995,context.currentTime+.116,.116,"square"),r(523.251,context.currentTime+.232,.232,"square"),function(){testing&&console.log("activateKeyListeners()");document.body.addEventListener("keydown",e=>function(e){let t=e.code;preventDefaultKeys[t]&&e.preventDefault();let o=KEY_ARRAY.find(({code:e})=>e===t);return o.s=1,!1}(e)),document.body.addEventListener("keyup",e=>function(e){let t=e.code,o=KEY_ARRAY.find(({code:e})=>e===t);return o.s=0,!1}(e))}(),m(),interval=setInterval(p,10)}()}(e)).catch(e=>console.log(`createGame Failed: ${e}`))}(CURRENT_PLAYER)}(e)).catch(e=>console.log(`createPlayer: ${e}`))}());const c=document.createElement("div");c.setAttribute("class","centerWrapper"),c.append(i),leaderboard.append(t),leaderboard.append(n),leaderboard.append(c)}(e)}),g(),f()});