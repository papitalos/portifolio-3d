import { Component, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @Output() backToTerminal = new EventEmitter<void>();

  ngOnInit() {
    console.log('📋 Tela de projetos carregada - Pressione ESC para voltar');
  }

  ngOnDestroy() {
    console.log('📋 Saindo da tela de projetos');
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      console.log('⬅️ Tecla ESC pressionada - Voltando ao terminal');
      this.goBack();
    }
  }

  private goBack() {
    this.backToTerminal.emit();
  }

  // Métodos para futuras funcionalidades
  onNavClick(section: string) {
    console.log(`🔗 Navegando para: ${section}`);
    // Implementar navegação interna aqui
  }

  onProjectClick(projectName: string) {
    console.log(`🚀 Abrindo projeto: ${projectName}`);
    // Implementar abertura de projeto aqui
  }

  onGitHubClick(projectName: string) {
    console.log(`📂 Abrindo GitHub do projeto: ${projectName}`);
    // Implementar link para GitHub aqui
  }
}
