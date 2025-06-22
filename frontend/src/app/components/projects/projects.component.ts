import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationProvider } from '../../providers/navigation.provider';
import { ProjectService, Projeto } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Projeto[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  showFilter = false;

  constructor(
    private navigationProvider: NavigationProvider,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    console.log('📋 Tela de projetos carregada - Pressione ESC para voltar');
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        const set = new Set<string>();
        projects.forEach(p => p.categorias.forEach(c => set.add(c.nome)));
        this.categories = Array.from(set);
      },
      error: (err) => console.error('Erro ao carregar projetos', err)
    });
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
      this.navigationProvider.navigate('/about');
    } else if (section === 'contato') {
      this.navigationProvider.navigate('/contato');
    }
  }

  onProjectClick(projectName: string) {
    const project = this.projects.find(p => p.titulo === projectName);
    if (project) {
      this.navigationProvider.navigate('/project-detail', { project });
    }
  }

  get filteredProjects(): Projeto[] {
    if (!this.selectedCategory) return this.projects;
    return this.projects.filter(p =>
      p.categorias.some(c => c.nome === this.selectedCategory)
    );
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  selectCategory(cat: string | null) {
    this.selectedCategory = cat;
    this.showFilter = false;

  }

  onGitHubClick(projectName: string) {
    console.log(`📂 Abrindo GitHub do projeto: ${projectName}`);
    // Implementar link para GitHub aqui
  }
}
