import 'phaser';
import Snake from '../entities/SnakeController';
import GameMap from '../entities/MapController';
import AppleController from '../entities/AppleController';
import MusicController from '../entities/MusicController';
import MovementController from '../entities/MovementController';

export default class GameScene extends Phaser.Scene {
  private snake: Snake;
  private gameMap: GameMap;
  private appleController: AppleController;
  private musicController: MusicController;
  private movementController: MovementController;
  private score: number = 0;
  private scoreText: Phaser.GameObjects.Text;
  private pauseKey: Phaser.Input.Keyboard.Key;
  private isHighSpeedMusicPlaying: boolean = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    this.load.tilemapTiledJSON('map', '../assets/images/map_json.json');
    this.load.image('tile_set', '../assets/images/terrain_tiles_v2.png');
    this.load.spritesheet('snakeSprite', '../assets/images/snake-graphics.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.audio('backgroundMusic', '../assets/soundtrack/game-start.mp3');
    this.load.audio('highSpeedMusic', '../assets/soundtrack/fast-snake.mp3');
  }

  create(): void {
    console.log('Inicializando o mapa...');
    this.gameMap = new GameMap(this, 'map', 'tile_set', 'tile_set', this.cameras.main);

    console.log('Inicializando a cobra...');
    this.snake = new Snake(this, 20, 18, 1, 0.01, 4, 'snakeSprite', 32, 32);
    this.snake.drawSnake();

    console.log('Inicializando o gerenciador de maçãs...');
    this.appleController = new AppleController(this, this.gameMap, 'snakeSprite', 15);
    this.appleController.addApple(this.snake);

    this.musicController = new MusicController(this, 'backgroundMusic');
    this.musicController.playMusic();

    this.movementController = new MovementController(this, this.snake);

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });

    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(time: number, delta: number): void {
    if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
      this.scene.pause();
      this.musicController.pauseMusic();
      this.scene.launch('PauseScene');
      return;
    }

    this.movementController.updateDirection();

    if (this.snake.canMove(delta)) {
      const nextMove = this.snake.nextPosition();
      if (this.gameMap.isOutOfBounds(nextMove.x, nextMove.y) || this.snake.checkSelfCollision(nextMove.x, nextMove.y)) {
        this.gameOver();
        return;
      }

      if (this.appleController.checkCollisionWithSnake(this.snake)) {
        this.snake.grow();
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.score % 5 === 0 && this.score < 20) {
          this.snake.increaseSpeed(0.002);
        }

        if (this.score > 20 && !this.isHighSpeedMusicPlaying) {
          this.musicController.changeTrack('highSpeedMusic');
          this.isHighSpeedMusicPlaying = true;
        }

        if (this.score % 10 === 0) {
          this.appleController.addApple(this.snake, 2);
        } else {
          this.appleController.addApple(this.snake, 1);
        }
      }

      this.snake.move();
    }

    this.snake.drawSnake();
  }

  private gameOver(): void {
    this.musicController.stopMusic();
    this.scene.start('GameOverScene');
  }
}
