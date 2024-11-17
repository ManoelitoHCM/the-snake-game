import 'phaser';

import loadingImage from '../assets/images/loading-screen1.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.image('loadingImage', loadingImage);
  }

  create(): void {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'loadingImage').setOrigin(0.5);


    // Criar uma área de clique invisível sobre a parte "Game Start"
    const gameStartZone = this.add.zone(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 210, // Ajuste a posição para corresponder à localização do texto na imagem
      200, // Largura da área de clique
      75   // Altura da área de clique
    )
      .setOrigin(0.5)
      .setInteractive({ cursor: 'pointer' }); // Define o cursor como mão ao passar o mouse

    // Adicionar um evento de clique à zona
    gameStartZone.on('pointerdown', () => {
      this.scene.start('MainScene'); // Altere para a cena de menu de início
    });
  }
}
