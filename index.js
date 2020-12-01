document.addEventListener("DOMContentLoaded", (event) => {

    const input = document.querySelector('input');
    const log = document.getElementById('log');
    const w = window.innerWidth;
    const h = window.innerHeight;
    const browser = navigator.appName
    const platform = navigator.platform
    const browser = document.getElementById("browser")
    const platform = document.getElementById("platform")


    let width = document.getElementById("window-width")
    let height = document.getElementById("window-height")
    width.innerText += w
    height.innerText += h
    browser.innerText += browser
    platform.innerText += platform
    
    input.addEventListener('keydown', logKey);
    
    function logKey(e) {
      log.textContent += ` ${e.code}`;
    }
});
