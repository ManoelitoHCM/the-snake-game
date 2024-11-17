import 'phaser';
import MusicController from '../entities/MusicController';
import PlayerInputHandler from '../entities/PlayerInputHandler';
import ScoreService from '../services/ScoreService';

import gameOverBackground from '../assets/images/game-over-screen.png';
import gameOverMusic from '../assets/soundtrack/game-over.mp3';

export default class GameOverScene extends Phaser.Scene {
  private musicController: MusicController;
  private scoreService: ScoreService;
  private finalScore: number;
  private inputHandler: PlayerInputHandler;

  constructor() {
    super({ key: 'GameOverScene' });
    this.scoreService = new ScoreService();
  }

  init(data: { score: number }): void {
    this.finalScore = data.score;
  }

  preload(): void {
    this.load.image('gameOverBackground', gameOverBackground);
    this.load.audio('gameOverMusic', gameOverMusic);
  }

  async create(): Promise<void> {
    this.musicController = new MusicController(this, 'gameOverMusic');
    this.musicController.playMusic();

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'gameOverBackground').setOrigin(0.5);

    this.inputHandler = new PlayerInputHandler(this, this.finalScore, async (playerName: string) => {
      console.log('Função de salvar score chamada com o nome:', playerName);
      try {
        await this.scoreService.saveScore(playerName, this.finalScore);
        console.log('Score salvo com sucesso.');
        alert(`Score de ${playerName} salvo com sucesso!`);

        // Remove a entrada e o botão após o score ser salvo
        this.inputHandler.removeInput();
      } catch (error) {
        console.error('Erro ao salvar o score:', error);
        alert('Houve um erro ao salvar o score.');
      }

      // Criar uma caixa arredondada para o texto
      const boxWidth = 700;
      const boxHeight = 100;
      const boxX = this.cameras.main.centerX - boxWidth / 2;
      const boxY = this.cameras.main.centerY + 50;

      const backgroundBox = this.add.graphics();
      backgroundBox.fillStyle(0x000000, 0.8); // Preto com opacidade de 80%
      backgroundBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 20); // Bordas arredondadas com raio de 20

      // Adicionar o texto de instruções
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
