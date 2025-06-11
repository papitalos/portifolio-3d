import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss',
})
export class ScreenComponent implements OnInit, OnDestroy {
  @Input() isActive: boolean = false;
  @Output() keyPressed = new EventEmitter<KeyboardEvent>();
  @Output() screenChange = new EventEmitter<string>();

  private keyboardListenerEnabled = false;

  ngOnInit() {
    // Habilitar listener de teclado quando a tela estiver ativa
    setTimeout(() => {
      this.enableKeyboardListener();
    }, 3000); // Aguardar 3 segundos após a tela aparecer
  }

  ngOnDestroy() {
    this.disableKeyboardListener();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isActive && this.keyboardListenerEnabled) {
      console.log('🎹 Tecla pressionada:', event.key);
      this.keyPressed.emit(event);
      this.navigateToProjects();
      
      // Desabilitar para evitar múltiplos triggers
      this.disableKeyboardListener();
    }
  }

  activate() {
    this.isActive = true;
    // Aguardar um pouco antes de habilitar o teclado
    setTimeout(() => {
      this.enableKeyboardListener();
    }, 2000);
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
    console.log('🚀 Navegando para tela de projetos...');
    this.screenChange.emit('projects');
  }
}
