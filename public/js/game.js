import Ball from "./ball.js";
import InputHandler from "./inputhandler.js";
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

  }

  start() {
    // Creating items
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);

    // Combine all objects of the game in on object
    this.gameObjects = [this.ball, this.paddle];

    // Add InputHandler:
    new InputHandler(this.paddle);
  }
}
