import Ball from "./ball.js";
import Brick from "./brick.js"
import InputHandler from "./inputhandler.js";
import { buildLevel, level1, level2, level3 }  from "./levels.js"
import Paddle from "./paddle.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
}

export default class Game {

  constructor(gameWidth, gameHeight) {
    this.gameScore = 0;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    this.gamestate = GAMESTATE.MENU;
    this.bricks = [];
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.lives = 3;
    this.levels = [level1, level2, level3];
    this.currentLevel = 0;

    // Add InputHandler:
    new InputHandler(this.paddle, this);
  }

  draw(ctx) {
    // Draw all object together
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.draw(ctx)
    );

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + this.gameScore + "   Lives: " + this.lives + "   Level: " + this.currentLevel, 200, 30);

    if (this.gamestate == GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // grey
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate == GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)"; // solid black
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press spacebar to start", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate == GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(240, 52, 52, 1)"; // solid black
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "yellow";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  };

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (this.gamestate == GAMESTATE.PAUSED ||
        this.gamestate == GAMESTATE.MENU ||
        this.gamestate == GAMESTATE.GAMEOVER) return;

    // Update all object together
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

    if (this.bricks.length === 0) {
      this.currentLevel += 1;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

  }

  start() {

    if (this.gamestate !== GAMESTATE.MENU &&
        this.gamestate !== GAMESTATE.NEWLEVEL) return;

    // Fill level with bricks
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();

    // Combine all objects of the game in on object
    this.gameObjects = [this.ball, this.paddle];
    this.gameScore = 0;
    this.gamestate = GAMESTATE.RUNNING;
  }

}
