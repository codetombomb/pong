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
        // debug: true
      }
    },
    scene: [Pong]
  };

new Phaser.Game(config);