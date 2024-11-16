import 'phaser';

export default class ScoreBoardScene extends Phaser.Scene {
  private scores: { name: string, score: number }[] = [
    { name: 'Jogador1', score: 150 },
    { name: 'Jogador2', score: 120 },
    { name: 'Jogador3', score: 100 },
    { name: 'Jogador4', score: 90 },
    { name: 'Jogador5', score: 80 },
  ];

  constructor() {
    super({ key: 'ScoreBoardScene' });
  }

  preload(): void {
    // Carregar a imagem de fundo
    this.load.image('scoreBoardBackground', '../assets/score-board-background.png');
  }

  create(): void {
    // Adicionar a imagem de fundo
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'scoreBoardBackground').setOrigin(0.5);

    // Título
    this.add.text(this.cameras.main.centerX, 50, 'Score Board', {
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Exibir a lista de pontuações
    this.scores.sort((a, b) => b.score - a.score); // Ordenar do maior para o menor
    let startY = 150;
    const lineSpacing = 40;

    this.scores.forEach((entry, index) => {
      this.add.text(this.cameras.main.centerX - 100, startY + index * lineSpacing, `${index + 1}. ${entry.name}`, {
        fontSize: '24px',
        color: '#ffffff',
      });

      this.add.text(this.cameras.main.centerX + 100, startY + index * lineSpacing, `${entry.score}`, {
        fontSize: '24px',
        color: '#ffffff',
      }).setOrigin(1, 0);
    });

    // Botão para voltar ao menu principal
    this.add.text(this.cameras.main.centerX, this.cameras.main.height - 50, 'Pressione ESC para voltar ao menu', {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Evento de teclado para voltar ao menu principal
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainScene');
    });
  }
}
