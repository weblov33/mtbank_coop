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

const battlePassRewards = [
    { level: 5, emoji: "🌱", title: "Новичок", reward: "Промокод Cofix: Американо за 1 BYN" },
    { level: 10, emoji: "🌿", title: "Любитель", reward: "Комбо KFC: Чизбургер + Картошка фри + Напиток" },
    { level: 15, emoji: "🍀", title: "Знаток", reward: "Скидка 15% на Яндекс Маркет" },
    { level: 20, emoji: "⭐", title: "Профи", reward: "Промокод Золотое Яблоко: -15%" },
    { level: 25, emoji: "💫", title: "Ветеран", reward: "Мерч: Стикерпак + Носки с Мобиком" },
    { level: 30, emoji: "✨", title: "Элита", reward: "Промокод Wildberries: -15%" },
    { level: 35, emoji: "🔥", title: "Мастер", reward: "Яндекс Go: 3 бесплатные поездки" },
    { level: 40, emoji: "💎", title: "Гуру", reward: "Мерч: Футболка с Мобиком" },
    { level: 45, emoji: "👑", title: "Император", reward: "Подписка Яндекс Плюс (1 месяц)" },
    { level: 50, emoji: "🏆", title: "Легенда", reward: "Именная карта + кешбэк 7%" },
    { level: 55, emoji: "🌙", title: "Мастер стихий", reward: "Купон Cofix 30 BYN" },
    { level: 60, emoji: "⚡", title: "Титан", reward: "Скидка 40 BYN в Золотом Яблоке" },
    { level: 65, emoji: "❄️", title: "Хранитель", reward: "Кешбэк 90% на Яндекс Go" },
    { level: 70, emoji: "🧙", title: "Властелин", reward: "Мерч: Худи с Мобиком" },
    { level: 75, emoji: "☀️", title: "Повелитель", reward: "Wildberries 60 BYN" },
    { level: 80, emoji: "🎮", title: "Бог Мобиков", reward: "Яндекс Плюс (3 месяца)" },
    { level: 85, emoji: "🐉", title: "Дракон", reward: "Сертификат KFC 60 BYN" },
    { level: 90, emoji: "🌌", title: "Создатель", reward: "Скидка 80 BYN" },
    { level: 95, emoji: "🧪", title: "Абсолют", reward: "Кешбэк 10% на 14 дней" },
    { level: 99, emoji: "👾", title: "МАКСИМУМ", reward: "🎁 Гранд-приз: мерч-бокс + карта + KFC 100 BYN" }
];

const tasksCatalog = [
    { icon: "👥", title: "Пригласи друга в приложение", reward: 50, progress: "0 / 1" },
    { icon: "Pay", title: "Привяжи карту к Apple Pay или Google Pay", reward: 20 },
    { icon: "💳", title: "Оформи карту Шоппер, Халва или Кактус", reward: 30 },
    { icon: "⭐", title: "Оформи подписку", note: "например, Семейная в Халве", reward: 30 },
    { icon: "🧊", title: "Подключи пакет услуг", note: "Минимум, Оптимум, Максимум, Медиум", reward: 20 },
    { icon: "🛍", title: "Соверши покупки по картам МТБанка", reward: 15, progress: "0 / 5 покупок" },
    { icon: "💙", title: "Сделай пожертвование", note: "благотворительность", reward: 25 },
    { icon: "🔔", title: "Включи push-уведомления и акционные рассылки", reward: 10 },
    { icon: "💵", title: "Пополни карту от 10 BYN", reward: 15 },
    { icon: "↔", title: "Переведи по номеру телефона от 5 BYN", reward: 15 }
];

const leaderboard = [
    { place: 1, name: "Александр", score: 12560, avatar: "./assets_home/профиль без фото.jpg" },
    { place: 2, name: "Мария", score: 9870, avatar: "./assets_home/профиль без фото.jpg" },
    { place: 3, name: "Дмитрий", score: 8420, avatar: "./assets_home/профиль без фото.jpg" },
    { place: 4, name: "Виктория", score: 7210, avatar: "./assets_home/профиль без фото.jpg" },
    { place: 5, name: "Иван", score: 6540, avatar: "./assets_home/профиль без фото.jpg" },
    { place: 6, name: "Ты", score: 5870, avatar: "./mascot/SVG/базовый прямой.svg", current: true },
    { place: 7, name: "Екатерина", score: 4230, avatar: "./assets_home/профиль без фото.jpg" },
    { place: 8, name: "Никита", score: 3560, avatar: "./assets_home/профиль без фото.jpg" }
];

const achievements = [
    { icon: "🔥", title: "Неделя огня", text: "7 дней подряд" },
    { icon: "🎯", title: "Задания мастер", text: "Выполнил 50 заданий" },
    { icon: "⚡", title: "Молниеносный", text: "Собрал 1000 молний" },
    { icon: "👥", title: "Друг на связи", text: "Пригласил 5 друзей" },
    { icon: "🎁", title: "Охотник за подарками", text: "Открыл 20 подарков" }
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
    const battlePassTrack = document.getElementById("battlePassTrack");
    const battleNextPrize = document.getElementById("battleNextPrize");
    const tasksList = document.getElementById("tasksList");
    const leaderboardPodium = document.getElementById("leaderboardPodium");
    const leaderboardList = document.getElementById("leaderboardList");
    const achievementsList = document.getElementById("achievementsList");
    const profileLevel = document.getElementById("profileLevel");
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
    const tabPanels = [...document.querySelectorAll(".tab-panel")];
    const balanceValues = [...document.querySelectorAll("[data-balance]")];

    let selectedGameId = "doodlejump";
    let homeStats = null;

    function renderRewards(level, activity) {
        if (!battlePassTrack) {
            return;
        }

        const currentLevel = Math.max(0, level);
        const nextReward = battlePassRewards.find((reward) => reward.level > currentLevel);

        battlePassTrack.innerHTML = "";

        for (const reward of battlePassRewards) {
            const isReceived = currentLevel >= reward.level;
            const isCurrent = !isReceived && reward === nextReward;
            const article = document.createElement("article");
            article.className = `battle-step${isReceived ? " is-received" : ""}${isCurrent ? " is-current" : ""}`;
            article.innerHTML = `
                <div class="battle-marker">
                    <span class="battle-marker__level">${reward.level}</span>
                    <span class="battle-marker__state" aria-hidden="true">${isReceived ? "✓" : isCurrent ? "●" : "🔒"}</span>
                </div>
                <div class="battle-reward-card">
                    <span class="battle-reward-card__icon" aria-hidden="true">${reward.emoji}</span>
                    <div class="battle-reward-card__copy">
                        <h3>${reward.title}</h3>
                        <p>${reward.reward}</p>
                    </div>
                    <span class="battle-reward-card__badge">${isReceived ? "Получено" : isCurrent ? "Текущий" : "Закрыто"}</span>
                </div>
            `;
            battlePassTrack.append(article);
        }

        if (rewardsBalance) {
            rewardsBalance.textContent = String(currentLevel);
        }

        if (battleNextPrize) {
            battleNextPrize.textContent = nextReward
                ? `${nextReward.level - currentLevel} ${getRussianLevelWord(nextReward.level - currentLevel)}`
                : "все открыты";
        }

        for (const value of balanceValues) {
            value.textContent = String(activity);
        }

        if (profileLevel) {
            profileLevel.textContent = String(currentLevel);
        }
    }

    function renderStaticTabs() {
        if (tasksList) {
            tasksList.innerHTML = tasksCatalog.map((task) => `
                <article class="task-card">
                    <span class="task-card__icon" aria-hidden="true">${task.icon}</span>
                    <div class="task-card__copy">
                        <h3>${task.title}</h3>
                        ${task.note ? `<p>${task.note}</p>` : ""}
                        ${task.progress ? `<span>${task.progress}</span>` : ""}
                    </div>
                    <strong class="task-card__reward">+⚡ ${task.reward}</strong>
                    <span class="task-card__arrow" aria-hidden="true">›</span>
                </article>
            `).join("");
        }

        if (leaderboardPodium) {
            leaderboardPodium.innerHTML = leaderboard.slice(0, 3).map((user) => `
                <article class="podium-card podium-card--${user.place}">
                    <span class="podium-card__place">${user.place}</span>
                    <img src="${user.avatar}" alt="">
                    <h3>${user.name}</h3>
                    <strong>${user.score.toLocaleString("ru-RU")} ⚡</strong>
                </article>
            `).join("");
        }

        if (leaderboardList) {
            leaderboardList.innerHTML = leaderboard.slice(3).map((user) => `
                <article class="leaderboard-row${user.current ? " is-current" : ""}">
                    <span>${user.place}</span>
                    <img src="${user.avatar}" alt="">
                    <strong>${user.name}</strong>
                    <em>${user.score.toLocaleString("ru-RU")} ⚡</em>
                </article>
            `).join("");
        }

        if (achievementsList) {
            achievementsList.innerHTML = achievements.map((item) => `
                <article class="achievement-item">
                    <span aria-hidden="true">${item.icon}</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                </article>
            `).join("");
        }
    }

    function toggleRewardsScreen(forceOpen) {
        const shouldOpen = typeof forceOpen === "boolean"
            ? forceOpen
            : !rewardsScreen || rewardsScreen.classList.contains("is-hidden");

        showTab(shouldOpen ? "rewards" : "home");
    }

    function setActiveNav(navId) {
        for (const button of navButtons) {
            const isActive = button.dataset.nav === navId;
            button.classList.toggle("is-active", isActive);
            button.toggleAttribute("aria-current", isActive);
        }
    }

    function showTab(navId) {
        for (const panel of tabPanels) {
            const isActive = panel.dataset.panel === navId;
            panel.classList.toggle("is-active", isActive);
            panel.classList.toggle("is-hidden", !isActive);
            if (isActive) {
                panel.scrollTop = 0;
            }
        }

        setActiveNav(navId);
        toggleGamesSheet(false);
        toggleActivityPopover(false);
    }

    function handleNavClick(navId) {
        showTab(navId);
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
            showTab("home");
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
    renderStaticTabs();
    toggleGamesSheet(false);
    toggleActivityPopover(false);
    showTab("home");
    updateHomeStats();
});
