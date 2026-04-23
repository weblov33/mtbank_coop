const BOARD_WIDTH = 360;
const BOARD_HEIGHT = 576;
const DOODLER_WIDTH = 80;
const DOODLER_HEIGHT = 82;
const PLATFORM_WIDTH = 86;
const PLATFORM_HEIGHT = 34;
const MOVE_SPEED = 4.8;
const INITIAL_VELOCITY_Y = -10.5;
const GRAVITY = 0.35;
const PLATFORM_COUNT = 7;
const STORAGE_KEY = "mtbank-doodlejump-best";
const MAX_TILT = 18;
const MISSION_TARGET = 1000;

class DoodleJumpGame {
    constructor() {
        this.board = document.getElementById("board");
        this.context = this.board.getContext("2d");
        this.overlay = document.getElementById("gameOverlay");
        this.scoreValue = document.getElementById("scoreValue");
        this.lightningValue = document.getElementById("lightningValue");
        this.progressFill = document.getElementById("progressFill");
        this.progressValue = document.getElementById("progressValue");
        this.overlayTitle = document.getElementById("overlayTitle");
        this.overlayCopy = document.getElementById("overlayCopy");
        this.overlayKicker = document.getElementById("overlayKicker");
        this.startButton = document.getElementById("startButton");
        this.pauseButton = document.getElementById("pauseButton");
        this.pauseIcon = document.getElementById("pauseIcon");
        this.backButton = document.getElementById("backButton");
        this.deviceScale = Math.max(window.devicePixelRatio || 1, 1);

        this.setupCanvas();

        this.images = this.loadImages();
        this.platforms = [];
        this.animationFrame = null;
        this.lastFrameTime = 0;
        this.velocityX = 0;
        this.velocityY = INITIAL_VELOCITY_Y;
        this.score = 0;
        this.bestScore = this.loadBestScore();
        this.gameStarted = false;
        this.gameOver = false;
        this.paused = false;
        this.doodler = this.createDoodler();
        this.worldOffset = 0;
        this.lastDoodlerBottom = 0;
        this.tiltEnabled = false;
        this.tiltPermissionRequested = false;
        this.tiltGamma = 0;

        this.bindEvents();
        this.reset();
        this.render();
    }

    getPauseIconMarkup(isPlay = false) {
        if (isPlay) {
            return `
                <svg viewBox="0 0 24 24" role="presentation">
                    <path d="M8 5.4c0-.8.9-1.28 1.58-.82l8.24 5.6c.6.4.6 1.28 0 1.68l-8.24 5.6A1 1 0 0 1 8 16.6V5.4Z"></path>
                </svg>
            `;
        }

        return `
            <svg viewBox="0 0 24 24" role="presentation">
                <rect x="6" y="4.5" width="4" height="15" rx="1.8"></rect>
                <rect x="14" y="4.5" width="4" height="15" rx="1.8"></rect>
            </svg>
        `;
    }

    loadImages() {
        const mascot = new Image();
        const platform = new Image();
        const rerender = () => this.render();

        mascot.addEventListener("load", rerender);
        platform.addEventListener("load", rerender);

        mascot.src = "./jumper-mascot.png";
        platform.src = "./jumper-platform.webp";

        return { mascot, platform };
    }

    createDoodler() {
        return {
            x: BOARD_WIDTH / 2 - DOODLER_WIDTH / 2,
            y: BOARD_HEIGHT * 7 / 8 - DOODLER_HEIGHT,
            width: DOODLER_WIDTH,
            height: DOODLER_HEIGHT,
            facing: 1
        };
    }

    setupCanvas() {
        this.board.width = Math.round(BOARD_WIDTH * this.deviceScale);
        this.board.height = Math.round(BOARD_HEIGHT * this.deviceScale);
        this.context.setTransform(this.deviceScale, 0, 0, this.deviceScale, 0, 0);
        this.context.imageSmoothingEnabled = true;
    }

    bindEvents() {
        this.startButton.addEventListener("click", async () => {
            if (this.gameOver) {
                this.reset();
            }
            if (this.paused) {
                this.resume();
                return;
            }
            await this.enableTiltIfNeeded();
            this.start();
        });

        this.overlay.addEventListener("click", async (event) => {
            if (event.target === this.startButton) {
                return;
            }

            if (this.overlay.dataset.mode !== "start") {
                return;
            }

            await this.enableTiltIfNeeded();
            this.start();
        });

        this.pauseButton.addEventListener("click", async () => {
            if (this.gameOver) {
                this.reset();
                await this.enableTiltIfNeeded();
                this.start();
                return;
            }

            if (!this.gameStarted) {
                await this.enableTiltIfNeeded();
                this.start();
                return;
            }

            if (this.paused) {
                this.resume();
                return;
            }

            this.pause("Пауза", "Продолжите, когда будете готовы снова прыгать.");
        });

        this.backButton.addEventListener("click", () => {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: "mtbank:close-game" }, "*");
            }
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden && this.gameStarted && !this.gameOver && !this.paused) {
                this.pause("Пауза", "Игра остановлена, пока экран был скрыт.");
            }
        });

        window.addEventListener("deviceorientation", (event) => {
            if (typeof event.gamma !== "number") {
                return;
            }
            this.tiltGamma = Math.max(-MAX_TILT, Math.min(MAX_TILT, event.gamma));
            if (this.tiltEnabled && this.gameStarted && !this.gameOver) {
                this.applyTiltControl();
            }
        });

        window.addEventListener("resize", () => {
            const nextScale = Math.max(window.devicePixelRatio || 1, 1);
            if (Math.abs(nextScale - this.deviceScale) > 0.01) {
                this.deviceScale = nextScale;
                this.setupCanvas();
            }
            this.render();
        }, { passive: true });

        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                event.preventDefault();
                if (this.gameOver) {
                    this.reset();
                }
                if (this.paused) {
                    this.resume();
                    return;
                }
                this.start();
            }

            if (event.code === "Escape" && this.gameStarted && !this.gameOver) {
                event.preventDefault();
                if (this.paused) {
                    this.resume();
                } else {
                    this.pause("Пауза", "Продолжите, когда будете готовы снова прыгать.");
                }
            }
        });
    }

    async enableTiltIfNeeded() {
        if (this.tiltEnabled || this.tiltPermissionRequested) {
            return;
        }

        if (typeof window.DeviceOrientationEvent === "undefined") {
            return;
        }

        this.tiltPermissionRequested = true;

        if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
            try {
                const permission = await window.DeviceOrientationEvent.requestPermission();
                if (permission === "granted") {
                    this.tiltEnabled = true;
                }
            } catch (_error) {
                this.tiltEnabled = false;
            }
            return;
        }

        this.tiltEnabled = true;
    }

    loadBestScore() {
        const value = window.localStorage.getItem(STORAGE_KEY);
        return value ? Number(value) || 0 : 0;
    }

    saveBestScore() {
        window.localStorage.setItem(STORAGE_KEY, String(this.bestScore));
    }

    applyTiltControl() {
        const normalizedTilt = this.tiltGamma / MAX_TILT;
        this.velocityX = normalizedTilt * MOVE_SPEED;

        if (this.velocityX > 0.2) {
            this.doodler.facing = 1;
        } else if (this.velocityX < -0.2) {
            this.doodler.facing = -1;
        }
    }

    start() {
        if ((this.gameStarted && !this.gameOver) || this.paused) {
            return;
        }

        this.gameStarted = true;
        this.gameOver = false;
        this.paused = false;
        this.lastFrameTime = performance.now();
        this.hideOverlay(true);
        if (!this.animationFrame) {
            this.update(this.lastFrameTime);
        }
    }

    reset() {
        this.doodler = this.createDoodler();
        this.velocityX = 0;
        this.velocityY = INITIAL_VELOCITY_Y;
        this.score = 0;
        this.gameStarted = false;
        this.gameOver = false;
        this.paused = false;
        this.platforms = [];
        this.worldOffset = 0;
        this.tiltGamma = 0;
        this.lastDoodlerBottom = this.doodler.y + this.doodler.height;
        this.placePlatforms();
        this.updateHud();

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        this.render();
        this.showOverlay("", "Нажмите, чтобы начать", "Коснитесь экрана", "Начать", false, "start");
    }

    placePlatforms() {
        this.platforms.push({
            img: this.images.platform,
            x: BOARD_WIDTH / 2 - PLATFORM_WIDTH / 2,
            y: BOARD_HEIGHT - 50,
            width: PLATFORM_WIDTH,
            height: PLATFORM_HEIGHT
        });

        for (let index = 0; index < PLATFORM_COUNT - 1; index += 1) {
            this.platforms.push({
                img: this.images.platform,
                x: Math.floor(Math.random() * (BOARD_WIDTH - PLATFORM_WIDTH)),
                y: BOARD_HEIGHT - 84 * index - 150,
                width: PLATFORM_WIDTH,
                height: PLATFORM_HEIGHT
            });
        }
    }

    addPlatform() {
        this.platforms.push({
            img: this.images.platform,
            x: Math.floor(Math.random() * (BOARD_WIDTH - PLATFORM_WIDTH)),
            y: -PLATFORM_HEIGHT,
            width: PLATFORM_WIDTH,
            height: PLATFORM_HEIGHT
        });
    }

    update(now) {
        if (!this.gameStarted || this.gameOver || this.paused) {
            this.animationFrame = null;
            this.render();
            return;
        }

        const deltaTime = Math.min((now - this.lastFrameTime) / 16.6667, 1.5);
        this.lastFrameTime = now;

        if (this.tiltEnabled) {
            this.applyTiltControl();
        }

        this.step(deltaTime);
        this.render();
        this.animationFrame = requestAnimationFrame((frameTime) => this.update(frameTime));
    }

    step(deltaTime) {
        this.doodler.x += this.velocityX * deltaTime;
        if (this.doodler.x > BOARD_WIDTH) {
            this.doodler.x = 0;
        } else if (this.doodler.x + this.doodler.width < 0) {
            this.doodler.x = BOARD_WIDTH;
        }

        const previousBottom = this.lastDoodlerBottom;
        this.velocityY += GRAVITY * deltaTime;
        this.doodler.y += this.velocityY * deltaTime;
        this.lastDoodlerBottom = this.doodler.y + this.doodler.height;

        if (this.doodler.y > BOARD_HEIGHT) {
            this.finish("Game Over. Tap start to try again.");
            return;
        }

        let verticalShift = 0;
        if (this.velocityY < 0 && this.doodler.y < BOARD_HEIGHT * 0.4) {
            verticalShift = Math.abs(this.velocityY) * deltaTime;
            this.doodler.y += verticalShift;
            this.worldOffset += verticalShift;
        }

        for (const platform of this.platforms) {
            if (verticalShift > 0) {
                platform.y += verticalShift;
            }

            if (this.detectLanding(platform, previousBottom) && this.velocityY >= 0) {
                this.velocityY = INITIAL_VELOCITY_Y;
                this.doodler.y = platform.y - this.doodler.height;
                this.lastDoodlerBottom = this.doodler.y + this.doodler.height;
            }
        }

        while (this.platforms.length > 0 && this.platforms[0].y >= BOARD_HEIGHT) {
            this.platforms.shift();
            this.addPlatform();
        }

        this.score = Math.max(this.score, Math.floor(this.worldOffset));
        this.bestScore = Math.max(this.bestScore, this.score);
        this.updateHud();
    }

    pause(title, message) {
        this.paused = true;
        this.gameStarted = false;
        this.velocityX = 0;
        this.showOverlay("Пауза", title, message, "Продолжить", true, "pause");
        this.updateHud();
    }

    resume() {
        if (!this.paused || this.gameOver) {
            return;
        }

        this.paused = false;
        this.gameStarted = true;
        this.lastFrameTime = performance.now();
        this.hideOverlay(true);
        if (!this.animationFrame) {
            this.update(this.lastFrameTime);
        }
    }

    finish(message) {
        this.gameOver = true;
        this.gameStarted = false;
        this.paused = false;
        this.velocityX = 0;
        this.bestScore = Math.max(this.bestScore, this.score);
        this.saveBestScore();
        this.updateHud();
        this.showOverlay("Финиш", "Попробуем ещё раз?", message, "Играть снова", true, "finish");
    }

    updateHud() {
        this.scoreValue.textContent = String(this.score);
        this.lightningValue.textContent = `+${Math.floor(this.score / 200)}`;
        this.progressValue.textContent = `${Math.min(this.score, MISSION_TARGET)} / ${MISSION_TARGET}`;
        this.progressFill.style.width = `${Math.min(this.score / MISSION_TARGET, 1) * 100}%`;
        this.pauseButton.setAttribute("aria-label", this.paused ? "Продолжить" : "Пауза");
        this.pauseIcon.innerHTML = this.getPauseIconMarkup(this.paused);
    }

    detectCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    detectLanding(platform, previousBottom) {
        const currentBottom = this.doodler.y + this.doodler.height;
        const isCrossingTop = previousBottom <= platform.y + 8 && currentBottom >= platform.y;

        return (
            isCrossingTop &&
            this.doodler.x + this.doodler.width > platform.x + 6 &&
            this.doodler.x < platform.x + platform.width - 6
        );
    }

    showOverlay(kicker, title, copy, actionLabel, showButton = true, mode = "default") {
        this.overlay.dataset.mode = mode;
        this.overlayKicker.textContent = kicker;
        this.overlayKicker.classList.toggle("is-hidden", !kicker);
        this.overlayTitle.textContent = title;
        this.overlayCopy.textContent = copy;
        this.startButton.textContent = actionLabel;
        this.startButton.classList.toggle("is-hidden", !showButton);
        this.overlay.classList.remove("is-hidden");
    }

    hideOverlay(isActiveGame = false) {
        this.overlay.classList.add("is-hidden");
        if (isActiveGame) {
            this.pauseIcon.innerHTML = this.getPauseIconMarkup(false);
        }
    }

    render() {
        this.context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

        for (const platform of this.platforms) {
            this.context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
        }

        const mascot = this.images.mascot;
        const mascotWidth = mascot.naturalWidth || this.doodler.width;
        const mascotHeight = mascot.naturalHeight || this.doodler.height;
        const mascotRatio = mascotWidth / mascotHeight;
        const drawHeight = this.doodler.height;
        const drawWidth = drawHeight * mascotRatio;
        const offsetX = (this.doodler.width - drawWidth) / 2;

        this.context.save();
        if (this.doodler.facing < 0) {
            this.context.translate(this.doodler.x + this.doodler.width - offsetX, this.doodler.y);
            this.context.scale(-1, 1);
            this.context.drawImage(this.images.mascot, 0, 0, drawWidth, drawHeight);
        } else {
            this.context.drawImage(
                this.images.mascot,
                this.doodler.x + offsetX,
                this.doodler.y,
                drawWidth,
                drawHeight
            );
        }
        this.context.restore();
    }
}

window.addEventListener("load", () => {
    new DoodleJumpGame();
});
