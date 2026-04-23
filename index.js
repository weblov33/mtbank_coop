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

const rewardsCatalog = [
    { title: "Кэшбэк 5%", subtitle: "на покупки", cost: 20, minLevel: 1, tone: "blue", icon: "bag" },
    { title: "Кофе в подарок", subtitle: "от партнёров", cost: 15, minLevel: 1, tone: "green", icon: "cup" },
    { title: "Месяц связи", subtitle: "бесплатно", cost: 25, minLevel: 1, tone: "violet", icon: "phone" },
    { title: "Сюрприз", subtitle: "рандомный приз", cost: 30, minLevel: 1, tone: "gold", icon: "gift" },
    { title: "Скидка 15%", subtitle: "на электронику", minLevel: 10, tone: "soft-blue", icon: "headphones" },
    { title: "Билет в кино", subtitle: "от партнёров", minLevel: 12, tone: "soft-peach", icon: "ticket" },
    { title: "Кэшбэк 10%", subtitle: "на путешествия", minLevel: 15, tone: "soft-aqua", icon: "suitcase" },
    { title: "Бонусы", subtitle: "в игры и сервисы", minLevel: 18, tone: "soft-pink", icon: "gamepad" }
];

window.addEventListener("load", () => {
    const DEMO_SLEEP_START = true;
    const RESTORE_STORAGE_KEY = "mtbank-home-last-restore";
    const RESTORE_COOLDOWN_DAYS = 30;
    const menuScreen = document.getElementById("menuScreen");
    const playerScreen = document.getElementById("playerScreen");
    const frame = document.getElementById("gameFrame");
    const title = document.getElementById("gameTitle");
    const giftPillButton = document.getElementById("giftPillButton");
    const seriesValue = document.getElementById("seriesValue");
    const giftLevelsLeft = document.getElementById("giftLevelsLeft");
    const giftLevelsWord = document.getElementById("giftLevelsWord");
    const rewardsScreen = document.getElementById("rewardsScreen");
    const rewardsCloseButton = document.getElementById("rewardsCloseButton");
    const rewardsBalance = document.getElementById("rewardsBalance");
    const availableRewards = document.getElementById("availableRewards");
    const lockedRewards = document.getElementById("lockedRewards");
    const activityValue = document.getElementById("activityValue");
    const activityFill = document.getElementById("activityFill");
    const activityCard = document.querySelector(".activity-card");
    const activityInfoButton = document.getElementById("activityInfoButton");
    const activityPopover = document.getElementById("activityPopover");
    const heroMascot = document.getElementById("heroMascot");
    const heroCharacter = document.getElementById("heroCharacter");
    const recoveryCard = document.getElementById("recoveryCard");
    const restoreButton = document.getElementById("restoreButton");
    const restartProgressButton = document.getElementById("restartProgressButton");
    const demoBanner = document.getElementById("demoBanner");
    const demoBannerText = document.getElementById("demoBannerText");
    const demoBannerClose = document.getElementById("demoBannerClose");
    const playButton = document.getElementById("playButton");
    const shareButton = document.getElementById("shareButton");
    const gamesSheet = document.getElementById("gamesSheet");
    const backButton = document.getElementById("backButton");
    const gameButtons = [...document.querySelectorAll(".game-option")];
    const navButtons = [...document.querySelectorAll(".bottom-nav__item")];

    let selectedGameId = "doodlejump";
    let homeStats = null;

    function getRewardIcon(iconName) {
        const icons = {
            bag: '<svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3190ff"/><stop offset="100%" stop-color="#1b5fe6"/></linearGradient></defs><path fill="url(#bagGrad)" d="M18 22h28a6 6 0 0 1 6 6v22a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V28a6 6 0 0 1 6-6Z"/><path fill="#7fb7ff" d="M23 24v-4a9 9 0 0 1 18 0v4h-4v-3a5 5 0 0 0-10 0v3Z"/></svg>',
            cup: '<svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#68c33d"/><stop offset="100%" stop-color="#2f8f16"/></linearGradient></defs><path fill="url(#cupGrad)" d="M14 22h34v7a17 17 0 0 1-17 17h0A17 17 0 0 1 14 29v-7Z"/><path fill="#84da63" d="M11 20a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v2H11v-2Z"/><path fill="#d4f0c8" d="M20 50h22v4H20z"/></svg>',
            phone: '<svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c6a3ff"/><stop offset="100%" stop-color="#9b71f1"/></linearGradient></defs><rect x="18" y="8" width="28" height="48" rx="8" fill="url(#phoneGrad)"/><circle cx="32" cy="16" r="2.4" fill="#9d7df3"/><circle cx="32" cy="46" r="4" fill="#f8f1ff"/></svg>',
            gift: '<svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="giftGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffd24f"/><stop offset="100%" stop-color="#f6ae00"/></linearGradient></defs><path fill="url(#giftGrad)" d="M12 28h40v24a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V28Z"/><path fill="#ffeb9d" d="M10 20a6 6 0 0 1 6-6h32a6 6 0 0 1 6 6v8H10v-8Z"/><path fill="#f7b300" d="M29 14h6v46h-6z"/><path fill="#f7b300" d="M10 29h44v6H10z"/></svg>',
            headphones: '<svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#99c1ff"/><stop offset="100%" stop-color="#6a9df8"/></linearGradient></defs><path fill="url(#headGrad)" d="M32 14a18 18 0 0 0-18 18v15h7V32a11 11 0 1 1 22 0v15h7V32a18 18 0 0 0-18-18Z"/><rect x="12" y="36" width="10" height="16" rx="5" fill="#7faeff"/><rect x="42" y="36" width="10" height="16" rx="5" fill="#7faeff"/></svg>',
            ticket: '<svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="ticketGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffa373"/><stop offset="100%" stop-color="#ff7547"/></linearGradient></defs><path fill="url(#ticketGrad)" d="M14 20a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4c0 3.3 2.7 6 6 6v12c-3.3 0-6 2.7-6 6a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4c0-3.3-2.7-6-6-6V26c3.3 0 6-2.7 6-6Z"/><circle cx="26" cy="32" r="5" fill="#ffd7c8"/><path fill="#ffd7c8" d="M36 25h8v3h-8zm0 6h8v3h-8zm0 6h8v3h-8z"/></svg>',
            suitcase: '<svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#73d8da"/><stop offset="100%" stop-color="#42b8c7"/></linearGradient></defs><rect x="12" y="20" width="40" height="32" rx="8" fill="url(#suitGrad)"/><path fill="#86e7e9" d="M24 16a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4h-4v-3h-8v3h-4z"/><path fill="#49bfca" d="M30 20h4v32h-4z"/></svg>',
            gamepad: '<svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="padGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffa4d6"/><stop offset="100%" stop-color="#ff75bc"/></linearGradient></defs><path fill="url(#padGrad)" d="M20 22h24a12 12 0 0 1 11.6 15l-3 11.2a7 7 0 0 1-11.4 3.3l-5.4-4.6h-7.6l-5.4 4.6a7 7 0 0 1-11.4-3.3l-3-11.2A12 12 0 0 1 20 22Z"/><path fill="#fff1f8" d="M22 32h4v-4h4v4h4v4h-4v4h-4v-4h-4zm18-1a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm8-4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg>'
        };

        return icons[iconName] || icons.gift;
    }

    function createRewardCard(reward, isLocked = false) {
        const article = document.createElement("article");
        article.className = `reward-card reward-card--${reward.tone}${isLocked ? " is-locked" : ""}`;
        article.innerHTML = `
            <div class="reward-card__top">
                <span class="reward-card__sparkle" aria-hidden="true">✦</span>
                ${isLocked ? '<span class="reward-card__lock" aria-hidden="true">🔒</span>' : '<span></span>'}
            </div>
            <div class="reward-card__icon" aria-hidden="true">${getRewardIcon(reward.icon)}</div>
            <div class="reward-card__copy">
                <h3 class="reward-card__title">${reward.title}</h3>
                <p class="reward-card__subtitle">${reward.subtitle}</p>
            </div>
            <div class="reward-card__meta">
                ${isLocked
                    ? `Нужен <strong>${reward.minLevel}</strong> уровень`
                    : `<img src="./assets_home/молния.svg" alt=""><span>${reward.cost}</span>`}
            </div>
        `;
        return article;
    }

    function renderRewards(level, activity) {
        if (!availableRewards || !lockedRewards) {
            return;
        }

        availableRewards.innerHTML = "";
        lockedRewards.innerHTML = "";

        for (const reward of rewardsCatalog) {
            const isLocked = reward.minLevel > Math.max(level, 1);
            const shouldBeLockedSection = reward.minLevel > 1;
            const target = shouldBeLockedSection ? lockedRewards : availableRewards;
            target.append(createRewardCard(reward, shouldBeLockedSection));
        }

        if (rewardsBalance) {
            rewardsBalance.textContent = String(activity);
        }
    }

    function toggleRewardsScreen(forceOpen) {
        if (!rewardsScreen) {
            return;
        }

        const shouldOpen = typeof forceOpen === "boolean"
            ? forceOpen
            : rewardsScreen.classList.contains("is-hidden");

        rewardsScreen.classList.toggle("is-hidden", !shouldOpen);
        setActiveNav(shouldOpen ? "rewards" : "home");
        if (shouldOpen) {
            toggleGamesSheet(false);
            toggleActivityPopover(false);
        }
    }

    function setActiveNav(navId) {
        for (const button of navButtons) {
            const isActive = button.dataset.nav === navId;
            button.classList.toggle("is-active", isActive);
            button.toggleAttribute("aria-current", isActive);
        }
    }

    function handleNavClick(navId) {
        if (navId === "rewards") {
            toggleRewardsScreen(true);
            return;
        }

        if (navId === "home") {
            toggleRewardsScreen(false);
            return;
        }

        if (rewardsScreen) {
            rewardsScreen.classList.add("is-hidden");
        }

        setActiveNav(navId);
    }

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

    function getRussianLevelWord(value) {
        const lastTwoDigits = value % 100;
        const lastDigit = value % 10;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return "уровней";
        }

        if (lastDigit === 1) {
            return "уровень";
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return "уровня";
        }

        return "уровней";
    }

    function isRestoreAvailable() {
        if (DEMO_SLEEP_START) {
            return true;
        }

        const lastRestore = Number(window.localStorage.getItem(RESTORE_STORAGE_KEY) || 0);
        const cooldownMs = RESTORE_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
        return !lastRestore || Date.now() - lastRestore >= cooldownMs;
    }

    function setDemoBanner(level, activity) {
        if (!demoBanner || !demoBannerText) {
            return;
        }

        if (typeof level === "number" && typeof activity === "number") {
            demoBannerText.textContent = `Для демонстрации вы получили ${level} ${getRussianLevelWord(level)} и ${activity} молний активности.`;
            demoBanner.classList.remove("is-hidden");
            return;
        }

        demoBanner.classList.add("is-hidden");
    }

    function updateRecoveryState(level, activity) {
        const isEmpty = activity === 0;
        const canShareSleepState = isEmpty && level > 0;

        if (recoveryCard) {
            recoveryCard.classList.toggle("is-hidden", !isEmpty);
        }

        if (activityCard) {
            activityCard.classList.toggle("is-hidden", isEmpty);
        }

        if (activityPopover && isEmpty) {
            activityPopover.classList.add("is-hidden");
        }

        if (playButton) {
            playButton.classList.toggle("is-hidden", isEmpty);
        }

        if (shareButton) {
            shareButton.classList.toggle("is-hidden", !canShareSleepState);
        }

        if (isEmpty) {
            toggleGamesSheet(false);
        }

        if (restoreButton) {
            const canRestore = isEmpty && isRestoreAvailable();
            restoreButton.disabled = !canRestore;
            restoreButton.textContent = canRestore ? "Оживить" : "Восстановление позже";
        }
    }

    async function shareHomeState() {
        const shareData = {
            title: "MT Bank Games",
            text: "Мой Мобик уснул. Помоги вернуть активность и сохранить серию.",
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                if (shareButton) {
                    const originalText = shareButton.lastElementChild ? shareButton.lastElementChild.textContent : "Поделиться";
                    if (shareButton.lastElementChild) {
                        shareButton.lastElementChild.textContent = "Ссылка скопирована";
                        window.setTimeout(() => {
                            shareButton.lastElementChild.textContent = originalText;
                        }, 1800);
                    }
                }
            }
        } catch (error) {
            console.error("Share failed", error);
        }
    }

    function applyHomeStats(level, activity) {
        const levelsLeft = ((Math.ceil(level / 5) * 5) + 5) - level;
        let mascotSrc = "./mascot/SVG/базовый прямой.svg";
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

        if (giftLevelsWord) {
            const visibleLevelsLeft = Math.max(1, Math.min(levelsLeft, 9));
            giftLevelsWord.textContent = getRussianLevelWord(visibleLevelsLeft);
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
        renderRewards(level, activity);
        updateRecoveryState(level, activity);
    }

    function updateHomeStats() {
        const level = DEMO_SLEEP_START ? 0 : getRandomInt(1, 99);
        const activity = DEMO_SLEEP_START ? 0 : getRandomInt(0, 100);
        homeStats = { level, activity };
        setDemoBanner();
        applyHomeStats(level, activity);
    }

    function restoreEnergy() {
        if (!homeStats || homeStats.activity !== 0 || !isRestoreAvailable()) {
            return;
        }

        if (!DEMO_SLEEP_START) {
            window.localStorage.setItem(RESTORE_STORAGE_KEY, String(Date.now()));
        }

        homeStats.level = getRandomInt(1, 99);
        homeStats.activity = getRandomInt(10, 100);
        setDemoBanner(homeStats.level, homeStats.activity);
        applyHomeStats(homeStats.level, homeStats.activity);
    }

    function restartProgress() {
        homeStats = { level: 0, activity: 100 };
        setDemoBanner();
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

    for (const button of navButtons) {
        button.addEventListener("click", () => {
            handleNavClick(button.dataset.nav);
        });
    }

    playButton.addEventListener("click", () => {
        toggleActivityPopover(false);
        toggleGamesSheet();
    });

    if (shareButton) {
        shareButton.addEventListener("click", () => {
            toggleActivityPopover(false);
            shareHomeState();
        });
    }

    if (activityInfoButton) {
        activityInfoButton.addEventListener("click", () => {
            toggleActivityPopover();
        });
    }

    if (giftPillButton) {
        giftPillButton.addEventListener("click", () => {
            toggleRewardsScreen(true);
        });
    }

    if (rewardsCloseButton) {
        rewardsCloseButton.addEventListener("click", () => {
            toggleRewardsScreen(false);
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

    if (demoBannerClose) {
        demoBannerClose.addEventListener("click", () => {
            setDemoBanner();
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
    toggleRewardsScreen(false);
    updateHomeStats();
});
