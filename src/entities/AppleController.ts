import 'phaser';
import Snake from './SnakeController';
import GameMap from './MapController';

export default class AppleManager {
    private scene: Phaser.Scene;
    private gameMap: GameMap;
    private apples: Phaser.GameObjects.Sprite[] = [];
    private spriteSheetKey: string;
    private appleFrameIndex: number;

    constructor(scene: Phaser.Scene, gameMap: GameMap, spriteSheetKey: string, appleFrameIndex: number) {
        this.scene = scene;
        this.gameMap = gameMap;
        this.spriteSheetKey = spriteSheetKey;
        this.appleFrameIndex = appleFrameIndex;
    }

    // Adiciona uma maçã em uma posição vazia no mapa
    public addApple(snake: Snake, count: number = 1): void {
        for (let i = 0; i < count; i++) {
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

                const appleOverlap = this.apples.some(apple => apple.x / 32 === ax && apple.y / 32 === ay);

                // A posição deve estar vazia e dentro dos limites
                if (!overlap && !appleOverlap && !this.gameMap.isOutOfBounds(ax, ay)) {
                    valid = true;
                }
            }

            const apple = this.scene.add.sprite(
                ax * snake.getTileWidth(),
                ay * snake.getTileHeight(),
                this.spriteSheetKey,
                this.appleFrameIndex
            ).setDisplaySize(32, 32);

            this.apples.push(apple);

            // Configurar o timer para a maçã
            this.scene.time.delayedCall(5000, () => {
                this.startAppleBlink(apple);
            }, [], this);

            // Remover a maçã após 7 segundos
            this.scene.time.delayedCall(7000, () => {
                this.removeApple(apple, snake);
            }, [], this);
        }
    }

    private startAppleBlink(apple: Phaser.GameObjects.Sprite): void {
        this.scene.tweens.add({
            targets: apple,
            alpha: { from: 1, to: 0 },
            duration: 300,
            yoyo: true,
            repeat: -1 // Pisca continuamente até ser removida
        });
    }

    private removeApple(apple: Phaser.GameObjects.Sprite, snake: Snake): void {
        const index = this.apples.indexOf(apple);
        if (index !== -1) {
            apple.destroy();
            this.apples.splice(index, 1);
            this.addApple(snake); // Adiciona uma nova maçã quando uma é removida
        }
    }

    // Verifica se uma maçã foi comida e a remove
    public checkCollisionWithSnake(snake: Snake): boolean {
        for (let i = 0; i < this.apples.length; i++) {
            const apple = this.apples[i];
            if (apple.x / 32 === snake.nextPosition().x && apple.y / 32 === snake.nextPosition().y) {
                apple.destroy();
                this.apples.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    public getApples(): Phaser.GameObjects.Sprite[] {
        return this.apples;
    }
}