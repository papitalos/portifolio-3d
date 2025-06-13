import { RouteConfig } from '../providers/navigation.provider';
import { Type } from '@angular/core';

// Imports dos componentes
import { BiosScreenComponent } from '../components/bios-screen/bios-screen.component';
import { ProjectsComponent } from '../components/projects/projects.component';

/**
 * Configuração central de todas as rotas da aplicação
 * Este arquivo registra todos os componentes de tela disponíveis
 */
export const APP_ROUTES: RouteConfig[] = [
  {
    route: '/bios',
    component: BiosScreenComponent,
    name: 'bios'
  },
  {
    route: '/projects',
    component: ProjectsComponent,
    name: 'projects'
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