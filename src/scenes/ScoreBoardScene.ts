import 'phaser';
import ScoreService from '../services/ScoreService';

export default class ScoreBoardScene extends Phaser.Scene {
  private scoreService: ScoreService;
  private scores: { name: string, score: number }[];

  constructor() {
    super({ key: 'ScoreBoardScene' });
    this.scoreService = new ScoreService();
    this.scores = [];
  }

  preload(): void {
    // Carregar a imagem de fundo
    this.load.image('scoreBoardBackground', '../assets/images/score-board.png');
  }

  async create(): Promise<void> {
    // Adicionar a imagem de fundo
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'scoreBoardBackground').setOrigin(0.5);

    // Título
    this.add.text(this.cameras.main.centerX, 50, 'Score Board', {
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5);

    // Recuperar os dados do banco de dados
    try {
      this.scores = await this.scoreService.getScores();
      this.displayScores();
    } catch (error) {
      console.error('Erro ao recuperar os scores:', error);
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Erro ao carregar placar', {
        fontSize: '24px',
        color: '#ff0000',
      }).setOrigin(0.5);
    }

    // Botão para voltar ao menu principal
    this.add.text(this.cameras.main.centerX, this.cameras.main.height - 50, 'Pressione ESC para voltar ao menu', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 5, y: 2 },
    }).setOrigin(0.5);

    // Evento de teclado para voltar ao menu principal
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainScene');
    });
  }

  private displayScores(): void {
    // Ordenar do maior para o menor e exibir a lista de pontuações
    this.scores.sort((a, b) => b.score - a.score);
    let startY = 150;
    const lineSpacing = 40;

    this.scores.forEach((entry, index) => {
      this.add.text(this.cameras.main.centerX - 150, startY + index * lineSpacing, `${index + 1}. ${entry.name}`, {
        fontSize: '24px',
        color: '#ffffff',
      });

      this.add.text(this.cameras.main.centerX + 150, startY + index * lineSpacing, `${entry.score}`, {
        fontSize: '24px',
        color: '#ffffff',
      }).setOrigin(1, 0);
    });
  }
}
