// board
var cellsize = 40;
var rows = 20;
var cols = 20;
var board;
var pen;

// snake head
var headX = 5 * cellsize;
var headY = 5 * cellsize;

// snake body
var snakebody = [];

// food
var foodX;
var foodY;

// snake speed
var speedX = 0;
var speedY = 0;

// Gameover
var gameover = false;

// Score
var game_score = 0;

// window.onload is the template function kind of init which needs not to be called explicitly
window.onload = function () {
    // To get element by id
    board = document.getElementById("board");
    UpdateScore = document.getElementById("score");
    // Set Board height
    board.height = rows * cellsize;
    // Set Board width
    board.width = cols * cellsize;
    // Get context - To Draw board
    pen = board.getContext("2d");

    placefoodRandomPos();
    document.addEventListener("keydown", changeDirection);
    setInterval(update, 100);
}

function update() {
    if (gameover == true) {
        return;
    }

    // Decide color of board
    pen.fillStyle = "black";
    // Fill the Board with the color decided
    pen.fillRect(0, 0, board.width, board.height);

    // Decide Color of food
    pen.fillStyle = "red";
    // Fill the food with that color
    pen.fillRect(foodX, foodY, cellsize, cellsize);

    // Eat Food
    if (headX == foodX && headY == foodY) {
        snakebody.push([foodX, foodY])  // store coordinate
        // Update Game Score
        game_score += 1
        // Updated Text must be within backquotes
        UpdateScore.innerText = `Score : ${game_score}`;    
        console.log(game_score)
        placefoodRandomPos();
    }

    // Keep Snake connected - For Body
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    if (snakebody.length != 0) {
        snakebody[0] = [headX, headY];
    }
    // Decide Color of snake
    pen.fillStyle = "Lime";
    // Speed of head of Snake
    headX += speedX * cellsize;
    headY += speedY * cellsize;
    // Fill the snake with the color decided
    pen.fillRect(headX, headY, cellsize, cellsize);
    // console.log(headX,headY,snakebody,foodX,foodY)
    // Inc Length of Snake by filling prev coordinate
    for (let i = 0; i < snakebody.length; i += 1) {
        pen.fillRect(snakebody[i][0], snakebody[i][1], cellsize, cellsize);
    }

    // game over conditions
    // CASE-I - Collison with wall
    if ((headX < 0 || headX > board.width - 1) || (headY < 0 || headY > board.height - 1)) {
        gameover = true;
        alert("Game Over!");
    }
    // CASE-II - Collison with snake itself
    for (let i=0;i<snakebody.length;i++)
    {
        if (headX == snakebody[i][0] && headY == snakebody[i][1])
        {
            gameover = true;
            alert("Game Over!");
        }
    }
}

function placefoodRandomPos() {
    // Place foor in Random Location in board
    // Math.random returns a random no b/w 0 and 1
    // (0-1) * 20 = 14.15554 = floor(14.1554) = 15 = 15 * 25 = position 
    foodX = Math.floor(Math.random() * cols) * cellsize;
    foodY = Math.floor(Math.random() * rows) * cellsize;
}

function changeDirection(e) {
    // If key == desired key && position is not opposite to prev pos
    if ((e.key == "ArrowUp" || e.key == "w" || e.key == "W") && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if ((e.key == "ArrowLeft" || e.key == "a" || e.key == "A") && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if ((e.key == "ArrowDown" || e.key == "s" || e.key == "S") && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if ((e.key == "ArrowRight" || e.key == "d" || e.key == "D") && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
    else {
        console.log("Invalid");
    }
}
