export default class PlayerInputHandler {
  private scene: Phaser.Scene;
  private inputElement: Phaser.GameObjects.DOMElement;
  private saveButton: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, finalScore: number, onSave: (playerName: string) => void) {
    this.scene = scene;

    // Criar uma entrada DOM para o nome do jogador
    this.inputElement = this.scene.add.dom(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 50).createFromHTML(`
      <input type="text" id="playerName" placeholder="Digite seu nome" maxlength="20" style="font-size: 24px; padding: 5px; border-radius: 5px; border: 1px solid #000; background-color: #fff; text-align: center;">
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

      // Verificar se o nome contém apenas caracteres permitidos (a-Z, 0-9, e hífen) e tem até 20 caracteres
      if (playerName && /^[a-zA-Z0-9-]+$/.test(playerName)) {
        onSave(playerName);
      } else {
        alert('Por favor, insira um nome válido com até 20 caracteres alfanuméricos e hífens.');
      }
    });
  }

  disableInput(): void {
    const inputElement = document.getElementById('playerName') as HTMLInputElement | null;
    if (inputElement) {
      inputElement.disabled = true;
    } else {
      console.warn('Elemento de entrada não encontrado.');
    }
  }

  removeInput(): void {
    const inputElement = document.getElementById('playerName');
    if (inputElement) {
      inputElement.remove();
    }
    if (this.saveButton) {
      this.saveButton.destroy();
    }
  }
}
