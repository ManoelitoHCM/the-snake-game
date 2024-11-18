import 'phaser';
import ScoreService from '../services/ScoreService';

import scoreBoard from '../assets/images/score-board.png';

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
    this.load.image('scoreBoardBackground', scoreBoard);
  }

  async create(): Promise<void> {
    // Adicionar a imagem de fundo
    const background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'scoreBoardBackground').setOrigin(0.5);
    
    // Calcular dimensões proporcionais com base no tamanho da imagem
    const scaleFactor = Math.min(this.cameras.main.width / background.width, this.cameras.main.height / background.height);
    background.setScale(scaleFactor);

    // Título
    this.add.text(this.cameras.main.centerX, background.y - (background.displayHeight / 2) + 50, 'Score Board', {
      fontSize: `${32 * scaleFactor}px`,
      color: '#000000',
      fontStyle: 'bold',
      backgroundColor: '#ffffff',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5);

    // Recuperar os dados do banco de dados
    try {
      this.scores = await this.scoreService.getScores();
      this.displayScores(background, scaleFactor);
    } catch (error) {
      console.error('Erro ao recuperar os scores:', error);
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Erro ao carregar placar', {
        fontSize: `${24 * scaleFactor}px`,
        color: '#ff0000',
      }).setOrigin(0.5);
    }

    // Botão para voltar ao menu principal
    this.add.text(this.cameras.main.centerX, this.cameras.main.height - 50, 'Pressione ESC para voltar ao menu', {
      fontSize: `${20 * scaleFactor}px`,
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 5, y: 2 },
    }).setOrigin(0.5);

    // Evento de teclado para voltar ao menu principal
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainScene');
    });
  }

  private displayScores(background: Phaser.GameObjects.Image, scaleFactor: number): void {
    // Ordenar do maior para o menor e exibir a lista de pontuações
    this.scores.sort((a, b) => b.score - a.score);
    let startY = background.y - (background.displayHeight / 2) + 310;
    const lineSpacing = 35 * scaleFactor;

    this.scores.forEach((entry, index) => {
      this.add.text(this.cameras.main.centerX - 140 * scaleFactor, startY + index * lineSpacing, `${index + 1}. ${entry.name}`, {
        fontSize: `${24 * scaleFactor}px`,
        color: '#000000',
      });

      this.add.text(this.cameras.main.centerX + 165 * scaleFactor, startY + index * lineSpacing, `${entry.score}`, {
        fontSize: `${24 * scaleFactor}px`,
        color: '#000000',
      }).setOrigin(1, 0);
    });
  }
}
