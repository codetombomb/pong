import Phaser from "phaser";

export class Pong extends Phaser.Scene {
  constructor() {
    super();
    this.gameOver = false;
    this.score = 0;
    this.paddleSpeed = 8;
    this.paddleSize = 0.3;
    this.spaceBoost = 8;
  }

  preload() {
    this.load.spritesheet("left-paddle", "assets/sprites.png", {
      frameWidth: 50,
      frameHeight: 150,
    });
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.leftPaddle = this.physics.add.sprite(30, 300, "left-paddle");
    this.leftPaddle.setScale(this.paddleSize);
    this.leftPaddle.setCollideWorldBounds(true);
  }
  update() {
    if (this.gameOver) return;
    if (this.cursors.down.isDown && this.cursors.space.isDown) {
      this.leftPaddle.y += this.paddleSpeed + this.spaceBoost;
    }
    if (this.cursors.up.isDown && this.cursors.space.isDown) {
      this.leftPaddle.y -= this.paddleSpeed + this.spaceBoost;
    }
    if (this.cursors.down.isDown) {
      this.leftPaddle.y += this.paddleSpeed;
    }
    if (this.cursors.up.isDown) {
      this.leftPaddle.y -= this.paddleSpeed;
    }
  }

  scorePoint() {}
}
