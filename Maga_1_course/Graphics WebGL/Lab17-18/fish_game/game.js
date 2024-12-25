const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let fishY = canvas.height / 2;
let fishSpeed = 2;
let fishHeight = 50;
let fishWidth = 50;

let obstacles = [];
let obstacleWidth = 60;
let obstacleGap = 200;
let obstacleSpeed = 2;

let score = 0;
let hitCount = 0;
let startTime = Date.now();
let gameOver = false;

const fishImage = new Image();
fishImage.src = "fish.png";

fishImage.onload = () => {
    console.log('Image loaded successfully!');
    gameLoop();
};

fishImage.onerror = () => {
    console.log('Error loading fish image');
};

canvas.addEventListener('mousemove', (e) => {
    if (!gameOver) {
        fishY = e.clientY - canvas.getBoundingClientRect().top;
    }
});

function createObstacle() {
    let obstacleHeight, lowerObstacleHeight;

    do {
        obstacleHeight = Math.floor(Math.random() * (canvas.height - obstacleGap));
        lowerObstacleHeight = obstacleHeight + obstacleGap;
    } while (lowerObstacleHeight + fishHeight > canvas.height || lowerObstacleHeight - obstacleHeight < fishHeight);

    let lastObstacle = obstacles[obstacles.length - 1];
    let xPos = canvas.width;

    if (lastObstacle) {
        const minGap = fishWidth * 2;
        xPos = lastObstacle.x + obstacleWidth + minGap;
    }

    obstacles.push({ x: xPos, y: obstacleHeight, lowerY: lowerObstacleHeight });
}

hit_count_max = 100;

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= obstacleSpeed;
        if (
            obstacles[i].x < fishWidth &&
            obstacles[i].x + obstacleWidth > 0 &&
            (fishY < obstacles[i].y || fishY + fishHeight > obstacles[i].lowerY)
        ) {
            hitCount++;
            if (hitCount > hit_count_max) {
                gameOver = true;
            }
        }

        if (obstacles[i].x + obstacleWidth < 0) {
            obstacles.splice(i, 1);
        }
    }
}

function drawObstacles() {
    ctx.fillStyle = "#d9534f";
    obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, 0, obstacleWidth, obstacle.y);
        ctx.fillRect(obstacle.x, obstacle.lowerY, obstacleWidth, canvas.height - obstacle.lowerY);
    });
}

function drawFish() {
    ctx.drawImage(fishImage, 0, fishY - fishHeight / 2, fishWidth, fishHeight);
}

function drawInfo() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("score").textContent = `Счёт: ${hitCount}`;
    document.getElementById("time").textContent = `Время: ${elapsedTime} секунд`;

    if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, canvas.height / 3, canvas.width, 100);
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Игра окончена! Превышено количество столкновений.", canvas.width / 2, canvas.height / 2);
    }
}

function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFish();
    updateObstacles();
    drawObstacles();
    drawInfo();

    if (Math.random() < 0.01) {
        createObstacle();
    }

    requestAnimationFrame(gameLoop);
}
