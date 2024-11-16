import 'phaser';

export default class Snake {
    private scene: Phaser.Scene;
    private segments: { x: number, y: number }[];
    private tileWidth: number;
    private tileHeight: number;
    private spriteSheetKey: string;
    public direction: number; // 0: Up, 1: Right, 2: Down, 3: Left
    private speed: number;
    private moveDelay: number;
    private growSegments: number;
    private directions: number[][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    private sprites: Phaser.GameObjects.Sprite[]; // Array para armazenar os sprites da cobra

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        direction: number,
        speed: number,
        numSegments: number,
        spriteSheetKey: string,
        tileWidth: number,
        tileHeight: number
    ) {
        this.scene = scene;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.spriteSheetKey = spriteSheetKey;
        this.direction = direction;
        this.speed = speed;
        this.moveDelay = 0;
        this.growSegments = 0;
        this.sprites = [];

        // Inicializa os segmentos da cobra
        this.segments = [];
        for (let i = 0; i < numSegments; i++) {
            this.segments.push({
                x: x - i * this.directions[direction][0],
                y: y - i * this.directions[direction][1],
            });
        }
    }

    grow(): void {
        this.growSegments++;
    }

    canMove(deltaTime: number): boolean {
        this.moveDelay += deltaTime;
        const maxMoveDelay = 1 / this.speed;
        if (this.moveDelay > maxMoveDelay) {
            this.moveDelay = 0; // Reset move delay
            return true;
        }
        return false;
    }

    move(): void {
        const nextMove = this.nextPosition();

        if (this.checkSelfCollision(nextMove.x, nextMove.y)) {
            console.error('A cobra colidiu com ela mesma!');
            // Aqui você pode implementar a lógica para reiniciar o jogo ou terminar a partida
            return;
        }

        // Mover segmentos
        for (let i = this.segments.length - 1; i > 0; i--) {
            this.segments[i] = { ...this.segments[i - 1] };
        }

        // Atualizar a posição da cabeça
        this.segments[0] = nextMove;

        // Adicionar novos segmentos
        if (this.growSegments > 0) {
            this.segments.push({ ...this.segments[this.segments.length - 1] });
            this.growSegments--;
        }
    }

    public checkSelfCollision(x: number, y: number): boolean {
        // Verifica se a posição (x, y) da cabeça colide com qualquer parte do corpo
        return this.segments.slice(1).some(segment => segment.x === x && segment.y === y);
    }

    public nextPosition(): { x: number, y: number } {
        const head = this.segments[0];
        const nextX = head.x + this.directions[this.direction][0];
        const nextY = head.y + this.directions[this.direction][1];
        return { x: nextX, y: nextY };
    }

    drawSnake(): void {

        this.sprites.forEach(sprite => sprite.destroy());
        this.sprites = [];

        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            const tileX = segment.x * this.tileWidth;
            const tileY = segment.y * this.tileHeight;

            let tx = 0;
            let ty = 0;

            if (i === 0) {
                // Cabeça
                const nseg = this.segments[i + 1];
                if (segment.y < nseg.y) {
                    tx = 3; ty = 0;
                } else if (segment.x > nseg.x) {
                    tx = 4; ty = 0;
                } else if (segment.y > nseg.y) {
                    tx = 4; ty = 1;
                } else if (segment.x < nseg.x) {
                    tx = 3; ty = 1;
                }
            } else if (i === this.segments.length - 1) {
                // Cauda
                const pseg = this.segments[i - 1];
                if (pseg.y < segment.y) {
                    tx = 3; ty = 2;
                } else if (pseg.x > segment.x) {
                    tx = 4; ty = 2;
                } else if (pseg.y > segment.y) {
                    tx = 4; ty = 3;
                } else if (pseg.x < segment.x) {
                    tx = 3; ty = 3;
                }
            } else {
                // Corpo
                const pseg = this.segments[i - 1];
                const nseg = this.segments[i + 1];
                if ((pseg.x < segment.x && nseg.x > segment.x) || (nseg.x < segment.x && pseg.x > segment.x)) {
                    tx = 1; ty = 0;
                } else if ((pseg.x < segment.x && nseg.y > segment.y) || (nseg.x < segment.x && pseg.y > segment.y)) {
                    tx = 2; ty = 0;
                } else if ((pseg.y < segment.y && nseg.y > segment.y) || (nseg.y < segment.y && pseg.y > segment.y)) {
                    tx = 2; ty = 1;
                } else if ((pseg.y < segment.y && nseg.x < segment.x) || (nseg.y < segment.y && pseg.x < segment.x)) {
                    tx = 2; ty = 2;
                } else if ((pseg.x > segment.x && nseg.y < segment.y) || (nseg.x > segment.x && pseg.y < segment.y)) {
                    tx = 0; ty = 1;
                } else if ((pseg.y > segment.y && nseg.x > segment.x) || (nseg.y > segment.y && pseg.x > segment.x)) {
                    tx = 0; ty = 0;
                }
            }

            // Desenhar o segmento da cobra
            const frameIndex = tx + ty * 5; // Ajuste conforme necessário
            const sprite = this.scene.add.sprite(tileX, tileY, this.spriteSheetKey, frameIndex);
            sprite.setDisplaySize(this.tileWidth, this.tileHeight);
            this.sprites.push(sprite); // Armazena o sprite na lista
        }
    }

    getTileWidth(): number {
        return this.tileWidth;
    }

    getTileHeight(): number {
        return this.tileHeight;
    }

    getSegments(): { x: number, y: number }[] {
        return this.segments;
    }
}