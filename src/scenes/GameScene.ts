import 'phaser';
import Snake from '../entities/Snake';
import GameMap from '../entities/GameMap'; // Certifique-se de ajustar o caminho

export default class GameScene extends Phaser.Scene {
  private snake: Snake;
  private gameMap: GameMap;

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
    this.gameMap = new GameMap(this, 'map', 'tile_set', 'tile_set', this.cameras.main); //, this.cameras.main);

    const mapBounds = this.gameMap.getBounds();
    // const offsetX = (this.cameras.main.width - mapBounds.width) / 2;
    // const offsetY = (this.cameras.main.height - mapBounds.height) / 2;

    // console.log('Offsets:', offsetX, offsetY);
    // console.log('Dimensões do mapa:', this.gameMap.getBounds().width, this.gameMap.getBounds().height);

    // const startX = Math.floor((mapBounds.width / 2) / 32) + offsetX / 32; 
    // const startY = Math.floor((mapBounds.height / 2) / 32) + offsetY / 32;
    // console.log('Coordenadas iniciais ajustadas da cobra:', startX, startY);

    // Inicializar a cobra
    this.snake = new Snake(this, 5, 5, 1, 0.01, 4, 'snakeSprite', 32, 32);
    this.snake.drawSnake();
  }

  update(time: number, delta: number): void {
    if (this.snake.canMove(delta)) {
        const nextMove = this.snake.nextPosition();

        // Verifique se a próxima posição em pixels está dentro dos limites do mapa com offset
        // const tileWidth = this.snake.getTileWidth();
        // const tileHeight = this.snake.getTileHeight();
        // const offsetX = (this.cameras.main.width - this.gameMap.getBounds().width) / 2;
        // const offsetY = (this.cameras.main.height - this.gameMap.getBounds().height) / 2;

        // const nextPosX = nextMove.x * tileWidth + offsetX;
        // const nextPosY = nextMove.y * tileHeight + offsetY;

        // const mapWidth = this.gameMap.getBounds().width + offsetX;
        // const mapHeight = this.gameMap.getBounds().height + offsetY;

        // Verifique se a posição está fora dos limites
        // if (
            // nextPosX < offsetX || 
            // nextPosY < offsetY || 
            // nextPosX >= mapWidth || 
            // nextPosY >= mapHeight
        // ) {
        //     console.error('A cobra atingiu os limites do mapa!');
        //     return;
        // }

        this.snake.move();
    }

    this.snake.drawSnake();
}
}
