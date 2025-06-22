import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NavigationProvider } from '../../providers/navigation.provider';

@Component({
  selector: 'app-bios-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bios-screen.component.html',
  styleUrl: './bios-screen.component.scss'
})
export class BiosScreenComponent implements OnInit, OnDestroy {
  private keyboardListenerEnabled = false;

  constructor(private navigationProvider: NavigationProvider) {}

  ngOnInit() {
    console.log('🖥️ BIOS Screen inicializada');
  }

  ngOnDestroy() {
    this.disableKeyboardListener();
    console.log('🖥️ BIOS Screen destruída');
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.keyboardListenerEnabled) {
      console.log('🎹 Tecla pressionada na BIOS:', event.key);
      this.navigateToProjects();
      
      // Desabilitar para evitar múltiplos triggers
      this.disableKeyboardListener();
    }
  }

  private enableKeyboardListener() {
    this.keyboardListenerEnabled = true;
    console.log('⌨️ Listener de teclado ATIVADO - Pressione qualquer tecla para continuar');
  }

  private disableKeyboardListener() {
    this.keyboardListenerEnabled = false;
    console.log('⌨️ Listener de teclado DESATIVADO');
  }

  private navigateToProjects() {
    console.log('🚀 Navegando para tela de projetos via NavigationProvider...');
    this.navigationProvider.navigate('/projects');
  }

  /**
   * Método público para ativar a tela (chamado pelo screen component)
   */
  public activate() {
    // Habilitar o teclado somente após a animação inicial
    setTimeout(() => {
      this.enableKeyboardListener();
    }, 3000);
  }
}
