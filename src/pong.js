import Phaser from "phaser";

export class Pong extends Phaser.Scene {
  constructor() {
    super();
    this.gameOver = false;
    this.score = 0;
    this.paddleSpeed = 8;
    this.paddleSize = 0.3;
    this.ballSize = 0.5
    this.spaceBoost = 8;
  }

  preload() {
    this.load.spritesheet("left-paddle", "assets/sprites.png", {
      frameWidth: 50,
      frameHeight: 150,
    });

    this.load.atlas("atlas", "assets/sprites.png", "assets/atlas.json")
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.leftPaddle = this.add.sprite(30, 300, "left-paddle");
    this.ball = this.physics.add.image(200, 300, 'atlas', 'ball');
    
    this.ball.body.bounce.set(.9);
    this.leftPaddle.setScale(this.paddleSize);
    
    this.ball.setScale(this.ballSize)
    this.ball.setCollideWorldBounds(true);
    this.ball.setRandomPosition(267, 0, 267, 600)
    this.ball.setVelocityX(Math.floor(Math.random() * 101) - 400)
    this.ball.setVelocityY(Math.floor(Math.random() * 101) - 400)
  }
  update() {
    if (this.gameOver) return;
    if (this.cursors.down.isDown && this.cursors.space.isDown && this.leftPaddle.y <= 580) {
      this.leftPaddle.y += this.paddleSpeed + this.spaceBoost;
    }
    if (this.cursors.up.isDown && this.cursors.space.isDown && this.leftPaddle.y >= 20) {
      this.leftPaddle.y -= this.paddleSpeed + this.spaceBoost;
    }
    if (this.cursors.down.isDown && this.leftPaddle.y <= 580) {
      this.leftPaddle.y += this.paddleSpeed;
    }
    if (this.cursors.up.isDown && this.leftPaddle.y >= 20) {
      this.leftPaddle.y -= this.paddleSpeed;
    }
  }

  scorePoint() {}
}