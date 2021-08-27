export default class Ball {

  constructor(gameWidth, gameHeight) {
    this.image = document.getElementById("img_ball");
    this.position = { x: 10, y: 10 };
    this.speed = { x: 2, y: 2 };
    this.size = 16;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Collision with upper or lower border
    if ((this.position.x  + this.size) > this.gameWidth || this.position.x < 0) {
      this.speed.x *= -1;
    }

    // Collision with the right or left border
    if ((this.position.y + this.size) > this.gameHeight || this.position.y < 0) {
      this.speed.y *= -1;
    }

  }
}