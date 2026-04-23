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
    const RESTORE_STORAGE_KEY = "mtbank-home-last-restore";
    const RESTORE_COOLDOWN_DAYS = 30;
    const menuScreen = document.getElementById("menuScreen");
    const playerScreen = document.getElementById("playerScreen");
    const frame = document.getElementById("gameFrame");
    const title = document.getElementById("gameTitle");
    const seriesValue = document.getElementById("seriesValue");
    const giftLevelsLeft = document.getElementById("giftLevelsLeft");
    const activityValue = document.getElementById("activityValue");
    const activityFill = document.getElementById("activityFill");
    const activityInfoButton = document.getElementById("activityInfoButton");
    const activityPopover = document.getElementById("activityPopover");
    const heroMascot = document.getElementById("heroMascot");
    const heroCharacter = document.getElementById("heroCharacter");
    const recoveryCard = document.getElementById("recoveryCard");
    const restoreButton = document.getElementById("restoreButton");
    const restartProgressButton = document.getElementById("restartProgressButton");
    const playButton = document.getElementById("playButton");
    const gamesSheet = document.getElementById("gamesSheet");
    const backButton = document.getElementById("backButton");
    const gameButtons = [...document.querySelectorAll(".game-option")];

    let selectedGameId = "doodlejump";
    let homeStats = null;

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

    function toggleActivityPopover(forceOpen) {
        if (!activityPopover) {
            return;
        }

        const shouldOpen = typeof forceOpen === "boolean"
            ? forceOpen
            : activityPopover.classList.contains("is-hidden");

        activityPopover.classList.toggle("is-hidden", !shouldOpen);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function isRestoreAvailable() {
        const lastRestore = Number(window.localStorage.getItem(RESTORE_STORAGE_KEY) || 0);
        const cooldownMs = RESTORE_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
        return !lastRestore || Date.now() - lastRestore >= cooldownMs;
    }

    function updateRecoveryState(activity) {
        const isEmpty = activity === 0;

        if (recoveryCard) {
            recoveryCard.classList.toggle("is-hidden", !isEmpty);
        }

        if (restoreButton) {
            const canRestore = isEmpty && isRestoreAvailable();
            restoreButton.disabled = !canRestore;
            restoreButton.textContent = canRestore ? "Восстановиться" : "Восстановление позже";
        }
    }

    function applyHomeStats(level, activity) {
        const levelsLeft = ((Math.ceil(level / 5) * 5) + 5) - level;
        let mascotSrc = "./mascot/SVG/базовый прямой.svg";
        let stateColor = "#2c79ff";
        let mascotState = "base";
        let fireFilter = "none";
        let fireGlow = "0 0 0 rgba(0, 0, 0, 0)";
        let fireScale = "1";

        if (activity === 0) {
            mascotSrc = "./mascot/SVG/сон.svg";
            stateColor = "#8f9ab8";
            mascotState = "sleep";
        } else if (activity <= 25) {
            mascotSrc = "./mascot/SVG/злость.svg";
            stateColor = "#ff5a7a";
            mascotState = "angry";
        } else if (activity <= 60) {
            mascotSrc = "./mascot/SVG/удивление.svg";
            stateColor = "#7f63ff";
            mascotState = "surprise";
        }

        if (level === 1) {
            fireFilter = "grayscale(1) brightness(1.08) contrast(0.9)";
            fireGlow = "0 0 3px rgba(156, 166, 190, 0.2)";
        } else if (level <= 4) {
            fireFilter = "hue-rotate(82deg) saturate(1.7) brightness(1.18)";
            fireGlow = "0 0 4px rgba(255, 220, 120, 0.24)";
        } else if (level <= 9) {
            fireFilter = "hue-rotate(70deg) saturate(2.1) brightness(1.22)";
            fireGlow = "0 0 5px rgba(255, 212, 72, 0.3)";
        } else if (level <= 14) {
            fireFilter = "hue-rotate(42deg) saturate(2.2) brightness(1.12)";
            fireGlow = "0 0 6px rgba(255, 154, 51, 0.34)";
        } else if (level <= 19) {
            fireFilter = "hue-rotate(30deg) saturate(2.35) brightness(1.1)";
            fireGlow = "0 0 8px rgba(255, 138, 36, 0.38)";
        } else if (level <= 29) {
            fireFilter = "hue-rotate(16deg) saturate(2.45) brightness(1.02)";
            fireGlow = "0 0 9px rgba(255, 103, 52, 0.4)";
        } else if (level <= 39) {
            fireFilter = "hue-rotate(98deg) saturate(2.2) brightness(1.2)";
            fireGlow = "0 0 10px rgba(255, 201, 74, 0.42)";
            fireScale = "1.03";
        } else if (level <= 49) {
            fireFilter = "hue-rotate(94deg) saturate(2.45) brightness(1.24)";
            fireGlow = "0 0 12px rgba(255, 211, 89, 0.48)";
            fireScale = "1.04";
        } else if (level <= 59) {
            fireFilter = "hue-rotate(90deg) saturate(2.55) brightness(1.18)";
            fireGlow = "0 0 13px rgba(255, 202, 94, 0.52)";
            fireScale = "1.05";
        } else if (level <= 69) {
            fireFilter = "hue-rotate(84deg) saturate(2.6) brightness(1.16)";
            fireGlow = "0 0 14px rgba(255, 190, 76, 0.56)";
            fireScale = "1.06";
        } else if (level <= 79) {
            fireFilter = "hue-rotate(76deg) saturate(2.72) brightness(1.13)";
            fireGlow = "0 0 15px rgba(255, 166, 72, 0.58)";
            fireScale = "1.07";
        } else if (level <= 89) {
            fireFilter = "hue-rotate(64deg) saturate(2.82) brightness(1.08)";
            fireGlow = "0 0 16px rgba(255, 142, 68, 0.6)";
            fireScale = "1.08";
        } else {
            fireFilter = "hue-rotate(54deg) saturate(2.9) brightness(1.06)";
            fireGlow = "0 0 18px rgba(255, 109, 58, 0.66)";
            fireScale = "1.1";
        }

        if (seriesValue) {
            seriesValue.textContent = String(level);
        }

        if (giftLevelsLeft) {
            giftLevelsLeft.textContent = String(Math.max(1, Math.min(levelsLeft, 9)));
        }

        if (activityValue) {
            activityValue.textContent = String(activity);
        }

        if (activityFill) {
            activityFill.style.width = `${activity}%`;
        }

        if (heroMascot) {
            heroMascot.src = mascotSrc;
        }

        if (heroCharacter) {
            heroCharacter.dataset.mascotState = mascotState;
        }

        document.documentElement.style.setProperty("--state-color", stateColor);
        document.documentElement.style.setProperty("--fire-filter", fireFilter);
        document.documentElement.style.setProperty("--fire-glow", fireGlow);
        document.documentElement.style.setProperty("--fire-scale", fireScale);
        updateRecoveryState(activity);
    }

    function updateHomeStats() {
        const level = getRandomInt(1, 99);
        const activity = 0;
        homeStats = { level, activity };
        applyHomeStats(level, activity);
    }

    function restoreEnergy() {
        if (!homeStats || homeStats.activity !== 0 || !isRestoreAvailable()) {
            return;
        }

        window.localStorage.setItem(RESTORE_STORAGE_KEY, String(Date.now()));
        homeStats.activity = 35;
        applyHomeStats(homeStats.level, homeStats.activity);
    }

    function restartProgress() {
        homeStats = { level: 0, activity: 100 };
        applyHomeStats(homeStats.level, homeStats.activity);
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
        toggleActivityPopover(false);
        toggleGamesSheet();
    });

    if (activityInfoButton) {
        activityInfoButton.addEventListener("click", () => {
            toggleActivityPopover();
        });
    }

    if (restoreButton) {
        restoreButton.addEventListener("click", () => {
            restoreEnergy();
        });
    }

    if (restartProgressButton) {
        restartProgressButton.addEventListener("click", () => {
            restartProgress();
        });
    }

    backButton.addEventListener("click", () => {
        closeGame();
    });

    document.addEventListener("click", (event) => {
        if (!activityPopover || !activityInfoButton) {
            return;
        }

        const clickedInfo = activityInfoButton.contains(event.target);
        const clickedPopover = activityPopover.contains(event.target);

        if (!clickedInfo && !clickedPopover) {
            toggleActivityPopover(false);
        }
    });

    selectGame(selectedGameId);
    toggleGamesSheet(false);
    toggleActivityPopover(false);
    updateHomeStats();
});
