import 'phaser';

export default class MusicController {
  private scene: Phaser.Scene;
  private music: Phaser.Sound.BaseSound;
  private isMuted: boolean = false;

  constructor(scene: Phaser.Scene, musicKey: string, volume: number = 0.5) {
    this.scene = scene;
    this.music = this.scene.sound.add(musicKey, {
      loop: true,
      volume: volume,
    });
  }

  public playMusic(): void {
    if (!this.music.isPlaying) {
      this.music.play();
    }
  }

  public pauseMusic(): void {
    if (this.music.isPlaying) {
      this.music.pause();
    }
  }

  public resumeMusic(): void {
    if (this.music.isPaused) {
      this.music.resume();
    }
  }

  public stopMusic(): void {
    if (this.music.isPlaying || this.music.isPaused) {
      this.music.stop();
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.scene.sound.mute = this.isMuted;
  }

  public isPlaying(): boolean {
    return this.music.isPlaying;
  }

  public isPaused(): boolean {
    return this.music.isPaused;
  }
}
