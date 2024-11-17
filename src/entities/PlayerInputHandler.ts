export default class PlayerInputHandler {
    private scene: Phaser.Scene;
    private inputElement: Phaser.GameObjects.DOMElement;
    private saveButton: Phaser.GameObjects.Text;
  
    constructor(scene: Phaser.Scene, finalScore: number, onSave: (playerName: string) => void) {
      this.scene = scene;
  
      // Criar uma entrada DOM para o nome do jogador
      this.inputElement = this.scene.add.dom(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 50).createFromHTML(`
        <input type="text" id="playerName" placeholder="Digite seu nome" style="font-size: 24px; padding: 5px; border-radius: 5px; border: 1px solid #000; background-color: #fff; text-align: center;">
      `);
  
      // Criar o botão de salvar
      this.saveButton = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'Salvar pontuação', {
        fontSize: '32px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      }).setOrigin(0.5).setInteractive();
  
      this.saveButton.on('pointerdown', () => {
        const playerName = (document.getElementById('playerName') as HTMLInputElement).value;
        if (playerName) {
          onSave(playerName);
        } else {
          alert('Por favor, insira um nome antes de salvar.');
        }
      });
    }
  
    public disableInput(): void {
      (this.inputElement.getChildByName('playerName') as HTMLInputElement).disabled = true;
      this.saveButton.disableInteractive();
    }
  }
  