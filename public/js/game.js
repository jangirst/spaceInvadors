import Ball from "./ball.js";
import Brick from "./brick.js"
import InputHandler from "./inputhandler.js";
import {buildLevel, level1}  from "./levels.js"
import Paddle from "./paddle.js";

export default class Game {

  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  draw(ctx) {
    // Draw all object together
    this.gameObjects.forEach(object => {
      object.draw(ctx);
    });
  }

  update(deltaTime) {
    // Update all object together
    this.gameObjects.forEach(object => {
      object.update(deltaTime);
    });

    this.gameObjects = this.gameObjects.filter((object) => {
      return !object.markedForDeletion;
    });

  }

  start() {
    // Creating items
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);

    // Fill level with bricks
    let bricks = buildLevel(this, level1);

    // Combine all objects of the game in on object
    this.gameObjects = [this.ball, this.paddle, ...bricks];

    // Add InputHandler:
    new InputHandler(this.paddle);
  }
}
