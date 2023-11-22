const gameContainer = document.getElementById("game-container");
const loadingMessage = document.createElement("p");
loadingMessage.textContent = "Loading games content...";
const centerAlign = document.getElementById("center-text");
const imageElement = document.createElement("img");
const respectiveNote = document.getElementById("respective-note");
var createLinebreak = document.createElement("br");
const flashOpener = document.getElementById("flash-opener");
imageElement.src = "/img/svg/spinners/default.svg";

centerAlign.appendChild(loadingMessage);
loadingMessage.appendChild(createLinebreak);
loadingMessage.appendChild(imageElement);

fetch("/js/json/games.json")
  .then((response) => response.json())
  .then((data) => {
    setTimeout(() => {
      centerAlign.removeChild(loadingMessage);

      const urlParams = new URLSearchParams(window.location.search);

      data.forEach((game) => {
        if (urlParams.has("tags")) {
          const tags = game.tags.split(", ");
          const queryTags = urlParams.get("tags").split(", ");

          const matchingTags = tags.filter((tag) =>
            queryTags.includes(tag.toLowerCase())
          );

          if (matchingTags.length > 0) {
            createGameCard(game, gameContainer);
          }
        } else {
          createGameCard(game, gameContainer);
        }
      });
    }, 0);
  })
  .catch((error) => {
    console.error("Error loading JSON data:", error);
    gameContainer.removeChild(loadingMessage);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Error loading games. Please try again later.";
    gameContainer.appendChild(errorMessage);
  });

function createGameCard(game, container) {
  const gameCard = document.createElement("div");
  gameCard.classList.add("game-card");

  const gameUrl = document.createElement("a");
  gameUrl.href = game.url;
  gameUrl.classList.add("game-url");

  gameCard.style.backgroundImage = `url(${game.imageSrc})`;

  const h3 = document.createElement("h3");
  h3.textContent = game.name;
  gameCard.appendChild(h3);
  gameUrl.appendChild(gameCard);
  container.appendChild(gameUrl);
  gameUrl.addEventListener("click", function (e) {});
  {
    const gameCard = document.querySelectorAll(".game-card");
    const counter = document.getElementById("game-count");
    counter.textContent = gameCard.length + " games";
    counter.onclick = function () {
      alert("Total game count!");
    };
  }
  if (game.hotGame) {
    gameCard.setAttribute("data-label", "hot");
  } else if (game.newGame) {
    gameCard.setAttribute("data-label", "new");
  } else if   (game.christmasGame) {
    gameCard.setAttribute("data-label", "christmas")
  }
  if (game.target === "_blank") {
    gameUrl.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(game.url, "blank");
    });
  }
  if (game.target === "window.open") {
    gameUrl.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(game.url, "_blank", "width=800,height=600");
    });
  }
}
