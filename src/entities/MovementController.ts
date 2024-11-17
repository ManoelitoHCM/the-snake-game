import 'phaser';
import Snake from './SnakeController';

export default class MovementController {
  private scene: Phaser.Scene;
  private snake: Snake;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private isArrowKeysEnabled: boolean = false;
  private isGameControlEnabled: boolean = true;

  constructor(scene: Phaser.Scene, snake: Snake) {
    this.scene = scene;
    this.snake = snake;
  }

  public setGameControlEnabled(enabled: boolean): void {
    this.isGameControlEnabled = enabled;
    if (!enabled) {
      this.removeKeyListeners();
    } else {
      this.restoreKeyListeners();
    }
  }

  public enableArrowKeys(): void {
    if (!this.isArrowKeysEnabled) {
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.isArrowKeysEnabled = true;
    }
  }

  public disableArrowKeys(): void {
    this.isArrowKeysEnabled = false;
    if (this.cursors) {
      this.removeSpecificKeys(Object.values(this.cursors));
    }
  }

  public updateDirection(): void {
    if (!this.isGameControlEnabled || !this.isArrowKeysEnabled || !this.cursors) return;

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

  private removeKeyListeners(): void {
    this.scene.input.keyboard.removeAllListeners();
  }

  private removeSpecificKeys(keys: Phaser.Input.Keyboard.Key[]): void {
    keys.forEach(key => this.scene.input.keyboard.removeKey(key.keyCode));
  }

  private restoreKeyListeners(): void {
    if (this.isArrowKeysEnabled) this.enableArrowKeys();
  }
}
