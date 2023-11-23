let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let increaseAmount = 50;
let perLevel = 150;

function levelUp() {
  xp += increaseAmount;

  if (xp >= perLevel) {
    level++;
    xp -= perLevel;
    perLevel += 0;
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);

    document.getElementById("progress-bar").style.width = "100%";

    setTimeout(() => {
      document.getElementById("progress-bar").style.width = "0%";
    }, 2500);
  } else {
    const progressBar = document.getElementById("progress-bar");
    const progress = (xp / perLevel) * 100;
    progressBar.style.width = `${progress}%`;
  }

  document.getElementById("level").textContent = level;
  document.getElementById("xp").textContent = xp;
}

document.getElementById("level").textContent = level;
document.getElementById("xp").textContent = xp;

function startLevels() {
  setInterval(levelUp, 10000);
}

startLevels();
