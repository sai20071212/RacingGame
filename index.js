let player = document.getElementById("player");
let enemy = document.getElementById("enemy");
let scoreText = document.getElementById("score");

let playerX = 175;
let enemyY = -100;
let enemyX = 100;
let score = 0;
let gameOver = false;

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    }

    if (event.key === "ArrowRight" && playerX < 350) {
        playerX += 20;
    }

    player.style.left = playerX + "px";
});

function gameLoop() {

    if (gameOver)
        return;

    enemyY += 5;

    if (enemyY > 600) {
        enemyY = -100;
        enemyX = Math.floor(Math.random() * 350);
        score++;
        scoreText.innerHTML = "Score: " + score;
    }

    enemy.style.top = enemyY + "px";
    enemy.style.left = enemyX + "px";

    // Collision detection
    if (
        playerX < enemyX + 50 &&
        playerX + 50 > enemyX &&
        500 < enemyY + 80 &&
        580 > enemyY
    ) {
        gameOver = true;
        alert("Game Over! Score: " + score);
    }

    requestAnimationFrame(gameLoop);
}

function restartGame() {
    location.reload();
}

gameLoop();
