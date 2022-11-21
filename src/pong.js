import Phaser from "phaser";

export class Pong extends Phaser.Scene {
  constructor() {
    super();
    this.gameOver = false;
    this.score = 0;
    this.paddleSpeed = 8;
    this.paddleSize = .5;
    this.ballSize = .5;
    this.spaceBoost = 8;
  }

  preload() {
    this.load.spritesheet("left-paddle", "assets/sprites.png", {
      frameWidth: 50,
      frameHeight: 150,
    });

    this.load.atlas("atlas", "assets/sprites.png", "assets/atlas.json");
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.leftPaddle = this.physics.add.image(30, 300, "left-paddle");
    this.ball = this.physics.add.image(200, 300, "atlas", "ball");
    
    this.leftPaddle.setScale(this.paddleSize);
    this.leftPaddle.body.setSize(10, 110, true)
    this.leftPaddle.body.setImmovable()
    
    this.ball.setDrag(-10, -10);
    this.ball.body.bounce.set(0.9);
    this.ball.body.setSize(15, 15, true)
    this.ball.setScale(this.ballSize);
    this.ball.setCollideWorldBounds(true);
    this.ball.setRandomPosition(267, 0, 267, 600);
    this.ball.setVelocityX(Math.floor(Math.random() * 101) - 400);
    this.ball.setVelocityY(Math.floor(Math.random() * 101) - 400);
  }
  update() {
    this.physics.collide(this.leftPaddle, this.ball);
    this.physics.add.collider(
      this.leftPaddle,
      this.ball,
      function (leftPaddle, ball) {
        console.log(leftPaddle, "Hit!", ball);
      }
    );
    if (this.gameOver) return;

    if (
      this.cursors.down.isDown &&
      this.cursors.space.isDown &&
      this.leftPaddle.y <= 580
    ) {
      this.leftPaddle.y += this.paddleSpeed + this.spaceBoost;
    }
    if (
      this.cursors.up.isDown &&
      this.cursors.space.isDown &&
      this.leftPaddle.y >= 20
    ) {
      this.leftPaddle.y -= this.paddleSpeed + this.spaceBoost;
    }
    if (this.cursors.down.isDown && this.leftPaddle.y <= 570) {
      this.leftPaddle.y += this.paddleSpeed;
    }
    if (this.cursors.up.isDown && this.leftPaddle.y >= 30) {
      this.leftPaddle.y -= this.paddleSpeed;
    }
  }

  scorePoint() {}
}
