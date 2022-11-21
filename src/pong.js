import Phaser from "phaser";

export class Pong extends Phaser.Scene {
  constructor() {
    super();
    this.gameOver = false;
    this.score = 0;
    this.paddleSpeed = 8;
    this.paddleSize = 0.5;
    this.ballSize = 0.5;
    this.spaceBoost = 8;
  }

  preload() {
    this.load.spritesheet("left-paddle", "assets/sprites.png", {
      frameWidth: 50,
      frameHeight: 150,
    });

    this.load.atlas("atlas", "assets/sprites.png", "assets/atlas.json");
    this.load.audio("bounce", "assets/audio/sound-effects/bounce-effect.mp3");
    this.load.audio("score", "assets/audio/sound-effects/score-effect.wav");
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.bounce = this.sound.add("bounce");
    this.score = this.sound.add("score", {volume: 0.1});

    this.leftPaddle = this.physics.add.image(30, 300, "left-paddle");
    this.rightPaddle = this.physics.add.image(770, 300, "atlas", "rightPaddle");
    this.ball = this.physics.add.image(200, 300, "atlas", "ball");

    this.leftPaddle.setScale(this.paddleSize);
    this.leftPaddle.body.setSize(10, 110, true);
    this.leftPaddle.body.setImmovable();

    this.rightPaddle.setScale(this.paddleSize);
    this.rightPaddle.body.setSize(10, 110, true);
    this.rightPaddle.body.setImmovable();

    this.ball.setDrag(-10, -10);
    this.ball.body.bounce.set(0.9);
    this.ball.body.setSize(15, 15, true);
    this.ball.setScale(this.ballSize);
    this.ball.setCollideWorldBounds(true);
    this.ball.body.collideWorldBounds = true;

    this.ball.body.onWorldBounds = true;

    this.ball.setRandomPosition(267, 0, 267, 600);
    this.ball.setVelocityX(Math.floor(Math.random() * 101) - 400);
    this.ball.setVelocityY(Math.floor(Math.random() * 101) - 400);
  }
  update() {
    if (this.gameOver) return;

    this.physics.collide(this.leftPaddle, this.ball);
    this.physics.add.collider(this.leftPaddle, this.ball, () => {
      this.bounce.play();
    });
    
    this.physics.collide(this.rightPaddle, this.ball);
    this.physics.add.collider(this.rightPaddle, this.ball, () => {
      this.bounce.play();
    });

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if(up) this.bounce.play();
      if(down) this.bounce.play();
      if(left) {
        this.score.play()
        this.scorePoint("blue")
      }
      if(right) {
        this.score.play()
        this.scorePoint("red")
      }
    });

    if (this.ball.y < this.rightPaddle.y) {
      this.rightPaddle.y -= this.paddleSpeed - 4
    } else {
      this.rightPaddle.y += this.paddleSpeed - 4
    }

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

  scorePoint(side) {
    console.log(side, " scored!")
  }
}
