import { Scene } from 'phaser';

class Snake {
    segments: { x: number; y: number }[];
    scene: Scene;
    spriteKey: string;

    constructor(scene: Scene, spriteKey: string) {
        this.scene = scene;
        this.spriteKey = spriteKey;
        this.segments = [{ x: 5, y: 5 }]; // Exemplo de posição inicial
    }

    drawSnake(): void {
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            const segx = segment.x;
            const segy = segment.y;
            const tilex = segx * 64; // Multiplicando pelo tamanho de cada tile
            const tiley = segy * 64;

            let tx = 0;
            let ty = 0;

            if (i === 0) {
                // Cabeça da cobra
                const nseg = this.segments[i + 1];
                if (nseg) {
                    if (segy < nseg.y) {
                        tx = 3; ty = 0; // Cima
                    } else if (segx > nseg.x) {
                        tx = 4; ty = 0; // Direita
                    } else if (segy > nseg.y) {
                        tx = 4; ty = 1; // Baixo
                    } else if (segx < nseg.x) {
                        tx = 3; ty = 1; // Esquerda
                    }
                }
            } else if (i === this.segments.length - 1) {
                // Cauda da cobra
                const pseg = this.segments[i - 1];
                if (pseg) {
                    if (pseg.y < segy) {
                        tx = 3; ty = 2; // Cima
                    } else if (pseg.x > segx) {
                        tx = 4; ty = 2; // Direita
                    } else if (pseg.y > segy) {
                        tx = 4; ty = 3; // Baixo
                    } else if (pseg.x < segx) {
                        tx = 3; ty = 3; // Esquerda
                    }
                }
            } else {
                // Corpo da cobra
                const pseg = this.segments[i - 1];
                const nseg = this.segments[i + 1];
                if (pseg && nseg) {
                    if (pseg.x < segx && nseg.x > segx || nseg.x < segx && pseg.x > segx) {
                        tx = 1; ty = 0; // Horizontal
                    } else if (pseg.x < segx && nseg.y > segy || nseg.x < segx && pseg.y > segy) {
                        tx = 2; ty = 0; // Curva esquerda-baixo
                    } else if (pseg.y < segy && nseg.y > segy || nseg.y < segy && pseg.y > segy) {
                        tx = 2; ty = 1; // Vertical
                    } else if (pseg.y < segy && nseg.x < segx || nseg.y < segy && pseg.x < segx) {
                        tx = 2; ty = 2; // Curva cima-esquerda
                    } else if (pseg.x > segx && nseg.y < segy || nseg.x > segx && pseg.y < segy) {
                        tx = 0; ty = 1; // Curva direita-cima
                    } else if (pseg.y > segy && nseg.x > segx || nseg.y > segy && pseg.x > segx) {
                        tx = 0; ty = 0; // Curva baixo-direita
                    }
                }
            }

            // Adiciona a imagem do segmento da cobra com base na posição no spritesheet
            const segmentSprite = this.scene.add.image(tilex, tiley, this.spriteKey);
            segmentSprite.setCrop(tx * 64, ty * 64, 64, 64);
        }
    }
}

export default Snake;