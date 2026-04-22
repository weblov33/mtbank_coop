const BOARD_WIDTH = 360;
const BOARD_HEIGHT = 576;
const DOODLER_WIDTH = 46;
const DOODLER_HEIGHT = 46;
const PLATFORM_WIDTH = 60;
const PLATFORM_HEIGHT = 18;
const MOVE_SPEED = 4.8;
const INITIAL_VELOCITY_Y = -10.5;
const GRAVITY = 0.35;
const PLATFORM_COUNT = 7;
const STORAGE_KEY = "mtbank-doodlejump-best";
const MAX_TILT = 18;

class DoodleJumpGame {
    constructor() {
        this.board = document.getElementById("board");
        this.context = this.board.getContext("2d");
        this.overlay = document.getElementById("gameOverlay");
        this.scoreValue = document.getElementById("scoreValue");
        this.bestScoreValue = document.getElementById("bestScoreValue");
        this.startButton = document.getElementById("startButton");
        this.restartButton = document.getElementById("restartButton");
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
        this.doodler = this.createDoodler(this.images.right);
        this.worldOffset = 0;
        this.lastDoodlerBottom = 0;
        this.tiltEnabled = false;
        this.tiltPermissionRequested = false;
        this.tiltGamma = 0;

        this.bindEvents();
        this.reset();
        this.render();
        this.showOverlay();
    }

    loadImages() {
        const right = new Image();
        const left = new Image();
        const platform = new Image();
        const rerender = () => this.render();

        right.addEventListener("load", rerender);
        left.addEventListener("load", rerender);
        platform.addEventListener("load", rerender);

        right.src = "./doodler-right.png";
        left.src = "./doodler-left.png";
        platform.src = "./platform.png";

        return { right, left, platform };
    }

    createDoodler(img) {
        return {
            img,
            x: BOARD_WIDTH / 2 - DOODLER_WIDTH / 2,
            y: BOARD_HEIGHT * 7 / 8 - DOODLER_HEIGHT,
            width: DOODLER_WIDTH,
            height: DOODLER_HEIGHT
        };
    }

    setupCanvas() {
        this.board.width = Math.round(BOARD_WIDTH * this.deviceScale);
        this.board.height = Math.round(BOARD_HEIGHT * this.deviceScale);
        this.context.setTransform(this.deviceScale, 0, 0, this.deviceScale, 0, 0);
    }

    bindEvents() {
        this.startButton.addEventListener("click", async () => {
            if (this.gameOver) {
                this.reset();
            }
            await this.enableTiltIfNeeded();
            this.start();
        });

        this.restartButton.addEventListener("click", async () => {
            this.reset();
            await this.enableTiltIfNeeded();
            this.start();
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden && this.gameStarted && !this.gameOver) {
                this.finish("Paused. Tap start to jump back in.");
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

        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                event.preventDefault();
                if (this.gameOver) {
                    this.reset();
                }
                this.start();
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
            this.doodler.img = this.images.right;
        } else if (this.velocityX < -0.2) {
            this.doodler.img = this.images.left;
        }
    }

    start() {
        if (this.gameStarted && !this.gameOver) {
            return;
        }

        this.gameStarted = true;
        this.gameOver = false;
        this.lastFrameTime = performance.now();
        this.hideOverlay();
        if (!this.animationFrame) {
            this.update(this.lastFrameTime);
        }
    }

    reset() {
        this.doodler = this.createDoodler(this.images.right);
        this.velocityX = 0;
        this.velocityY = INITIAL_VELOCITY_Y;
        this.score = 0;
        this.gameStarted = false;
        this.gameOver = false;
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
        this.showOverlay();
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
        if (!this.gameStarted || this.gameOver) {
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

    finish(message) {
        this.gameOver = true;
        this.gameStarted = false;
        this.velocityX = 0;
        this.bestScore = Math.max(this.bestScore, this.score);
        this.saveBestScore();
        this.updateHud();
        this.showOverlay();
    }

    updateHud() {
        this.scoreValue.textContent = String(this.score);
        this.bestScoreValue.textContent = String(this.bestScore);
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

    showOverlay() {
        this.overlay.classList.remove("is-hidden");
        this.startButton.textContent = this.gameOver ? "Play Again" : "Start";
    }

    hideOverlay() {
        this.overlay.classList.add("is-hidden");
    }

    render() {
        this.context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

        for (const platform of this.platforms) {
            this.context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
        }

        this.context.drawImage(
            this.doodler.img,
            this.doodler.x,
            this.doodler.y,
            this.doodler.width,
            this.doodler.height
        );
    }
}

window.addEventListener("load", () => {
    new DoodleJumpGame();
});
