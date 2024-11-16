import 'phaser';

export default class GameMap {
    private scene: Phaser.Scene;
    private tilemap: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private groundLayer: Phaser.Tilemaps.TilemapLayer;
    private mapBounds: { width: number; height: number };
    private offsetX: number;
    private offsetY: number;

    constructor(
        scene: Phaser.Scene,
        tilemapKey: string,
        tilesetKey: string,
        tilesetImageKey: string,
        camera: Phaser.Cameras.Scene2D.Camera
    ) {
        this.scene = scene;

        // Criar o tilemap
        this.tilemap = this.scene.make.tilemap({ key: tilemapKey });
        this.tileset = this.tilemap.addTilesetImage(tilesetKey, tilesetImageKey);

        // Calcular offsets para centralizar o mapa
        this.offsetX = (camera.width - this.tilemap.widthInPixels) / 2;
        this.offsetY = (camera.height - this.tilemap.heightInPixels) / 2;

        // Criar a camada de terreno com os offsets aplicados
        this.groundLayer = this.tilemap.createLayer('terrain', this.tileset, this.offsetX, this.offsetY);

        if (!this.groundLayer) {
            throw new Error('A camada "terrain" não foi encontrada. Verifique o nome no Tiled.');
        }

        // Configurar colisão na camada de terreno
        this.groundLayer.setCollisionByProperty({ collides: true });

        // Definir os limites do mapa
        this.mapBounds = {
            width: this.tilemap.widthInPixels,
            height: this.tilemap.heightInPixels,
        };

        // Configurar os limites da câmera
        this.scene.cameras.main.setBounds(0, 0, this.mapBounds.width, this.mapBounds.height);
        this.scene.cameras.main.centerOn(this.mapBounds.width / 2, this.mapBounds.height / 2);
    }

    // Retorna os limites do mapa
    getBounds(): { width: number; height: number } {
        return this.mapBounds;
    }

    // // Verifica se uma posição está fora dos limites do mapa
    isOutOfBounds(x: number, y: number): boolean {
        // Verificar se está fora dos limites
        return this.offsetX / 32 >= x || (this.offsetY + 20) / 32 > y || x >= (this.getBounds().width + this.offsetX) / 32 || y + 0.5 > (this.getBounds().height + this.offsetY) / 32;
    }

    getOffsets(): { offsetX: number; offsetY: number } {
        return {
            offsetX: this.offsetX,
            offsetY: this.offsetY
        };
    }

}
