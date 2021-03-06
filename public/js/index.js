import Game from "./game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

// Global variables
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let lastTime = 0;

// Create an instance of the game class
const game = new Game(GAME_WIDTH, GAME_HEIGHT);

// Game loop
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

// Starting the gameLoop
requestAnimationFrame(gameLoop);
