import 'phaser';

export default class MusicController {
  private scene: Phaser.Scene;
  private currentMusic: Phaser.Sound.BaseSound | null = null;
  private isMuted: boolean = false;

  constructor(scene: Phaser.Scene, musicKey: string, volume: number = 0.5) {
    this.scene = scene;
    this.currentMusic = this.scene.sound.add(musicKey, {
      loop: true,
      volume: volume,
    });
  }

  public playMusic(): void {
    if (!this.currentMusic.isPlaying) {
      this.currentMusic.play();
    }
  }

  public pauseMusic(): void {
    if (this.currentMusic.isPlaying) {
      this.currentMusic.pause();
    }
  }

  public resumeMusic(): void {
    if (this.currentMusic.isPaused) {
      this.currentMusic.resume();
    }
  }

  public stopMusic(): void {
    if (this.currentMusic.isPlaying || this.currentMusic.isPaused) {
      this.currentMusic.stop();
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.scene.sound.mute = this.isMuted;
  }

  public isPlaying(): boolean {
    return this.currentMusic.isPlaying;
  }

  public isPaused(): boolean {
    return this.currentMusic.isPaused;
  }

  changeTrack(newMusicKey: string): void {
    if (this.currentMusic) {
      this.currentMusic.stop(); // Para a música atual
    }
    this.currentMusic = this.scene.sound.add(newMusicKey, {
      loop: true,
      volume: 0.5,
    });
    this.playMusic(); // Toca a nova música
  }
}
