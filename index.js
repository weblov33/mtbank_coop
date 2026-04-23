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

const hugeIcons = {
    gift: '<path d="M4 8h16v12H4V8Z"/><path d="M3 5h18v3H3V5ZM12 5v15"/><path d="M8 5c-1.5 0-2.6-.8-2.6-2 0-.7.6-1.3 1.4-1.3C8.3 1.7 10 5 10 5M16 5c1.5 0 2.6-.8 2.6-2 0-.7-.6-1.3-1.4-1.3C15.7 1.7 14 5 14 5"/>',
    leaf: '<path d="M5 19c8.8 0 13-5.4 14-14-8.6 1-14 5.2-14 14Z"/><path d="M5 19c2.8-4.5 6.1-7.6 10-9.2"/>',
    clover: '<path d="M12 11C9.5 8.6 9.5 5 12 5s2.5 3.6 0 6ZM12 11c2.5-2.4 6-2.4 6 0s-3.5 2.4-6 0ZM12 11c-2.5 2.4-6 2.4-6 0s3.5-2.4 6 0ZM12 11c2.5 2.4 2.5 6 0 6s-2.5-3.6 0-6ZM12 16v5"/>',
    star: '<path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6-4.4-4.2 6-.8L12 3Z"/>',
    sparkles: '<path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z"/>',
    fire: '<path d="M12 22c-3.8 0-7-2.8-7-6.7 0-2.5 1.4-4.6 3.4-6.4.3 2.2 1.4 3.5 2.7 4.1-.7-3.6.5-6.5 3.4-9 0 3 1 4.6 2.5 6.2 1.2 1.3 2 2.8 2 5.1 0 3.9-3.2 6.7-7 6.7Z"/><path d="M12 18.5c-1.5 0-2.7-1-2.7-2.5 0-1 .6-1.9 1.4-2.6.2.9.7 1.4 1.2 1.7-.3-1.5.2-2.7 1.4-3.8 0 1.2.4 1.9 1 2.6.5.5.8 1.2.8 2.1 0 1.5-1.2 2.5-2.7 2.5Z"/>',
    diamond: '<path d="M6.5 4h11L21 9l-9 11L3 9l3.5-5Z"/><path d="M3 9h18M8.5 4 12 9l3.5-5M8.5 4 6 9l6 11 6-11-2.5-5"/>',
    crown: '<path d="M4 8l4 3.5L12 5l4 6.5L20 8l-1.5 10h-13L4 8Z"/><path d="M5.5 18h13"/>',
    trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 6H5.5a2.5 2.5 0 0 0 0 5H8M16 6h2.5a2.5 2.5 0 0 1 0 5H16M12 12v5M9 20h6M10 17h4"/>',
    moon: '<path d="M20 15.6A8 8 0 0 1 8.4 4a7 7 0 1 0 11.6 11.6Z"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z"/>',
    snowflake: '<path d="M12 3v18M5.6 6.5l12.8 11M18.4 6.5l-12.8 11M8 3.8 12 7l4-3.2M8 20.2 12 17l4 3.2M3.5 10l4.5 1.2L6.8 16M20.5 10 16 11.2l1.2 4.8"/>',
    magic: '<path d="M4 20 16.5 7.5"/><path d="m14 5 5 5"/><path d="M19 3l.7 1.8L21.5 5l-1.8.7L19 7.5l-.7-1.8L16.5 5l1.8-.7L19 3ZM7 4l.7 1.8L9.5 6.5l-1.8.7L7 9l-.7-1.8-1.8-.7 1.8-.7L7 4ZM18 15l.7 1.8 1.8.7-1.8.7L18 20l-.7-1.8-1.8-.7 1.8-.7L18 15Z"/>',
    sun: '<path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    gamepad: '<path d="M7 10h10a5 5 0 0 1 4.6 3l.7 1.8a3.2 3.2 0 0 1-5 3.6L15 16H9l-2.3 2.4a3.2 3.2 0 0 1-5-3.6L2.4 13A5 5 0 0 1 7 10Z"/><path d="M7 14h4M9 12v4M16.5 13.5h.1M18.5 15.5h.1"/>',
    flask: '<path d="M9 3h6M10 3v5l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V3"/><path d="M8 15h8"/>',
    users: '<path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M17 11a3 3 0 1 0-1.5-5.6M18 20a5.5 5.5 0 0 0-3.1-5"/>',
    card: '<path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M2 10h20M6 15h4"/>',
    package: '<path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z"/><path d="m4 8.5 8 4.5 8-4.5M12 13v7M8 6.3l8 4.5"/>',
    wallet: '<path d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M16 12h6v5h-6a2.5 2.5 0 0 1 0-5Z"/><path d="M17.5 14.5h.1"/>',
    heart: '<path d="M20.3 5.7a5 5 0 0 0-7.1 0L12 6.9l-1.2-1.2a5 5 0 0 0-7.1 7.1L12 21l8.3-8.2a5 5 0 0 0 0-7.1Z"/>',
    bell: '<path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/>',
    bag: '<path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    money: '<path d="M4 7h16v10H4V7Z"/><path d="M8 7a4 4 0 0 1-4 4M20 11a4 4 0 0 1-4-4M8 17a4 4 0 0 0-4-4M20 13a4 4 0 0 0-4 4"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>',
    transfer: '<path d="M7 7h13l-3-3M17 10l3-3M17 17H4l3 3M7 14l-3 3"/>',
    medal: '<path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M9 14.2 7.5 21 12 18.5 16.5 21 15 14.2M8 3l4 4 4-4"/>',
    rocket: '<path d="M12 15 9 12c1.4-4.7 4.6-7.8 9.5-9.3.7 4.8-1 8.8-5.5 11.8Z"/><path d="M9 12 5 13l-2 5 5-2 1-4ZM13 15l-1 4-5 2 2-5 4-1ZM16 8h.1"/>',
    dice: '<path d="M5 5h14v14H5V5Z"/><path d="M8.5 8.5h.1M15.5 8.5h.1M12 12h.1M8.5 15.5h.1M15.5 15.5h.1"/>',
    user: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    share: '<path d="M12 4v10"/><path d="m8 8 4-4 4 4"/><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
    badge: '<path d="M12 3 14.8 8l5.2 1-3.6 4 1 5.7L12 16l-5.4 2.7 1-5.7L4 9l5.2-1L12 3Z"/>',
    target: '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>',
    calendar: '<path d="M5 5h14a2 2 0 0 1 2 2v12H3V7a2 2 0 0 1 2-2Z"/><path d="M3 10h18M8 3v4M16 3v4M8 14h.1M12 14h.1M16 14h.1M8 17h.1M12 17h.1"/>',
    handshake: '<path d="M8 12 5.5 9.5a2.5 2.5 0 0 1 3.5-3.5l2 2 2-2a2.5 2.5 0 0 1 3.5 3.5L14 12"/><path d="m8 12 4 4 4-4M8 12l-3 3M16 12l3 3"/>',
    lock: '<path d="M6 10h12v10H6V10Z"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    dot: '<path d="M12 12h.1"/>',
    chevronRight: '<path d="m9 5 7 7-7 7"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    edit: '<path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5Z"/>',
    tasks: '<path d="M5 6.5h14M5 12h14M5 17.5h9"/><path d="m16 17.5 1.8 1.8L22 15"/>',
    ranking: '<path d="M6 20V10M12 20V4M18 20v-7"/><path d="M4 20h16"/>'
};

function getIconSvg(name) {
    return hugeIcons[name] || hugeIcons.gift;
}

function icon(name, className = "hi-icon") {
    return `<span class="${className}" aria-hidden="true"><svg viewBox="0 0 24 24" role="presentation">${getIconSvg(name)}</svg></span>`;
}

const battlePassRewards = [
    { level: 5, icon: "leaf", title: "Новичок", reward: "Промокод Cofix: Американо за 1 BYN" },
    { level: 10, icon: "leaf", title: "Любитель", reward: "Комбо KFC: Чизбургер + Картошка фри + Напиток" },
    { level: 15, icon: "clover", title: "Знаток", reward: "Скидка 15% на Яндекс Маркет" },
    { level: 20, icon: "star", title: "Профи", reward: "Промокод Золотое Яблоко: -15%" },
    { level: 25, icon: "sparkles", title: "Ветеран", reward: "Мерч: Стикерпак + Носки с Мобиком" },
    { level: 30, icon: "sparkles", title: "Элита", reward: "Промокод Wildberries: -15%" },
    { level: 35, icon: "fire", title: "Мастер", reward: "Яндекс Go: 3 бесплатные поездки" },
    { level: 40, icon: "diamond", title: "Гуру", reward: "Мерч: Футболка с Мобиком" },
    { level: 45, icon: "crown", title: "Император", reward: "Подписка Яндекс Плюс (1 месяц)" },
    { level: 50, icon: "trophy", title: "Легенда", reward: "Именная карта + кешбэк 7%" },
    { level: 55, icon: "moon", title: "Мастер стихий", reward: "Купон Cofix 30 BYN" },
    { level: 60, icon: "zap", title: "Титан", reward: "Скидка 40 BYN в Золотом Яблоке" },
    { level: 65, icon: "snowflake", title: "Хранитель", reward: "Кешбэк 90% на Яндекс Go" },
    { level: 70, icon: "magic", title: "Властелин", reward: "Мерч: Худи с Мобиком" },
    { level: 75, icon: "sun", title: "Повелитель", reward: "Wildberries 60 BYN" },
    { level: 80, icon: "gamepad", title: "Бог Мобиков", reward: "Яндекс Плюс (3 месяца)" },
    { level: 85, icon: "badge", title: "Дракон", reward: "Сертификат KFC 60 BYN" },
    { level: 90, icon: "sparkles", title: "Создатель", reward: "Скидка 80 BYN" },
    { level: 95, icon: "flask", title: "Абсолют", reward: "Кешбэк 10% на 14 дней" },
    { level: 99, icon: "gift", title: "МАКСИМУМ", reward: "Гранд-приз: мерч-бокс + карта + KFC 100 BYN" }
];

const tasksSections = [
    {
        title: "Рекомендуемые",
        subtitle: "Банковские задания",
        icon: "fire",
        items: [
            { icon: "users", title: "Привести друга", note: "Пригласи друга в приложение" },
            { icon: "card", title: "Оформить карту", note: "Шоппер, Халва или Кактус" },
            { icon: "package", title: "Подключить пакет услуг", note: "Выбери подходящий пакет" },
            { icon: "star", title: "Оформить подписку", note: "Например, Семейная в Халве" },
            { icon: "wallet", title: "Привязать карту к Pay", note: "Apple Pay или Google Pay" },
            { icon: "heart", title: "Сделать пожертвование", note: "Поддержи благотворительность" },
            { icon: "bell", title: "Включить Push", note: "Уведомления и акционные рассылки" }
        ]
    },
    {
        title: "Быстрые",
        subtitle: "Ежедневные действия",
        icon: "zap",
        items: [
            { icon: "bag", title: "Покупка от 10 BYN" },
            { icon: "money", title: "Пополнение от 10 BYN" },
            { icon: "transfer", title: "Перевод от 5 BYN" }
        ]
    },
    {
        title: "Игровые",
        subtitle: "Мини-игры и рекорды",
        icon: "gamepad",
        items: [
            { icon: "medal", title: "ТОП-3 друзей" },
            { icon: "trophy", title: "Побить рекорд" },
            { icon: "calendar", title: "10 игр за день" },
            { icon: "rocket", title: "20+ игр" },
            { icon: "dice", title: "Все игры за день" }
        ]
    },
    {
        title: "Партнёры",
        subtitle: "Бренды и специальные задания",
        icon: "handshake",
        groups: [
            { brand: "Яндекс", items: ["3 поездки", "5 дней музыка", "Заказ 30 BYN", "10 поездок VIP"] },
            { brand: "Золотое Яблоко", items: ["Покупка 40 BYN", "Пробник", "Белорусский бренд", "VIP"] },
            { brand: "KFC", items: ["Собрать комбо", "5 чеков", "VIP заказ"] },
            { brand: "Cofix", items: ["3 покупки", "Баллы", "VIP"] },
            { brand: "Wildberries", items: ["5 товаров", "Покупка 50 BYN", "Отзыв", "VIP"] }
        ]
    },
    {
        title: "Пригласи друзей",
        subtitle: "Социальные задания",
        icon: "rocket",
        items: [
            { icon: "user", title: "Пригласить друга" },
            { icon: "share", title: "Поделиться результатом" },
            { icon: "badge", title: "Поделиться достижением" }
        ]
    }
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
    { icon: "fire", title: "Неделя огня", text: "7 дней подряд" },
    { icon: "target", title: "Задания мастер", text: "Выполнил 50 заданий" },
    { icon: "zap", title: "Молниеносный", text: "Собрал 1000 молний" },
    { icon: "users", title: "Друг на связи", text: "Пригласил 5 друзей" },
    { icon: "gift", title: "Охотник за подарками", text: "Открыл 20 подарков" }
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

    function hydrateStaticIcons() {
        for (const iconNode of document.querySelectorAll("[data-icon]")) {
            iconNode.innerHTML = `<svg viewBox="0 0 24 24" role="presentation">${getIconSvg(iconNode.dataset.icon)}</svg>`;
        }
    }

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
                    <span class="battle-marker__state" aria-hidden="true">${icon(isReceived ? "check" : isCurrent ? "dot" : "lock", "hi-icon hi-icon--small")}</span>
                </div>
                <div class="battle-reward-card">
                    <span class="battle-reward-card__icon" aria-hidden="true">${icon(reward.icon, "hi-icon battle-reward-card__svg")}</span>
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
            tasksList.innerHTML = tasksSections.map((section) => `
                <section class="task-section">
                    <div class="task-section__header">
                        ${icon(section.icon, "hi-icon task-section__svg")}
                        <div>
                            <h2>${section.title}</h2>
                            <p>${section.subtitle}</p>
                        </div>
                    </div>
                    ${section.groups
                        ? `<div class="partner-groups">${section.groups.map((group) => `
                            <article class="partner-group">
                                <h3>${group.brand}</h3>
                                <div class="partner-group__items">
                                    ${group.items.map((item) => `
                                        <button class="task-chip" type="button">
                                            <span>${item}</span>
                                            <em aria-hidden="true">${icon("chevronRight", "hi-icon hi-icon--tiny")}</em>
                                        </button>
                                    `).join("")}
                                </div>
                            </article>
                        `).join("")}</div>`
                        : `<div class="task-section__grid">${section.items.map((task) => `
                            <button class="task-card" type="button">
                                <span class="task-card__icon" aria-hidden="true">${icon(task.icon, "hi-icon task-card__svg")}</span>
                                <span class="task-card__copy">
                                    <strong>${task.title}</strong>
                                    ${task.note ? `<em>${task.note}</em>` : ""}
                                </span>
                                <span class="task-card__state" aria-hidden="true">${icon("chevronRight", "hi-icon hi-icon--tiny")}</span>
                            </button>
                        `).join("")}</div>`}
                </section>
            `).join("");
        }

        if (leaderboardPodium) {
            leaderboardPodium.innerHTML = leaderboard.slice(0, 3).map((user) => `
                <article class="podium-card podium-card--${user.place}">
                    <span class="podium-card__place">${user.place}</span>
                    <img src="${user.avatar}" alt="">
                    <h3>${user.name}</h3>
                    <strong>${user.score.toLocaleString("ru-RU")} ${icon("zap", "hi-icon hi-icon--inline")}</strong>
                </article>
            `).join("");
        }

        if (leaderboardList) {
            leaderboardList.innerHTML = leaderboard.slice(3).map((user) => `
                <article class="leaderboard-row${user.current ? " is-current" : ""}">
                    <span>${user.place}</span>
                    <img src="${user.avatar}" alt="">
                    <strong>${user.name}</strong>
                    <em>${user.score.toLocaleString("ru-RU")} ${icon("zap", "hi-icon hi-icon--inline")}</em>
                </article>
            `).join("");
        }

        if (achievementsList) {
            achievementsList.innerHTML = achievements.map((item) => `
                <article class="achievement-item">
                    <span aria-hidden="true">${icon(item.icon, "hi-icon achievement-item__svg")}</span>
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
    hydrateStaticIcons();
    renderStaticTabs();
    toggleGamesSheet(false);
    toggleActivityPopover(false);
    showTab("home");
    updateHomeStats();
});
