class Board {
  constructor(dimentions, tileSize, ctx) {
    this.dimentions = dimentions;
    this.tileSize = tileSize;

    this.utils = new Utils(ctx);
  }

  drawBoard() {
    let iterationX = 0;
    for (var x = 0; x <= this.dimentions.x; x += tileSize) {
      let iterationY = 0;
      for (var y = 0; y <= this.dimentions.y; y += tileSize) {
        let color = "#262626";
        if ((iterationX + (iterationY % 2)) % 2 == 0) {
          color = "#3b3b3b";
        }
        this.utils.drawRect({ x, y }, tileSize, color);
        iterationY++;
      }
      iterationX++;
    }

    return this;
  }
}

class Food {
  constructor(ctx, foodSize) {
    this.utils = new Utils(ctx);

    this.location = {};
    this.foodSize = foodSize - 10;
  }

  placeFood(location = this.location) {
    this.location = location;

    this.utils.drawRect(location, this.foodSize, "red");

    return this;
  }
}

class Snake {
  constructor(ctx) {
    this.ctx = ctx;

    this.utils = new Utils(ctx);

    this.location;
    this.cords;
    this.moveSpeed;
    this.length;
  }

  initSnake(initalLength) {
    this.location = { x: 80, y: 80 };
    this.cords = [{ x: this.location.x, y: this.location.y }];
    this.moveSpeed = { x: 20, y: 0, speed: 20 };
    this.length = initalLength;

    this.drawSnake();

    return this;
  }

  drawSnake(snakeSize) {
    this.cords.forEach((cord) =>
      this.utils.drawRect(
        { x: cord.x + 2.5, y: cord.y + 2.5 },
        snakeSize - 5,
        "#38a656"
      )
    );
  }

  up() {
    this.moveSpeed.x = 0;
    this.moveSpeed.y = -this.moveSpeed.speed;
    return this;
  }
  down() {
    this.moveSpeed.x = 0;
    this.moveSpeed.y = this.moveSpeed.speed;
    return this;
  }
  left() {
    this.moveSpeed.y = 0;
    this.moveSpeed.x = -this.moveSpeed.speed;
    return this;
  }
  right() {
    this.moveSpeed.y = 0;
    this.moveSpeed.x = this.moveSpeed.speed;
    return this;
  }

  async move() {
    this.location.x += this.moveSpeed.x;
    this.location.y += this.moveSpeed.y;

    this.cords.unshift({ x: this.location.x, y: this.location.y });
    if (this.cords.length > this.length) {
      this.cords = this.cords.slice(0, -1);
    }

    return this;
  }
}

class Utils {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawRect(cords, size, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(cords.x, cords.y, size, size);
  }
  drawText(content, cords) {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(content, cords.x, cords.y);
  }
}

let canvas = document.getElementById("snake-board");
let ctx = canvas.getContext("2d");
let playGamePrompt = document.getElementById("play-game");
let restartGamePrompt = document.getElementById("restart-game");
canvas.height = 500;
canvas.width = 800;
let tileSize = 20;
let bh = canvas.height;
let bw = canvas.width;
let foodEaten = 0;
let gameStarted = false;

let initalLength = 1;

const board = new Board({ x: bw, y: bh }, tileSize, ctx).drawBoard();
const snake = new Snake(ctx).initSnake(initalLength);
const food = new Food(ctx, tileSize).placeFood(
  {
    x: Math.floor((Math.random() * bw) / tileSize) * tileSize + 5,
    y: Math.floor((Math.random() * bh) / tileSize) * tileSize + 5,
  },
  true
);
const utils = new Utils(ctx);

setInterval(() => {
  if (gameStarted) gameLoop();
}, 200);

function startGame() {
  gameStarted = true;
  playGamePrompt.style.display = "none";
  restartGamePrompt.style.display = "none";
}

function died() {
  gameStarted = false;
  foodEaten = 0;
  restartGamePrompt.style.display = "block";
}

function gameLoop() {
  board.drawBoard();
  snake.drawSnake(tileSize);
  snake.move();
  food.placeFood();
  utils.drawText("score: " + foodEaten, { x: bw - 150, y: 40 });
  detectCollision();
}

document.addEventListener("keydown", async (event) => {
  const key = event.key.toLowerCase();
  if (key == "w" || key == "arrowup") {
    snake.up();
  }
  if (key == "s" || key == "arrowdown") {
    snake.down();
  }
  if (key == "a" || key == "arrowleft") {
    snake.left();
  }
  if (key == "d" || key == "arrowright") {
    snake.right();
  }
});

function detectCollision() {
  if (
    snake.cords[0].x >= bw ||
    snake.cords[0].x < 0 ||
    snake.cords[0].y >= bh ||
    snake.cords[0].y < 0
  ) {
    snake.initSnake(initalLength);
    died();
  }

  if (snake.cords.length > initalLength) {
    for (let i = 0; i < snake.cords.length; i++) {
      if (
        snake.cords.length > i + 1 &&
        snake.cords[0].x == snake.cords[i + 1].x &&
        snake.cords[0].y == snake.cords[i + 1].y
      ) {
        snake.initSnake(initalLength);
        died();
      }
    }
  }

  if (
    snake.cords[0].x == food.location.x - 5 &&
    snake.cords[0].y == food.location.y - 5
  ) {
    let cords = {
      x: Math.floor((Math.random() * bw) / tileSize) * tileSize + 5,
      y: Math.floor((Math.random() * bh) / tileSize) * tileSize + 5,
    };
    snake.length++;
    food.placeFood(cords, true);
    foodEaten++;
  }
}
