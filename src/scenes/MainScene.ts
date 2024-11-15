import * as Phaser from 'phaser';
import Snake from '../entities/Snake'; 

export default class MainScene extends Phaser.Scene {
  private snake: Snake;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Carregar a imagem da folha de sprites
    this.load.image('snakeTexture', 'phaser-ts-skeleton\assets\snake-graphics.png');
  }

  create() {
    // Instancia a cobra
    this.snake = new Snake(this, 'snakeTexture');
  }

  update() {
    // Chama o método para desenhar a cobra a cada quadro
    this.snake.drawSnake();
  }
}
