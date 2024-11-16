import 'phaser';
import MusicController from '../entities/MusicController';

export default class PauseScene extends Phaser.Scene {
  private musicController: MusicController;

  constructor() {
    super({ key: 'PauseScene' });
  }

  create(): void {
    const gameScene = this.scene.get('GameScene') as any;
    this.musicController = gameScene.musicController;
    this.musicController.pauseMusic();

    // Texto de "PAUSE"
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'PAUSE', {
      fontSize: '64px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Detectar quando "ESC" é pressionado novamente para retomar o jogo
    this.input.keyboard.on('keydown-ESC', () => {
      this.musicController.resumeMusic(); // Retoma a música
      this.scene.stop(); // Para a cena de pausa
      this.scene.resume('GameScene'); // Retoma a cena do jogo
    });
  }
}
