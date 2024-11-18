import 'phaser';
import Snake from './SnakeController';

export default class MovementController {
  private scene: Phaser.Scene;
  private snake: Snake;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private isGameControlEnabled: boolean = true;

  constructor(scene: Phaser.Scene, snake: Snake) {
    this.scene = scene;
    this.snake = snake;

    // Inicializa as setas direcionais
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  public updateDirection(): void {
    if (!this.cursors) return;

    // Detectar teclas de setas direcionais
    if (this.cursors.up.isDown && this.snake.direction !== 2) {
      this.snake.direction = 0; // Up
    } else if (this.cursors.down.isDown && this.snake.direction !== 0) {
      this.snake.direction = 2; // Down
    } else if (this.cursors.left.isDown && this.snake.direction !== 1) {
      this.snake.direction = 3; // Left
    } else if (this.cursors.right.isDown && this.snake.direction !== 3) {
      this.snake.direction = 1; // Right
    }
  }
}
