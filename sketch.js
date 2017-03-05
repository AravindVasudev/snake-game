var snake;
var food;
var scl = 20;
var canvasWidth = 600;
var canvasHeight = 600;
var highScore = 0;

function preload() {}

function setup() {
  // Create the Canvas
  canvasSize = createVector(canvasWidth, canvasHeight);
  createCanvas(canvasSize.x, canvasSize.y);
  frameRate(10);

  // Create the Snake Object and the food
  snake = new Snake();
  pickLocation();
}

function draw() {
  background(156, 203, 149);

  // Print Score & High Score
  textSize(20);
  textFont("monospace");
  text("SCORE: " + snake.total, canvasSize.x - 140, 40);
  text("HIGH SCORE: " + highScore, canvasSize.x - 200, 60);

  // Check if the snake touches itself and if true, restart
  snake.death();

  // Update snake's position and put the snake in the canvas
  snake.update();
  snake.show();

  // If the snake eats the food, create a new food
  if(snake.eat(food)) {
    pickLocation();
  }

  // Put food in the canvas
  fill(0, 127, 0);
  strokeWeight(0);
  rect(food.x, food.y, scl, scl);
}

// Puts a new food at random location
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows))).mult(scl);
}

// Set snake's direction based on the key pressed
function keyPressed() {
    if(keyCode === UP_ARROW) {
        snake.dir(0, -1);
    }
    else if (keyCode === DOWN_ARROW) {
        snake.dir(0, 1);
    }
    else if (keyCode === LEFT_ARROW) {
        snake.dir(-1, 0);
    }
    else if (keyCode === RIGHT_ARROW) {
        snake.dir(1, 0);
    }
}

// Snake's Prototype Class
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  // Set the snake's direction
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  // Check if the snake eats the food and if yes, increment total and update highScore
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if(d < 1) {
      this.total++;

      if(highScore < this.total) {
        highScore = this.total;
      }
      return true;
    }
    else {
      return false;
    }
  }

  // Update the snake's location
  this.update = function() {
    if(this.total === this.tail.length) {
      for(var i = 0; i < this.total - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  // Checks if the snake touches it's own body and if yes, reset the game
  this.death = function() {
    for(var i = 0; i < this.tail.length; i++) {
      var d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
      if(d < 1) {
        this.total = 0;
        this.tail = [];

        this.x = 0;
        this.y = 0;
        pickLocation();
      }
    }
  }

  // Puts the snake into the canvas
  this.show = function() {
    fill(0);

    for(var i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl, 5);
    }

    rect(this.x, this.y, scl, scl, 5);
  }
}
