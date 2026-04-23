const games = {
    doodlejump: {
        title: "Doodle Jump",
        url: "./code/doodlejump/index.html"
    },
    trexrunner: {
        title: "T-rex Run",
        url: "./code/trexrunner/index.html"
    },
    flappybird: {
        title: "Flappy Bird",
        url: "./code/flappybird/index.html"
    },
    "2048": {
        title: "2048",
        url: "./code/2048/index.html"
    }
};

window.addEventListener("load", () => {
    const menuScreen = document.getElementById("menuScreen");
    const playerScreen = document.getElementById("playerScreen");
    const frame = document.getElementById("gameFrame");
    const title = document.getElementById("gameTitle");
    const playButton = document.getElementById("playButton");
    const gamesSheet = document.getElementById("gamesSheet");
    const backButton = document.getElementById("backButton");
    const gameButtons = [...document.querySelectorAll(".game-option")];

    let selectedGameId = "doodlejump";

    function selectGame(gameId) {
        const game = games[gameId];
        if (!game) {
            return;
        }

        selectedGameId = gameId;

        for (const button of gameButtons) {
            button.classList.toggle("is-selected", button.dataset.game === gameId);
        }
    }

    function openGame(gameId = selectedGameId) {
        const game = games[gameId];
        if (!game) {
            return;
        }

        title.textContent = game.title;
        frame.src = game.url;
        menuScreen.classList.add("is-hidden");
        playerScreen.classList.remove("is-hidden");
    }

    function toggleGamesSheet(forceOpen) {
        if (!gamesSheet) {
            return;
        }

        const shouldOpen = typeof forceOpen === "boolean"
            ? forceOpen
            : gamesSheet.classList.contains("is-collapsed");

        gamesSheet.classList.toggle("is-collapsed", !shouldOpen);
        playButton.setAttribute("aria-expanded", String(shouldOpen));
    }

    function closeGame() {
        frame.src = games[selectedGameId].url;
        playerScreen.classList.add("is-hidden");
        menuScreen.classList.remove("is-hidden");
    }

    window.addEventListener("message", (event) => {
        if (event.data && event.data.type === "mtbank:close-game") {
            closeGame();
        }
    });

    for (const button of gameButtons) {
        button.addEventListener("click", () => {
            selectGame(button.dataset.game);
            openGame(button.dataset.game);
        });
    }

    playButton.addEventListener("click", () => {
        toggleGamesSheet();
    });

    backButton.addEventListener("click", () => {
        closeGame();
    });

    selectGame(selectedGameId);
    toggleGamesSheet(false);
});
