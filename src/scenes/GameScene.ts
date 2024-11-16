import 'phaser';
import Snake from '../entities/Snake';
import GameMap from '../entities/GameMap'; // Certifique-se de ajustar o caminho

export default class GameScene extends Phaser.Scene {
  private snake: Snake;
  private gameMap: GameMap;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // Carregar os recursos do mapa e da cobra
    this.load.tilemapTiledJSON('map', '../assets/map_json.json');
    this.load.image('tile_set', '../assets/terrain_tiles_v2.png');
    this.load.spritesheet('snakeSprite', '../assets/snake-graphics.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create(): void {
    // Inicializar o mapa
    this.gameMap = new GameMap(this, 'map', 'tile_set', 'tile_set', this.cameras.main);

    this.snake = new Snake(this, 20, 18, 1, 0.01, 4, 'snakeSprite', 32, 32);
    this.snake.drawSnake();

    // Inicializar eventos de teclado
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number): void {
    // Verificar entradas do teclado para ajustar a direção da cobra
    if (this.cursors.up.isDown && this.snake.direction !== 2) {
      this.snake.direction = 0; // Up
    } else if (this.cursors.down.isDown && this.snake.direction !== 0) {
      this.snake.direction = 2; // Down
    } else if (this.cursors.left.isDown && this.snake.direction !== 1) {
      this.snake.direction = 3; // Left
    } else if (this.cursors.right.isDown && this.snake.direction !== 3) {
      this.snake.direction = 1; // Right
    }

    if (this.snake.canMove(delta)) {
      const nextMove = this.snake.nextPosition();

      console.log("next move " + nextMove.x, nextMove.y)
      // return this.offsetX > x || this.offsetY > y || x >= (this.getBounds().width + this.offsetX) || y >= (this.getBounds().height + this.offsetY);

      console.log("limites inferiores mapa: " + this.gameMap.getOffsets().offsetX / 32, this.gameMap.getOffsets().offsetY / 32)
      console.log("limites superiores mapa: " + (this.gameMap.getBounds().width + this.gameMap.getOffsets().offsetX) / 32, (this.gameMap.getBounds().height + this.gameMap.getOffsets().offsetY) / 32)

      if (this.gameMap.isOutOfBounds(nextMove.x, nextMove.y)) {
        console.error('A cobra atingiu os limites do mapa!');
        return;
      }

      // Mover a cobra
      this.snake.move();
    }

    // Redesenhar a cobra após o movimento
    this.snake.drawSnake();
  }
}
