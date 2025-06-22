import { RouteConfig } from '../providers/navigation.provider';
import { Type } from '@angular/core';

// Imports dos componentes
import { BiosScreenComponent } from '../components/bios-screen/bios-screen.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ProjectDetailComponent } from '../components/project-detail/project-detail.component';
import { AboutMeComponent } from '../components/about-me/about-me.component';


/**
 * Configuração central de todas as rotas da aplicação
 * Este arquivo registra todos os componentes de tela disponíveis
 */
export const APP_ROUTES: RouteConfig[] = [
  {
    route: '/bios',
    component: BiosScreenComponent,
    name: 'bios',
    theme: 'bios'
  },
  {
    route: '/projects',
    component: ProjectsComponent,
    name: 'projects',
    theme: 'projects'
  },
  {
    route: '/project-detail',
    component: ProjectDetailComponent,
    name: 'project-detail',
    theme: 'projects'
  },
  {
    route: '/about',
    component: AboutMeComponent,
    name: 'about-me',
    theme: 'projects'

  }
];

/**
 * Função para inicializar e registrar todas as rotas na aplicação
 * Deve ser chamada no início da aplicação (main.ts ou app.component)
 */
export function initializeRoutes(navigationProvider: any): void {
  console.log('🗺️ Inicializando sistema de rotas...');
  
  // Registra todas as rotas configuradas
  navigationProvider.registerRoutes(APP_ROUTES);
  
  console.log(`✅ ${APP_ROUTES.length} rotas registradas com sucesso`);
} 