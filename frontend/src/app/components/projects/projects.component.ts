import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationProvider } from '../../providers/navigation.provider';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {

  constructor(private navigationProvider: NavigationProvider) {}

  ngOnInit() {
    console.log('📋 Tela de projetos carregada - Pressione ESC para voltar');
  }

  ngOnDestroy() {
    console.log('📋 Saindo da tela de projetos');
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      console.log('⬅️ Tecla ESC pressionada - Voltando ao BIOS via NavigationProvider');
      this.goBack();
    }
  }

  private goBack() {
    this.navigationProvider.navigate('/bios');
  }

  // Métodos para futuras funcionalidades
  onNavClick(section: string) {
    console.log(`🔗 Navegando para: ${section}`);

    if (section === 'projects') {
      this.navigationProvider.navigate('/projects');
    } else if (section === 'sobre') {
      this.navigationProvider.navigate('/sobre');
    } else if (section === 'contato') {
      this.navigationProvider.navigate('/contato');
    }
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
