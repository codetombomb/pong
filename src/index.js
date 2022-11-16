import { Pong } from './pong';
import Phaser from 'phaser';
import './index.css';

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'root',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [Pong]
  };

new Phaser.Game(config);