import 'phaser';
import mainScreen from '../assets/main-screen.png';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('menuBackground', mainScreen);
  }

  create(): void {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'menuBackground').setOrigin(0.5);

    const startZone = this.add.zone(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 230,
      150,
      45
    ).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
    startZone.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    const scoreZone = this.add.zone(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 185,
      150,
      45
    ).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
    scoreZone.on('pointerdown', () => {
      this.scene.start('ScoreBoardScene');
    });

    const creditsZone = this.add.zone(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 140,
      150,
      45
    ).setOrigin(0.5).setInteractive({ cursor: 'pointer' });
    creditsZone.on('pointerdown', () => {
      this.scene.start('CreditsScene');
    });
  }
}
