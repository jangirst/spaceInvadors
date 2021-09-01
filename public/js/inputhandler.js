export default class InputHandler {

  constructor(paddle, game) {

    this.game = game;

    document.addEventListener("keydown", (event) => {

      switch(event.keyCode) {
        case 37: // Left arrow key
          paddle.moveLeft();
          break;
        case 39: // Right arrow key
          paddle.moveRight();
          break;
        case 80: // P
          game.togglePause();
          break;
        case 32: // Spacebar
          game.start();
          break;
      }

    });

    document.addEventListener("keyup", (event) => {

      switch(event.keyCode) {
        case 37:
          paddle.stop();
          break;
        case 39:
          paddle.stop();
          break;
      }

    });
  }
}
