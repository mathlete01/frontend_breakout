const colorLight="#dfdfdf",colorDark="#808080",colorWhite="#ffffff",colorBlack="#000000",canvas=document.getElementById("myCanvas");var colorKeyUpStroke,colorKeyUpFill,colorKeyFontUp,speed,lives,scoreNote1,scoreNote2,ctx,ballRadius,dx,dy,interval,score,directionV,directionH,gameOn,testing=!1;function resetGlobalVars(){testing&&console.log("resetGlobalVars()"),!(testing=!1)===testing?(console.log("* * * TESTING = TRUE * * * "),lives=speed=1):!1===testing&&(speed=.3,lives=3),colorKeyUpStroke=colorLight,colorKeyUpFill=colorWhite,colorKeyFontUp=colorLight,scoreNote1=493.883,scoreNote2=659.255,ctx=canvas.getContext("2d"),ballRadius=10,dy=-1*(dx=speed),interval="",score=0,directionV="north",gameOn=!(directionH="east")}"http:"==window.location.protocol&&(window.location.href="https://"+window.location.hostname),resetGlobalVars();const BASE_URL="https://evening-hollows-06706.herokuapp.com",PLAYERS_URL=`${BASE_URL}/players`,GAMES_URL=`${BASE_URL}/games`,leaderboard=document.getElementById("leaderboard"),colorKeyDownStroke=colorBlack,colorKeyDownFill=colorBlack,colorKeyFontDown=colorWhite,colorKeyGrayFill=colorDark,colorBallFill=colorBlack,colorBallStroke=colorBlack,strokeThickness=1,livesText=document.getElementById("livesText"),scoreText=document.getElementById("scoreText"),scoreIncrement=1e3,keySegments=15,factor=5/keySegments,AudioContext=window.AudioContext||window.webkitAudioContext,context=new AudioContext,vol=.05,row0=[{name:"`",code:"Backquote",row:0,segments:1,status:0,position:0},{name:"1",code:"Digit1",row:0,segments:1,status:0,position:1},{name:"2",code:"Digit2",row:0,segments:1,status:0,position:2},{name:"3",code:"Digit3",row:0,segments:1,status:0,position:3},{name:"4",code:"Digit4",row:0,segments:1,status:0,position:4},{name:"5",code:"Digit5",row:0,segments:1,status:0,position:5},{name:"6",code:"Digit6",row:0,segments:1,status:0,position:6},{name:"7",code:"Digit7",row:0,segments:1,status:0,position:7},{name:"8",code:"Digit8",row:0,segments:1,status:0,position:8},{name:"9",code:"Digit9",row:0,segments:1,status:0,position:9},{name:"0",code:"Digit0",row:0,segments:1,status:0,position:10},{name:"-",code:"Minus",row:0,segments:1,status:0,position:11},{name:"=",code:"Equal",row:0,segments:1,status:0,position:12},{name:"Backspace",code:"Backspace",row:0,segments:2,status:0,position:13}],row1=[{name:"Tab",code:"Tab",row:1,segments:2,status:0,position:0},{name:"q",code:"KeyQ",row:1,segments:1,status:0,position:2},{name:"w",code:"KeyW",row:1,segments:1,status:0,position:3},{name:"e",code:"KeyE",row:1,segments:1,status:0,position:4},{name:"r",code:"KeyR",row:1,segments:1,status:0,position:5},{name:"t",code:"KeyT",row:1,segments:1,status:0,position:6},{name:"y",code:"KeyY",row:1,segments:1,status:0,position:7},{name:"u",code:"KeyU",row:1,segments:1,status:0,position:8},{name:"i",code:"KeyI",row:1,segments:1,status:0,position:9},{name:"o",code:"KeyO",row:1,segments:1,status:0,position:10},{name:"p",code:"KeyP",row:1,segments:1,status:0,position:11},{name:"[",code:"BracketLeft",row:1,segments:1,status:0,position:12},{name:"]",code:"BracketRight",row:1,segments:1,status:0,position:13},{name:"\\",code:"Backslash",row:1,segments:1,status:0,position:14}],row2=[{name:"CapsLock",code:"CapsLock",row:2,segments:2,status:0,position:0},{name:"a",code:"KeyA",row:2,segments:1,status:0,position:2},{name:"s",code:"KeyS",row:2,segments:1,status:0,position:3},{name:"d",code:"KeyD",row:2,segments:1,status:0,position:4},{name:"f",code:"KeyF",row:2,segments:1,status:0,position:5},{name:"g",code:"KeyG",row:2,segments:1,status:0,position:6},{name:"h",code:"KeyH",row:2,segments:1,status:0,position:7},{name:"j",code:"KeyJ",row:2,segments:1,status:0,position:8},{name:"k",code:"KeyK",row:2,segments:1,status:0,position:9},{name:"l",code:"KeyL",row:2,segments:1,status:0,position:10},{name:":",code:"Semicolon",row:2,segments:1,status:0,position:11},{name:"'",code:"Quote",row:2,segments:1,status:0,position:12},{name:"Enter",code:"Enter",row:2,segments:2,status:0,position:13}],row3=[{name:"Shift",code:"ShiftLeft",row:3,segments:2.5,status:0,position:0},{name:"z",code:"KeyZ",row:3,segments:1,status:0,position:2.5},{name:"x",code:"KeyX",row:3,segments:1,status:0,position:3.5},{name:"c",code:"KeyC",row:3,segments:1,status:0,position:4.5},{name:"v",code:"KeyV",row:3,segments:1,status:0,position:5.5},{name:"b",code:"KeyB",row:3,segments:1,status:0,position:6.5},{name:"n",code:"KeyN",row:3,segments:1,status:0,position:7.5},{name:"m",code:"KeyM",row:3,segments:1,status:0,position:8.5},{name:",",code:"Comma",row:3,segments:1,status:0,position:9.5},{name:".",code:"Period",row:3,segments:1,status:0,position:10.5},{name:"/",code:"Slash",row:3,segments:1,status:0,position:11.5},{name:"Shift",code:"ShiftRight",row:3,segments:2.5,status:0,position:12.5}],row4=[{name:"Function",code:"",row:4,segments:1,status:0,position:0},{name:"Control",code:"ControlLeft",row:4,segments:1,status:0,position:1},{name:"Alt",code:"AltLeft",row:4,segments:1,status:0,position:2},{name:"⌘",code:"MetaLeft",row:4,segments:1.5,status:0,position:3},{name:"Space",code:"Space",row:4,segments:5,status:0,position:4.5},{name:"⌘",code:"MetaRight",row:4,segments:1.5,status:0,position:9.5},{name:"Alt",code:"AltRight",row:4,segments:1,status:0,position:11},{name:"←",code:"ArrowLeft",row:4,segments:1,status:0,position:12},{name:"↑",code:"ArrowUp",row:4,segments:1,status:0,position:13},{name:"↓",code:"ArrowDown",row:4,segments:1,status:0,position:13},{name:"→",code:"ArrowRight",row:4,segments:1,status:0,position:14}],preventDefaultKeys={Tab:!0,Enter:!0};document.addEventListener("DOMContentLoaded",e=>{var o="",n="";Promise.all([fetch("content/about.html").then(e=>e.text()),fetch("content/hireMe.html").then(e=>e.text())]).then(([e,t])=>{o=e,n=t});const t=document.getElementById("aboutNav");t.addEventListener("click",()=>{i("About",o)});const s=document.getElementById("hireMeNav");function r(e,t,o,n){const s=context.createOscillator(),i=context.createOscillator(),a=context.createGain();s.type=n,i.type=n,a.gain.value=vol,s.connect(a),i.connect(a),a.connect(context.destination),s.frequency.value=e+1,i.frequency.value=e-2,a.gain.setValueAtTime(vol,t+o-.05),a.gain.linearRampToValueAtTime(0,t+o),s.start(t),i.start(t),s.stop(t+o),i.stop(t+o)}function l(){switch(directionV){case"north":directionV="south";break;case"south":directionV="north";break;default:return}}function d(){switch(directionH){case"east":directionH="west";break;case"west":directionH="east";break;default:return}}function i(e,t){testing&&console.log("showModal()");const o=document.createElement("div");o.classList.add("modal--"),o.innerHTML=`
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
    `,o.querySelector(".modal--close").addEventListener("click",()=>{testing&&console.log("showModal modal--close"),document.body.removeChild(o)}),document.body.appendChild(o)}function a(){const e=document.createElement("div");e.classList.add("modal--"),e.innerHTML=`
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
    `,e.querySelector(".modal--close").addEventListener("click",()=>{testing&&console.log("showSaveModal: close"),document.body.removeChild(e),S()});const t=document.createElement("button");t.setAttribute("type","button"),t.classList.add("modal--button"),t.textContent="Skip This",t.addEventListener("click",()=>{testing&&console.log("showSaveModal: skip"),document.body.removeChild(e),S()}),e.querySelector(".modal--bottom").appendChild(t);const o=document.createElement("button");o.setAttribute("type","button"),o.classList.add("modal--button"),o.textContent="Save",o.addEventListener("click",()=>{testing&&console.log("showSaveModal: save"),function(e){testing&&console.log(`savePlayer:name = ${e}`);var t={id:CURRENT_PLAYER,name:e},t={method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)};fetch(PLAYERS_URL,t).then(e=>e.json()).then(function(e){testing&&console.log(`updateGame(): git name = ${e}`);e={id:CURRENT_GAME,name:e},e={method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};fetch(GAMES_URL,e).then(e=>e.json()).then(()=>T()).catch(e=>console.log(`updateGame: ${e}`))}(e)).catch(e=>console.log(`savePlayer: ${e}`))}(nameField.value.toUpperCase()),document.body.removeChild(e)}),e.querySelector(".modal--bottom").appendChild(o),document.body.appendChild(e)}function c(){testing&&console.log("getLeaderboard()"),fetch(GAMES_URL).then(e=>e.json()).then(e=>{!function(e){testing&&console.log("renderLeaderboard()");r(174.614,context.currentTime,.116,"square"),r(195.998,context.currentTime+.116,.116,"square"),r(220,context.currentTime+.232,.232,"square");let o=e.filter(e=>null!==e.player.name),t=document.createElement("h1");t.className="title",t.innerText="Top Scores",o.sort((e,t)=>e.score<t.score?1:-1);let n=document.createElement("ol");for(let t=0;t<function(e,t){return e.length<t?e.length:t}(o,10);t++){let e=document.createElement("li");e.className="list-item";var s,i=o[t];0<o.length&&(s=i.score,i=i.player.name,e.innerText=`${s} points......${i}`),n.append(e)}const a=document.createElement("a");a.setAttribute("id","btn-play"),a.setAttribute("class","playBtn"),a.innerHTML="PLAY",a.addEventListener("click",()=>function(){testing&&console.log("createPlayer()");fetch(PLAYERS_URL,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(e=>e.json()).then(e=>function(e){testing&&console.log("setCurrentPlayer(): obj =",e);CURRENT_PLAYER=e.id,function(e){testing&&console.log("createGame()");leaderboard.innerHTML="";e={player_id:e},e={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};fetch(GAMES_URL,e).then(e=>e.json()).then(e=>function(e){testing&&console.log("setCurrentGame(): obj =",e);CURRENT_GAME=e.id,function(){testing&&console.log("startGame()");gameOn=!0,E(),r(391.995,context.currentTime,.116,"square"),r(391.995,context.currentTime+.116,.116,"square"),r(523.251,context.currentTime+.232,.232,"square"),function(){testing&&console.log("activateKeyListeners()");document.body.addEventListener("keydown",e=>function(e){let t=e.code;preventDefaultKeys[t]&&e.preventDefault();let o=KEY_ARRAY.find(({code:e})=>e===t);o&&(o.s=1);return!1}(e)),document.body.addEventListener("keyup",e=>function(e){let t=e.code,o=KEY_ARRAY.find(({code:e})=>e===t);o&&(o.s=0);return!1}(e))}(),m(),interval=setInterval(k,10)}()}(e)).catch(e=>console.log(`createGame Failed: ${e}`))}(CURRENT_PLAYER)}(e)).catch(e=>console.log(`createPlayer: ${e}`))}());const c=document.createElement("div");c.setAttribute("class","centerWrapper"),c.append(a),leaderboard.append(t),leaderboard.append(n),leaderboard.append(c),b(),A()}(e)})}function m(){testing&&console.log("initAllKeys()"),KEY_ARRAY=[],u(row0),u(row1),u(row2),u(row3),u(row4)}function u(t){for(let e=0;e<t.length;e++){var o=t[e].name,n=t[e].code,s=Math.round(t[e].segments*keyWidth),i=keyHeight,a=t[e].position*keyWidth,c=t[e].row*keyHeight,r=t[e].status;KEY_ARRAY.push({name:o,code:n,x:a,y:c,w:s,h:i,s:r})}}function g(t){for(let e=0;e<t.length;e++){var o=t[e];!function(e,t,o,n,s,i){ctx.beginPath(),ctx.rect(o,n,s,i),ctx.strokeStyle=colorKeyUpStroke,ctx.lineWidth=strokeThickness,ctx.stroke(),ctx.closePath(),ctx.fillStyle=colorKeyUpFill,ctx.fill(),ctx.closePath(),ctx.id=t,ctx.font=typeFont,ctx.fillStyle=colorKeyFontUp;e=e.toUpperCase();ctx.textAlign="center",ctx.fillText(e,o+s/2,n+i/2+4)}(o.name,o.code,o.x,o.y,o.w,o.h)}}function p(t){for(let e=0;e<t.length;e++){var o=t[e];1==o.s&&function(e,t,o,n,s,i){ctx.beginPath(),ctx.rect(o,n,s,i),ctx.strokeStyle=colorKeyDownStroke,ctx.lineWidth=strokeThickness,ctx.stroke(),ctx.closePath(),ctx.fillStyle=colorKeyDownFill,ctx.fill(),ctx.closePath(),ctx.id=t,ctx.font=typeFont,ctx.fillStyle=colorKeyFontDown;e=e.toUpperCase();ctx.textAlign="center",ctx.fillText(e,o+s/2,n+i/2+4)}(o.name,o.code,o.x,o.y,o.w,o.h)}}function f(){testing&&console.log("initializeCanvas()"),w=window.innerWidth,h=window.innerHeight,typeFont=window.innerWidth/100+"px Courier New",canvas.width=w,canvas.height=factor*w,x=canvas.width/2,y=canvas.height/2,keyWidth=w/keySegments,keyHeight=keyWidth,testing&&console.log("renderGameboard()"),m(),g(KEY_ARRAY),p(KEY_ARRAY),c()}function v(){w=window.innerWidth,h=window.innerHeight,typeFont=window.innerWidth/100+"px Courier New",canvas.width=w,canvas.height=factor*w,x=canvas.width/2,y=canvas.height/2,keyWidth=w/keySegments,keyHeight=keyWidth,m(),g(KEY_ARRAY),p(KEY_ARRAY)}function k(){ctx.clearRect(0,0,canvas.width,canvas.height),ctx.lineWidth=strokeThickness,ctx.strokeStyle=colorKeyUpStroke,ctx.strokeRect(0,0,canvas.width,canvas.height),g(KEY_ARRAY),p(KEY_ARRAY),b(),A(),function(t){for(let e=0;e<t.length;e++){var o=t[e],n=Math.round(o.x),s=Math.round(o.x+o.w),i=Math.round(o.y),a=Math.round(o.y+o.h),c=ballRadius;1==o.s&&(y>i+c&&y<a-c&&x>n+c&&x<s-c&&(o.s,function(e,t,o,n,s,i){ctx.beginPath(),ctx.rect(o,n,s,i),ctx.strokeStyle=colorKeyDownStroke,ctx.lineWidth=strokeThickness,ctx.stroke(),ctx.closePath(),ctx.fillStyle=colorKeyGrayFill,ctx.fill(),ctx.closePath(),ctx.id=t,ctx.font=typeFont,ctx.fillStyle=colorKeyFontDown;e=e.toUpperCase();ctx.textAlign="center",ctx.fillText(e,o+s/2,n+i/2+4)}(o.name,o.code,o.x,o.y,o.w,o.h)),y>i-c&&y<a+c&&(x>n-c&&x<n+c&&"east"===directionH&&(dx=-dx,d(),R()),x>s-c&&x<s+c&&"west"===directionH&&(dx=-dx,d(),R())),x>n-c&&x<s+c&&(y>i-c&&y<i+c&&"south"===directionV&&(dy=-dy,l(),R()),y>a-c&&y<a+c&&"north"===directionV&&(dy=-dy,l(),R())))}}(KEY_ARRAY),ctx.beginPath(),ctx.arc(x,y,ballRadius,0,2*Math.PI),ctx.fillStyle=colorBallFill,ctx.fill(),ctx.closePath(),ctx.strokeStyle=colorBallStroke,ctx.stroke(),ctx.closePath(),lives<1&&K(),(x+dx>canvas.width-ballRadius||x+dx<ballRadius)&&K(),(y+dy>canvas.height-ballRadius||y+dy<ballRadius)&&K(),x+=dx,y+=dy}function b(){scoreText.innerText="Score: "+score}function A(){livesText.innerText="Lives: "+lives}function R(){!function(e){for(key of e)key.s=0}(KEY_ARRAY),r(scoreNote1,context.currentTime,.116,"square"),r(scoreNote2,context.currentTime+.116,.232,"square"),score+=scoreIncrement,scoreNote1+=10,scoreNote2+=10,dx*=1.3}function K(){testing&&console.log("fail()"),lives--,r(82.407,context.currentTime,.116,"square"),r(77.782,context.currentTime+.116,.116,"square"),r(69.296,context.currentTime+.232,.232,"square"),(lives?function(){testing&&console.log("initNextPlay()");switch(scoreNote1=493.883,scoreNote2=659.255,x=canvas.width/2,y=canvas.height/2,ranNumX=Math.ceil(+Math.random())*(Math.round(Math.random())?1:-1),ranNumY=Math.ceil(+Math.random())*(Math.round(Math.random())?1:-1),ranNumX){case 1:directionH="east";break;case-1:directionH="west";break;default:return}switch(ranNumY){case 1:directionV="south";break;case-1:directionV="north";break;default:return}dx=speed*ranNumX,dy=speed*ranNumY}:function(){testing&&console.log("endGame()");gameOn=!1,E(),testing&&console.log("soundGameOver()"),r(207.652,context.currentTime,.116,"square"),r(174.614,context.currentTime+.116,.116,"square"),r(146.832,context.currentTime+.232,.232,"square"),clearInterval(interval),interval="",function(){testing&&console.log("preSaveOrNot()");var e={id:CURRENT_GAME,score:score},e={method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};fetch(GAMES_URL,e).then(e=>e.json()).then(function(){testing&&console.log("saveOrNot()");(0<score?a:S)()}()).catch(e=>console.log(`endGame: ${e}`))}()})()}function E(){!0===gameOn?(colorKeyUpStroke=colorBlack,colorKeyUpFill=colorWhite,colorKeyFontUp=colorBlack):!1===gameOn&&(colorKeyUpStroke=colorLight,colorKeyUpFill=colorWhite,colorKeyFontUp=colorLight)}function S(){testing&&console.log("skip()"),T()}function T(){testing&&console.log("reloadGame()"),resetGlobalVars(),f(),leaderboard.innerHTML=""}s.addEventListener("click",()=>{i("Hire Me!",n)}),testing&&console.log("initializeWindowListener()"),window.addEventListener("resize",v,!1),f()});