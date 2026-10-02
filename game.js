/* =====================================
   GET HTML ELEMENTS
===================================== */

let player = document.getElementById("player");

let enemies = document.querySelectorAll(".enemy");

let roadLines = document.querySelectorAll(".roadLine");

let scoreText = document.getElementById("score");

let levelText = document.getElementById("level");

let startScreen = document.getElementById("startScreen");

let gameOverScreen = document.getElementById("gameOver");

let finalScore = document.getElementById("finalScore");

let finalLevel = document.getElementById("finalLevel");

let pauseButton = document.getElementById("pauseButton");


/* =====================================
   GAME VARIABLES
===================================== */

let playerX = 180;

let score = 0;

let level = 1;

let speed = 5;

let gameRunning = false;

let gamePaused = false;


/* =====================================
   ENEMY POSITIONS
===================================== */

let enemyData = [

    {
        x: 50,
        y: -150
    },

    {
        x: 180,
        y: -400
    },

    {
        x: 310,
        y: -650
    }

];


/* =====================================
   START GAME
===================================== */

function startGame() {

    startScreen.style.display = "none";

    gameOverScreen.style.display = "none";

    gameRunning = true;

    gamePaused = false;

    score = 0;

    level = 1;

    speed = 5;

    playerX = 180;


    player.style.left =
        playerX + "px";


    scoreText.innerHTML =
        "Score: 0";


    levelText.innerHTML =
        "Level: 1";


    pauseButton.innerHTML =
        "⏸ Pause";


    /* Reset enemy positions */

    enemyData[0].x = 50;
    enemyData[0].y = -150;

    enemyData[1].x = 180;
    enemyData[1].y = -400;

    enemyData[2].x = 310;
    enemyData[2].y = -650;


    requestAnimationFrame(gameLoop);

}


/* =====================================
   KEYBOARD CONTROL
===================================== */

document.addEventListener("keydown", function(event) {

    if (!gameRunning || gamePaused) {

        return;

    }


    /* LEFT */

    if (event.key === "ArrowLeft") {

        if (playerX > 0) {

            playerX -= 20;

        }

    }


    /* RIGHT */

    if (event.key === "ArrowRight") {

        if (playerX < 350) {

            playerX += 20;

        }

    }


    /* Update player */

    player.style.left =
        playerX + "px";

});


/* =====================================
   GAME LOOP
===================================== */

function gameLoop() {


    if (!gameRunning) {

        return;

    }


    /* If paused */

    if (gamePaused) {

        requestAnimationFrame(gameLoop);

        return;

    }


    /* =================================
       MOVE ROAD
    ================================= */

    roadLines.forEach(function(line) {

        let position =
            parseInt(line.style.top) || 0;


        position += speed;


        if (position > 600) {

            position = -100;

        }


        line.style.top =
            position + "px";

    });


    /* =================================
       MOVE ENEMY CARS
    ================================= */

    enemies.forEach(function(enemy, index) {


        /* Move enemy */

        enemyData[index].y += speed;


        /* Set enemy position */

        enemy.style.top =
            enemyData[index].y + "px";


        enemy.style.left =
            enemyData[index].x + "px";


        /* =================================
           ENEMY PASSED PLAYER
        ================================= */

        if (enemyData[index].y > 600) {


            /* Send enemy back */

            enemyData[index].y = -150;


            /* Random lane */

            let lanes = [30, 160, 290];


            let randomLane =
                Math.floor(
                    Math.random() * lanes.length
                );


            enemyData[index].x =
                lanes[randomLane];


            /* Increase score */

            score++;


            scoreText.innerHTML =
                "Score: " + score;


            /* =================================
               LEVEL UP
            ================================= */

            if (score % 5 === 0) {

                level++;

                speed++;

                levelText.innerHTML =
                    "Level: " + level;

            }

        }


        /* =================================
           COLLISION
        ================================= */

        checkCollision(

            playerX,

            495,

            enemyData[index].x,

            enemyData[index].y

        );

    });


    /* Continue game */

    requestAnimationFrame(gameLoop);

}


/* =====================================
   COLLISION FUNCTION
===================================== */

function checkCollision(

    playerX,
    playerY,
    enemyX,
    enemyY

) {


    if (

        playerX < enemyX + 60 &&

        playerX + 60 > enemyX &&

        playerY < enemyY + 80 &&

        playerY + 80 > enemyY

    ) {

        endGame();

    }

}


/* =====================================
   GAME OVER
===================================== */

function endGame() {

    gameRunning = false;

    gamePaused = false;


    finalScore.innerHTML =
        "🏆 Score: " + score;


    finalLevel.innerHTML =
        "📈 Level: " + level;


    gameOverScreen.style.display =
        "block";

}


/* =====================================
   PAUSE / RESUME
===================================== */

function pauseGame() {


    if (!gameRunning) {

        return;

    }


    gamePaused =
        !gamePaused;


    if (gamePaused) {

        pauseButton.innerHTML =
            "▶ Resume";

    }

    else {

        pauseButton.innerHTML =
            "⏸ Pause";

    }

}


/* =====================================
   RESTART
===================================== */

function restartGame() {

    location.reload();

}
