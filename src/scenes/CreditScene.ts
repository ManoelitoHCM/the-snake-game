import 'phaser';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CreditsScene' });
  }

  create(): void {
    // Cor de fundo da cena
    this.cameras.main.setBackgroundColor('#222222');

    // Título dos créditos
    this.add.text(this.cameras.main.centerX, 100, 'Créditos', {
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Informações dos créditos em linhas separadas com espaçamento
    const creditLines = [
      'Desenvolvido por: Manoelito Holanda',
      'Ferramentas: Phaser, TypeScript, Tiled',
      'Música: Referências do Pixabay',
      'Inspirações: Jogo da cobrinha do Nokia',
      'Agradecimentos especiais: Terapeuta, família e amigos.'
    ];

    let startY = this.cameras.main.centerY - 100; // Posição Y inicial
    const lineSpacing = 50; // Espaçamento entre as linhas

    creditLines.forEach((line, index) => {
      this.add.text(this.cameras.main.centerX, startY + index * lineSpacing, line, {
        fontSize: '24px',
        color: '#ffffff',
      }).setOrigin(0.5);
    });

    // Instruções para retornar ao menu principal
    this.add.text(this.cameras.main.centerX, this.cameras.main.height - 100, 'Pressione ESC para retornar ao menu', {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Adicionar evento de teclado para voltar ao menu principal
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainScene'); // Troca para a cena do menu principal
    });
  }
}
