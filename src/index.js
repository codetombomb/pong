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
  function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

loadFont("JustMyType", "/assets/fonts/just-my-type.ttf");

new Phaser.Game(config);