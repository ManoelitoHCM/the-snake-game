import 'phaser';

export default class Snake {
  private scene: Phaser.Scene;
  private segments: { x: number, y: number }[];
  private tileWidth: number;
  private tileHeight: number;
  private spriteSheetKey: string;
  private direction: number; // 0: Up, 1: Right, 2: Down, 3: Left
  private speed: number;
  private moveDelay: number;
  private growSegments: number;
  private directions: number[][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];

  constructor(scene: Phaser.Scene, x: number, y: number, direction: number, speed: number, numSegments: number, spriteSheetKey: string, tileWidth: number, tileHeight: number) {
    this.scene = scene;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.spriteSheetKey = spriteSheetKey;
    this.direction = direction;
    this.speed = speed;
    this.moveDelay = 0;
    this.growSegments = 0;

    // Inicializa os segmentos da cobra
    this.segments = [];
    for (let i = 0; i < numSegments; i++) {
      this.segments.push({
        x: x - i * this.directions[direction][0],
        y: y - i * this.directions[direction][1]
      });
    }
  }

  grow(): void {
    this.growSegments++;
  }

  tryMove(dt: number): boolean {
    this.moveDelay += dt;
    const maxMoveDelay = 1 / this.speed;
    if (this.moveDelay > maxMoveDelay) {
      return true;
    }
    return false;
  }

  nextMove(): { x: number, y: number } {
    const nextX = this.segments[0].x + this.directions[this.direction][0];
    const nextY = this.segments[0].y + this.directions[this.direction][1];
    return { x: nextX, y: nextY };
  }

  move(): void {
    const nextMove = this.nextMove();
    this.segments[0].x = nextMove.x;
    this.segments[0].y = nextMove.y;

    const lastSeg = this.segments[this.segments.length - 1];
    const growX = lastSeg.x;
    const growY = lastSeg.y;

    for (let i = this.segments.length - 1; i >= 1; i--) {
      this.segments[i].x = this.segments[i - 1].x;
      this.segments[i].y = this.segments[i - 1].y;
    }

    if (this.growSegments > 0) {
      this.segments.push({ x: growX, y: growY });
      this.growSegments--;
    }

    this.moveDelay = 0;
  }

  drawSnake(): void {
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
    }
  }
}
