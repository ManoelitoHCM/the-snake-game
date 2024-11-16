import 'phaser';
import Snake from './SnakeController';
import GameMap from './MapController';

export default class AppleManager {
    private scene: Phaser.Scene;
    private gameMap: GameMap;
    private apple: Phaser.GameObjects.Sprite | null = null;
    private spriteSheetKey: string;
    private appleFrameIndex: number;

    constructor(scene: Phaser.Scene, gameMap: GameMap, spriteSheetKey: string, appleFrameIndex: number) {
        this.scene = scene;
        this.gameMap = gameMap;
        this.spriteSheetKey = spriteSheetKey;
        this.appleFrameIndex = appleFrameIndex;
    }

    // Adiciona uma maçã em uma posição vazia no mapa
    public addApple(snake: Snake): void {
        let valid = false;
        let ax = 0;
        let ay = 0;

        const { offsetX, offsetY } = this.gameMap.getOffsets();

        while (!valid) {
            // Obter uma posição aleatória
            ax = Phaser.Math.Between(offsetX / 32 + 2, (this.gameMap.getBounds().width + offsetX) / 32 - 2);
            ay = Phaser.Math.Between(offsetY / 32 + 2, (this.gameMap.getBounds().height + offsetY) / 32 - 2);

            // Verificar se a cobra não está sobrepondo a nova posição da maçã
            const overlap = snake.getSegments().some(segment => segment.x === ax && segment.y === ay);

            // A posição deve estar vazia e dentro dos limites
            if (!overlap && !this.gameMap.isOutOfBounds(ax, ay)) {
                valid = true;
            }
        }

        // Remover maçã existente, se houver
        if (this.apple) {
            this.apple.destroy();
        }

        this.apple = this.scene.add.sprite(
            ax * snake.getTileWidth(),
            ay * snake.getTileHeight(),
            this.spriteSheetKey,
            this.appleFrameIndex
        );

        this.apple.setDisplaySize(32, 32);
    }

    public getApple(): Phaser.GameObjects.Sprite | null {
        return this.apple;
    }
}
