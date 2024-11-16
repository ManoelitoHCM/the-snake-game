import 'phaser';
import MusicController from '../entities/MusicController';

export default class MainScene extends Phaser.Scene {
  private static musicController: MusicController | null = null;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('menuBackground', '../assets/images/main-screen.png');
    this.load.audio('menuMusic', '../assets/soundtrack/main-scene.mp3');
  }

  create(): void {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'menuBackground').setOrigin(0.5);

    // Verificar se a música já está tocando para evitar duplicatas
    if (!MainScene.musicController) {
      MainScene.musicController = new MusicController(this, 'menuMusic');
      MainScene.musicController.playMusic();
    } else if (!MainScene.musicController.isPlaying()) {
      MainScene.musicController.playMusic();
    }

    const startZone = this.add.zone(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 230,
      150,
      45
    ).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
    startZone.on('pointerdown', () => {
      MainScene.musicController.stopMusic(); // Parar a música antes de iniciar o jogo
      this.scene.start('GameScene');
    });

    const scoreZone = this.add.zone(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 185,
      150,
      45
    ).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
    scoreZone.on('pointerdown', () => {
      // this.musicController.stopMusic(); // Parar a música ao ir para o placar
      this.scene.start('ScoreBoardScene');
    });

    const creditsZone = this.add.zone(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 140,
      150,
      45
    ).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
    creditsZone.on('pointerdown', () => {
      // this.musicController.stopMusic(); // Parar a música ao ir para os créditos
      this.scene.start('CreditsScene');
    });
  }
}
