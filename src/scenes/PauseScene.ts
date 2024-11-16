import 'phaser';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create(): void {
    // Texto de "PAUSE"
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'PAUSE', {
      fontSize: '64px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Detectar quando "ESC" é pressionado novamente para retomar o jogo
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop(); // Para a cena de pausa
      this.scene.resume('GameScene'); // Retoma a cena do jogo
    });
  }
}
