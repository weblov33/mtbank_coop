const BOARD_WIDTH = 360;
const BOARD_HEIGHT = 640;
const BIRD_WIDTH = 66;
const BIRD_HEIGHT = 52;
const PIPE_WIDTH = 64;
const PIPE_HEIGHT = 512;
const PIPE_INTERVAL_MS = 1500;
const VELOCITY_X = -2;
const GRAVITY = 0.34;
const FLAP_FORCE = -5.35;
const MAX_FALL_SPEED = 7.2;
const PIPE_GAP = 168;
const BIRD_HITBOX_SCALE = 0.82;
const STORAGE_KEY = "mtbank-flappybird-best";
const BIRD_RENDER_SCALE = 1.22;

class FlappyBirdGame {
    constructor() {
        this.board = document.getElementById("board");
        this.context = this.board.getContext("2d");
        this.overlay = document.getElementById("gameOverlay");
        this.overlayTitle = document.getElementById("overlayTitle");
        this.overlayText = document.getElementById("overlayText");
        this.scoreValue = document.getElementById("scoreValue");
        this.bestScoreValue = document.getElementById("bestScoreValue");
        this.lightningValue = document.getElementById("lightningValue");
        this.startButton = document.getElementById("startButton");
        this.pauseButton = document.getElementById("pauseButton");
        this.pauseIcon = document.getElementById("pauseIcon");
        this.backButton = document.getElementById("backButton");
        this.tapLayer = document.getElementById("tapLayer");
        this.deviceScale = Math.max(window.devicePixelRatio || 1, 1);

        this.setupCanvas();

        this.birdSprite = new Image();
        this.pipeSprite = new Image();
        const rerender = () => this.render();

        this.birdSprite.addEventListener("load", rerender);
        this.pipeSprite.addEventListener("load", rerender);

        this.birdSprite.src = "./flappy-mascot-flight.svg";
        this.pipeSprite.src = "./flappy-pipe.webp";

        this.animationFrame = null;
        this.pipeTimer = null;
        this.bestScore = this.loadBestScore();
        this.lastFrameTime = 0;
        this.paused = false;

        this.bindEvents();
        this.reset();
        this.render();
        this.showOverlay("Готовы", "Коснитесь, чтобы взлететь");
    }

    setupCanvas() {
        this.board.width = Math.round(BOARD_WIDTH * this.deviceScale);
        this.board.height = Math.round(BOARD_HEIGHT * this.deviceScale);
        this.context.setTransform(this.deviceScale, 0, 0, this.deviceScale, 0, 0);
        this.context.imageSmoothingEnabled = true;
    }

    bindEvents() {
        this.startButton.addEventListener("click", () => {
            if (this.gameOver) {
                this.reset();
            }
            this.start();
        });

        this.pauseButton.addEventListener("click", () => {
            if (this.gameOver) {
                this.reset();
                this.start();
                return;
            }

            if (!this.gameStarted) {
                this.start();
                return;
            }

            if (this.paused) {
                this.resume();
                return;
            }

            this.pause();
        });

        this.backButton.addEventListener("click", () => {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: "mtbank:close-game" }, "*");
            }
        });

        const handleTap = (event) => {
            event.preventDefault();
            this.flap();
        };

        this.tapLayer.addEventListener("pointerdown", handleTap);
        this.board.addEventListener("pointerdown", handleTap);
        this.tapLayer.addEventListener("click", (event) => event.preventDefault());
        this.board.addEventListener("click", (event) => event.preventDefault());
        this.board.addEventListener("contextmenu", (event) => event.preventDefault());
        this.tapLayer.addEventListener("contextmenu", (event) => event.preventDefault());
        document.addEventListener("selectstart", (event) => {
            if (event.target && event.target.closest(".game-card")) {
                event.preventDefault();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyX") {
                event.preventDefault();
                this.flap();
            }
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden && this.gameStarted && !this.gameOver && !this.paused) {
                this.pause();
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
    }

    loadBestScore() {
        const value = window.localStorage.getItem(STORAGE_KEY);
        return value ? Number(value) || 0 : 0;
    }

    saveBestScore() {
        window.localStorage.setItem(STORAGE_KEY, String(this.bestScore));
    }

    reset() {
        this.bird = {
            x: BOARD_WIDTH / 8,
            y: BOARD_HEIGHT / 2,
            width: BIRD_WIDTH,
            height: BIRD_HEIGHT
        };

        this.pipeArray = [];
        this.velocityY = 0;
        this.score = 0;
        this.gameStarted = false;
        this.gameOver = false;
        this.paused = false;
        this.updateHud();

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        if (this.pipeTimer) {
            clearInterval(this.pipeTimer);
            this.pipeTimer = null;
        }

        this.render();
        this.showOverlay("Готовы", "Коснитесь, чтобы взлететь");
    }

    start() {
        if ((this.gameStarted && !this.gameOver) || this.paused) {
            return;
        }

        this.gameStarted = true;
        this.gameOver = false;
        this.paused = false;
        this.lastFrameTime = performance.now();
        this.hideOverlay();
        this.flap(true);
        if (!this.pipeTimer) {
            this.pipeTimer = setInterval(() => this.placePipes(), PIPE_INTERVAL_MS);
        }
        if (!this.animationFrame) {
            this.update(this.lastFrameTime);
        }
    }

    flap(isStarting = false) {
        if (this.gameOver) {
            this.reset();
            this.start();
            return;
        }

        if (this.paused) {
            this.resume();
            return;
        }

        if (!this.gameStarted) {
            this.start();
            return;
        }

        this.velocityY = FLAP_FORCE;

        if (!isStarting) {
            this.render();
        }
    }

    placePipes() {
        if (!this.gameStarted || this.gameOver) {
            return;
        }

        const randomPipeY = 0 - PIPE_HEIGHT / 4 - Math.random() * (PIPE_HEIGHT / 2);
        const openingSpace = PIPE_GAP;

        this.pipeArray.push({
            x: BOARD_WIDTH,
            y: randomPipeY,
            width: PIPE_WIDTH,
            height: PIPE_HEIGHT,
            isTop: true,
            passed: false
        });

        this.pipeArray.push({
            x: BOARD_WIDTH,
            y: randomPipeY + PIPE_HEIGHT + openingSpace,
            width: PIPE_WIDTH,
            height: PIPE_HEIGHT,
            isTop: false,
            passed: false
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

        this.step(deltaTime);
        this.render();
        this.animationFrame = requestAnimationFrame((frameTime) => this.update(frameTime));
    }

    step(deltaTime) {
        this.velocityY = Math.min(this.velocityY + GRAVITY * deltaTime, MAX_FALL_SPEED);
        this.bird.y = Math.max(this.bird.y + this.velocityY * deltaTime, 0);

        if (this.bird.y > BOARD_HEIGHT) {
            this.finish("Игра окончена. Нажмите старт, чтобы попробовать снова.");
            return;
        }

        for (const pipe of this.pipeArray) {
            pipe.x += VELOCITY_X * deltaTime;

            if (!pipe.passed && this.bird.x > pipe.x + pipe.width) {
                pipe.passed = true;
                this.score += 0.5;
            }

            if (this.detectCollision(this.bird, pipe)) {
                this.finish("Игра окончена. Нажмите старт, чтобы попробовать снова.");
                return;
            }
        }

        while (this.pipeArray.length > 0 && this.pipeArray[0].x < -PIPE_WIDTH) {
            this.pipeArray.shift();
        }

        this.bestScore = Math.max(this.bestScore, Math.floor(this.score));
        this.updateHud();
    }

    finish(message) {
        this.gameOver = true;
        this.gameStarted = false;
        this.paused = false;
        this.bestScore = Math.max(this.bestScore, Math.floor(this.score));
        this.saveBestScore();
        this.updateHud();
        this.showOverlay("Игра окончена", message);

        if (this.pipeTimer) {
            clearInterval(this.pipeTimer);
            this.pipeTimer = null;
        }
    }

    pause() {
        this.paused = true;
        this.gameStarted = false;
        this.showOverlay("Пауза", "Коснитесь, чтобы продолжить");
        this.updateHud();

        if (this.pipeTimer) {
            clearInterval(this.pipeTimer);
            this.pipeTimer = null;
        }
    }

    resume() {
        if (!this.paused || this.gameOver) {
            return;
        }

        this.paused = false;
        this.gameStarted = true;
        this.lastFrameTime = performance.now();
        this.hideOverlay();
        if (!this.pipeTimer) {
            this.pipeTimer = setInterval(() => this.placePipes(), PIPE_INTERVAL_MS);
        }
        if (!this.animationFrame) {
            this.update(this.lastFrameTime);
        }
        this.updateHud();
    }

    updateHud() {
        this.scoreValue.textContent = String(Math.floor(this.score));
        this.bestScoreValue.textContent = String(this.bestScore);
        this.lightningValue.textContent = `+${Math.floor(this.score / 5)}`;
        this.pauseButton.setAttribute("aria-label", this.paused ? "Продолжить" : "Пауза");
        this.pauseIcon.innerHTML = this.paused
            ? `<svg viewBox="0 0 24 24" role="presentation"><path d="M8 5.4c0-.8.9-1.28 1.58-.82l8.24 5.6c.6.4.6 1.28 0 1.68l-8.24 5.6A1 1 0 0 1 8 16.6V5.4Z"></path></svg>`
            : `<svg viewBox="0 0 24 24" role="presentation"><rect x="6" y="4.5" width="4" height="15" rx="1.8"></rect><rect x="14" y="4.5" width="4" height="15" rx="1.8"></rect></svg>`;
    }

    detectCollision(a, b) {
        const hitboxWidth = a.width * BIRD_HITBOX_SCALE;
        const hitboxHeight = a.height * BIRD_HITBOX_SCALE;
        const hitboxX = a.x + (a.width - hitboxWidth) / 2;
        const hitboxY = a.y + (a.height - hitboxHeight) / 2;

        return (
            hitboxX < b.x + b.width &&
            hitboxX + hitboxWidth > b.x &&
            hitboxY < b.y + b.height &&
            hitboxY + hitboxHeight > b.y
        );
    }

    showOverlay(title, text) {
        this.overlayTitle.textContent = title;
        this.overlayText.textContent = text;
        this.overlay.classList.remove("is-hidden");
        this.startButton.textContent = this.gameOver ? "Играть снова" : "Старт";
    }

    hideOverlay() {
        this.overlay.classList.add("is-hidden");
    }

    render() {
        this.context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

        for (const pipe of this.pipeArray) {
            if (pipe.isTop) {
                this.context.save();
                this.context.translate(pipe.x + pipe.width / 2, pipe.y + pipe.height / 2);
                this.context.scale(1, -1);
                this.context.drawImage(
                    this.pipeSprite,
                    -pipe.width / 2,
                    -pipe.height / 2,
                    pipe.width,
                    pipe.height
                );
                this.context.restore();
                continue;
            }

            this.context.drawImage(this.pipeSprite, pipe.x, pipe.y, pipe.width, pipe.height);
        }

        const spriteWidth = this.birdSprite.naturalWidth || this.bird.width;
        const spriteHeight = this.birdSprite.naturalHeight || this.bird.height;
        const spriteRatio = spriteWidth / spriteHeight;
        const renderBirdHeight = this.bird.height * BIRD_RENDER_SCALE;
        const renderBirdWidth = renderBirdHeight * spriteRatio;
        const renderBirdX = this.bird.x - (renderBirdWidth - this.bird.width) / 2;
        const renderBirdY = this.bird.y - (renderBirdHeight - this.bird.height) / 2;

        this.context.drawImage(
            this.birdSprite,
            renderBirdX,
            renderBirdY,
            renderBirdWidth,
            renderBirdHeight
        );
    }
}

window.addEventListener("load", () => {
    new FlappyBirdGame();
});
