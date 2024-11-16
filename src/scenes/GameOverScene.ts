import 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload(): void {
    // Carregar a imagem de fundo
    this.load.image('gameOverBackground', '../assets/game-over-screen.png');
  }

  create(): void {
    // Adicionar a imagem de fundo
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'gameOverBackground').setOrigin(0.5);

    // Criar uma caixa de fundo com bordas arredondadas
    const backgroundBox = this.add.graphics();
    const boxWidth = 700;
    const boxHeight = 100;
    const boxX = this.cameras.main.centerX - boxWidth / 2;
    const boxY = this.cameras.main.centerY - 75;

    backgroundBox.fillStyle(0x000000, 0.8); // Cor preta com opacidade de 80%
    backgroundBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 20); // Bordas arredondadas com raio de 20

    // Adicionar instruções para reiniciar o jogo
    const instructionText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 25, 'Pressione ESPAÇO para reiniciar \nou ESC para retornar ao menu inicial', {
      fontSize: '32px',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    // Adicionar evento de teclado para reiniciar o jogo
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene'); // Reinicia o jogo voltando para a `GameScene`
    });

    this.input.keyboard.on('keydown-ESC', () => {
        this.scene.start('MainScene'); // Volta para a `MainScene`
      });
  }
}
