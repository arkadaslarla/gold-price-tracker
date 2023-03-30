var red = Math.floor(Math.random() * 256);
var green = Math.floor(Math.random() * 256);
var blue = Math.floor(Math.random() * 256);

document.body.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";

var game = {
    targetSize: 20,
    setTargetSize: function(size) {
        this.targetSize = size;
        console.log("Target size set to " + size);
    }
};


var easyButton = document.getElementById("easyButton");
easyButton.addEventListener("click", function(){
    game.setTargetSize(30);
    currentTarget = drawTarget();
    
    timeLeft = 60;
    const timeElement = document.getElementById("time");
    timeElement.textContent = timeLeft;
});

var mediumButton = document.getElementById("mediumButton");
mediumButton.addEventListener("click", function(){
    game.setTargetSize(20);
    currentTarget = drawTarget();
    timeLeft = 60;
    const timeElement = document.getElementById("time");
    timeElement.textContent = timeLeft;
});

var hardButton = document.getElementById("hardButton");
hardButton.addEventListener("click", function(){
    game.setTargetSize(10);
    currentTarget = drawTarget();
    timeLeft = 60;
    const timeElement = document.getElementById("time");
    timeElement.textContent = timeLeft;
});

var canvas = document.getElementById("gameBoard");
var ctx = canvas.getContext("2d");

var score = 0;
var lives = 3;
var scoreboard = document.querySelector(".scoreboard");
var scoreSpan = scoreboard.querySelector("#score");
var livesSpan = scoreboard.querySelectorAll(".heart");

scoreSpan.textContent = score;
livesSpan.textContent = lives;

function randomPosition() {
    var x = Math.floor(Math.random() * (canvas.width - 2 * game.targetSize)) + game.targetSize;
    var y = Math.floor(Math.random() * (canvas.height - 2 * game.targetSize)) + game.targetSize;
    return [x, y];
}
function drawTarget() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var position = randomPosition();
    var x = position[0];
    var y = position[1];
    ctx.beginPath();
    ctx.arc(x, y, game.targetSize, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    canvas.classList.remove("targetFadeIn");
    void canvas.offsetWidth; 
    canvas.classList.add("targetFadeIn");
    return [x, y];
}
var currentTarget = drawTarget();
var startTime = null;
let timeLeft = 60; 

function startTimer() {
  const countdownTimer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(countdownTimer);
        alert("Game Over! Your score is " + score);
        location.reload();
    }
  }, 1000);
}
startTimer();
canvas.addEventListener("click", function(event) {
    if (startTime === null) {
        startTime = timeLeft;
    }
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var distance = Math.sqrt((x - currentTarget[0]) ** 2 + (y - currentTarget[1]) ** 2);
    if (distance < game.targetSize) {
        ctx.clearRect(currentTarget[0] - game.targetSize, currentTarget[1] - game.targetSize, game.targetSize * 2, game.targetSize * 2);
        currentTarget = drawTarget();
        score++;
        scoreSpan.textContent = score;
    } else {
        lives--;
        livesSpan.textContent = lives;
        if (lives <= 0) {
            alert("Game Over! Your score is " + score);
            location.reload();
        } else {
            var hearts = scoreboard.querySelectorAll(".heart");
            hearts[lives].style.display = "none";
        }
    }
});
