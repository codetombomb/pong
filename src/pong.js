import Phaser from "phaser";

export class Pong extends Phaser.Scene {
  constructor() {
    super();
    this.gameOver = false;
    this.score = 0;
    this.collidingWith = null;
    this.paddleSpeed = 8;
    this.paddleSize = 0.45;
    this.ballSize = 0.5;
    this.ballDirectionUp = true;
    this.spaceBoost = 8;
    this.maxScore = 10
    this.playerScores = {
      red: 0,
      blue: 0,
    };
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
    this.score = this.sound.add("score", { volume: 0.04 });

    this.redScore = this.add.text(120, 120, `${this.playerScores.red}`, {
      fontSize: "80px",
      fill: "red",
      fontFamily: "JustMyType",
    });
    this.blueScore = this.add.text(680, 120, `${this.playerScores.blue}`, {
      fontSize: "80px",
      fill: "blue",
      fontFamily: "JustMyType",
    });

    this.leftPaddle = this.physics.add.image(30, 300, "left-paddle");
    this.rightPaddle = this.physics.add.image(770, 300, "atlas", "rightPaddle");
    this.ball = this.physics.add.image(200, 300, "atlas", "ball");

    this.leftPaddle.setScale(this.paddleSize);
    this.leftPaddle.body.setSize(10, 110, true);
    this.leftPaddle.body.setImmovable();
    this.leftPaddle.body.setFrictionY(1);

    this.rightPaddle.setScale(this.paddleSize);
    this.rightPaddle.body.setSize(10, 110, true);
    this.rightPaddle.body.setImmovable();
    this.rightPaddle.body.setFrictionY(1);

    this.ball.setCollideWorldBounds(true);
    this.ball.setDrag(0, 0);
    this.ball.body.bounce.set(1);
    this.ball.body.setSize(15, 15, true);
    this.ball.setScale(this.ballSize);
    this.ball.body.collideWorldBounds = true;
    this.ball.body.setFrictionX(1);
    this.ball.body.setFrictionY(1);

    this.ball.body.onWorldBounds = true;

    this.ball.setRandomPosition(277, 0, 267, 600);
    this.ball.setVelocityX(Math.floor(Math.random() * 101) - 400);
    this.ball.setVelocityY(Math.floor(Math.random() * 101) - 400);
  }
  update() {
    if (this.gameOver) return;

    this.physics.collide(this.leftPaddle, this.ball);
    this.physics.add.collider(this.leftPaddle, this.ball, () => {
      if (this.cursors.down.isDown && this.ballDirectionUp) {
        this.ball.body.setVelocityY(
          this.ball.body.velocity.y + 50 - this.ball.body.velocity.y * 2
        );
      } else if (this.cursors.up.isDown && !this.ballDirectionUp) {
        this.ball.body.setVelocityY(
          this.ball.body.velocity.y - 50 - this.ball.body.velocity.y * 2
        );
      } else {
        console.log("Paddle is stationary");
      }
      this.bounce.play();
    });

    this.physics.collide(this.rightPaddle, this.ball);
    this.physics.add.collider(this.rightPaddle, this.ball, () => {
      this.bounce.play();
    });

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (up && this.collidingWith !== "up") {
        this.collidingWith = "up";
        this.ballDirectionUp = false;
        this.bounce.play();
      }
      if (down && this.collidingWith !== "down") {
        this.collidingWith = "down";
        this.ballDirectionUp = true;
        this.bounce.play();
      }
      if (left && this.collidingWith !== "left") {
        this.collidingWith = "left";
        this.scorePoint("blue");
      }
      if (right && this.collidingWith !== "right") {
        this.collidingWith = "right";
        this.scorePoint("red");
      }
    });

    if (this.ball.y < this.rightPaddle.y) {
      this.rightPaddle.y -= this.paddleSpeed - 2.75;
    } else {
      this.rightPaddle.y += this.paddleSpeed - 2.75;
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
    this.playerScores[side] += 1;
    this[`${side}Score`].setText(this.playerScores[side]);
    if (this.playerScores[side] === this.maxScore) this.gameOver = true;
    this.ball.destroy();
    this.leftPaddle.destroy();
    this.rightPaddle.destroy();
    this.redScore.destroy();
    this.blueScore.destroy();
    this.score.play();
    setTimeout(() => {
      if (!this.gameOver) {
        this.create();
      } else {
        const winner = this.playerScores.red === this.maxScore ? "red" : "blue"
        this.add.text(
          255,
          100,
          `${winner.toUpperCase()} wins!`,
          { fontSize: "100px", fill: winner, fontFamily: "JustMyType" }
        );
        this.add.text(180, 220, "Game Over", {
          fontSize: "150px",
          fill: "white",
          fontFamily: "JustMyType",
        });
      }
    }, 3000);
  }
}
