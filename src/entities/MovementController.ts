import 'phaser';
import Snake from './SnakeController';

export default class MovementController {
  private scene: Phaser.Scene;
  private snake: Snake;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys: { up: Phaser.Input.Keyboard.Key, down: Phaser.Input.Keyboard.Key, left: Phaser.Input.Keyboard.Key, right: Phaser.Input.Keyboard.Key };

  constructor(scene: Phaser.Scene, snake: Snake) {
    this.scene = scene;
    this.snake = snake;

    // Inicializar as teclas de movimento (setas e WASD)
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.wasdKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }) as { up: Phaser.Input.Keyboard.Key, down: Phaser.Input.Keyboard.Key, left: Phaser.Input.Keyboard.Key, right: Phaser.Input.Keyboard.Key };
  }

  public updateDirection(): void {
    // Verificar entradas de teclado para ajustar a direção da cobra
    if ((this.cursors.up.isDown || this.wasdKeys.up.isDown) && this.snake.direction !== 2) {
      this.snake.direction = 0; // Up
    } else if ((this.cursors.down.isDown || this.wasdKeys.down.isDown) && this.snake.direction !== 0) {
      this.snake.direction = 2; // Down
    } else if ((this.cursors.left.isDown || this.wasdKeys.left.isDown) && this.snake.direction !== 1) {
      this.snake.direction = 3; // Left
    } else if ((this.cursors.right.isDown || this.wasdKeys.right.isDown) && this.snake.direction !== 3) {
      this.snake.direction = 1; // Right
    }
  }
}
