import Ball from "./ball.js";
import InputHandler from "./inputhandler.js";
import Paddle from "./paddle.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

// Global variables
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let lastTime = 0;

// Creating items
let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);
let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

// Add InputHandler:
new InputHandler(paddle);

// Game loop

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  paddle.update(deltaTime);
  paddle.draw(ctx);

  ball.update(deltaTime);
  ball.draw(ctx);

  requestAnimationFrame(gameLoop);
}

// Starting the gameLoop
requestAnimationFrame(gameLoop);
