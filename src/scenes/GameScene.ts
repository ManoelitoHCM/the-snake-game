import 'phaser';
import Snake from '../entities/SnakeController';
import GameMap from '../entities/MapController';
import AppleController from '../entities/AppleController';
import MusicController from '../entities/MusicController';

export default class GameScene extends Phaser.Scene {
  private snake: Snake;
  private gameMap: GameMap;
  private appleController: AppleController;
  private musicController: MusicController;
  private score: number = 0;
  private scoreText: Phaser.GameObjects.Text;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private pauseKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // Carregar os recursos do mapa e da cobra
    this.load.tilemapTiledJSON('map', '../assets/images/map_json.json');
    this.load.image('tile_set', '../assets/images/terrain_tiles_v2.png');
    this.load.spritesheet('snakeSprite', '../assets/images/snake-graphics.png', {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.audio('backgroundMusic', '../assets/soundtrack/game-start.mp3');
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

    // Inicializar o controlador de música e tocar a música de fundo
    this.musicController = new MusicController(this, 'backgroundMusic');
    this.musicController.playMusic();

    this.score = 0;
    // Adicionar o placar na parte superior da tela
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });

    // Configurar tecla de pausa para música
    const musicKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    musicKey.on('down', () => {
      if (this.musicController.isPlaying()) {
        this.musicController.pauseMusic();
      } else {
        this.musicController.resumeMusic();
      }
    });

    // Configurar tecla de pausa
    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    // Inicializar eventos de teclado
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number): void {

    // Verificar se a tecla de pausa foi pressionada
    if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
      this.scene.pause(); // Pausa a `GameScene`
      this.scene.launch('PauseScene'); // Lança a `PauseScene`
      return;
    }

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

      if (this.gameMap.isOutOfBounds(nextMove.x, nextMove.y)) {
        console.error('Você atingiu os limites do mapa!');
        console.log("posicoes: " + nextMove.x, nextMove.y)
        this.gameOver();
        return;
      }

      if (this.snake.checkSelfCollision(nextMove.x, nextMove.y)) {
        console.error('Você encontrou um obstáculo!');
        this.gameOver();
        return;
      }

      // Verificar colisão com maçãs
      if (this.appleController.checkCollisionWithSnake(this.snake)) {
        console.log('A cobra comeu uma maçã!');
        this.snake.grow(); // Faz a cobra crescer
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);

        // Aumentar a velocidade a cada 5 maçãs (até 20)
        if (this.score % 5 === 0 && this.score < 20) {
          this.snake.increaseSpeed(0.002); // Aumenta a velocidade em uma quantidade específica
          console.log(`Velocidade aumentada! Nova velocidade: ${this.snake.getSpeed()}`);
        }

        if (this.score % 10 === 0) {
          this.appleController.addApple(this.snake, 2); // Adiciona duas maçãs após certas condições
        } else {
          this.appleController.addApple(this.snake, 1);
        }
      }

      // Mover a cobra
      this.snake.move();
    }

    // Redesenhar a cobra após o movimento
    this.snake.drawSnake();
  }

  private gameOver(): void {
    console.log('Game Over');
    this.musicController.stopMusic(); // Parar a música quando o jogo acaba
    this.scene.start('GameOverScene'); // Troca para a cena de "Game Over"
  }
}
