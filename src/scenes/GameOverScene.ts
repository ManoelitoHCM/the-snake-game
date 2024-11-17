import 'phaser';
import MusicController from '../entities/MusicController';
import PlayerInputHandler from '../entities/PlayerInputHandler';
// import ScoreService from '../services/ScoreService';

export default class GameOverScene extends Phaser.Scene {
  private musicController: MusicController;
  // private scoreService: ScoreService;
  private finalScore: number;
  private inputHandler: PlayerInputHandler;

  constructor() {
    super({ key: 'GameOverScene' });
    // this.scoreService = new ScoreService();
  }

  init(data: { score: number }): void {
    this.finalScore = data.score;
  }

  preload(): void {
    this.load.image('gameOverBackground', '../assets/images/game-over-screen.png');
    this.load.audio('gameOverMusic', '../assets/soundtrack/game-over.mp3');
  }

  create(): void {
    this.musicController = new MusicController(this, 'gameOverMusic');
    this.musicController.playMusic();

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'gameOverBackground').setOrigin(0.5);

    this.inputHandler = new PlayerInputHandler(this, this.finalScore, (playerName: string) => {
      // Salvar o score usando o serviço de score (comentado por enquanto)
      // await this.scoreService.saveScore(playerName, this.finalScore);
      alert(`Score de ${playerName} salvo com sucesso!`);
      
      this.inputHandler.disableInput();

      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Pressione ESPAÇO para reiniciar \nou ESC para retornar ao menu inicial', {
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
      }).setOrigin(0.5);

      this.input.keyboard.on('keydown-SPACE', () => {
        this.musicController.stopMusic();
        this.scene.start('GameScene');
      });

      this.input.keyboard.on('keydown-ESC', () => {
        this.musicController.stopMusic();
        this.scene.start('MainScene');
      });
    });
  }
}
