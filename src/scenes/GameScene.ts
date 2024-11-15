import 'phaser';
import Snake from '../entities/Snake'; // Certifique-se de que o caminho para Snake.ts esteja correto

export default class GameScene extends Phaser.Scene {
  private snake: Snake;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // Carregar o mapa e o tileset
    this.load.tilemapTiledJSON('map', '../assets/map_json.json');
    this.load.image('tile_set', '../assets/terrain_tiles_v2.png');

    // Carregar o sprite sheet da cobra
    this.load.spritesheet('snakeSprite', '../assets/snake-graphics.png', {
      frameWidth: 64, // Largura de cada quadro
      frameHeight: 64 // Altura de cada quadro
    });
  }

  create(): void {
    try {
      // Criar o mapa
      const map = this.make.tilemap({ key: 'map' });
      const tileset = map.addTilesetImage('tile_set', 'tile_set');

      // Calcule a posição inicial para centralizar a camada
      const offsetX = (this.cameras.main.width - map.widthInPixels) / 2;
      const offsetY = (this.cameras.main.height - map.heightInPixels) / 2;

      // Criar a camada com os offsets calculados para centralizar
      const groundLayer = map.createLayer('terrain', tileset, offsetX, offsetY);

      // Verifique a existência da camada
      if (groundLayer) {
        groundLayer.setCollisionByProperty({ collides: true });

        // Centralizar a câmera na camada
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);
        this.cameras.main.zoom = this.calculateOptimalZoom();

        // Inicializar a cobra com segmentos iniciais
        const initialSegments = [
          new Phaser.Math.Vector2(5, 5),
          new Phaser.Math.Vector2(4, 5),
          new Phaser.Math.Vector2(3, 5),
        ];
        // Chamando o construtor de Snake com os parâmetros necessários
        this.snake = new Snake(this, 20, 20, 0, 3, 4, 'snakeSprite', 64, 64);
        this.snake.drawSnake(); // Desenhe a cobra inicialmente
      } else {
        console.error('A camada "terrain" não foi encontrada. Verifique o nome da camada.');
      }
    } catch (error) {
      console.error('Erro ao criar a cena:', error);
    }
  }

  update(): void {
    // Atualizar a cobra a cada frame
    this.snake.drawSnake();
  }

  private calculateOptimalZoom(): number {
    // Calcula um nível de zoom ideal baseado nas dimensões da janela
    const scaleX = window.innerWidth / this.cameras.main.width;
    const scaleY = window.innerHeight / this.cameras.main.height;
    return Math.min(scaleX, scaleY);
  }
}
