import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Type } from '@angular/core';

export interface NavigationState {
  screenName: string;
  route: string;
  data: any;
  component: Type<any>;
}

export interface RouteConfig {
  route: string;
  component: Type<any>;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationProvider {
  private routesRegistry: Map<string, RouteConfig> = new Map();
  
  private navigationState = new BehaviorSubject<NavigationState>({
    screenName: 'bios',
    route: '/bios',
    data: {},
    component: null as any // Será definido após registro das rotas
  });

  public currentState$: Observable<NavigationState> = this.navigationState.asObservable();

  constructor() {
    console.log('🧭 NavigationProvider inicializado');
  }

  /**
   * Registra uma rota no sistema de navegação
   */
  registerRoute(routeConfig: RouteConfig): void {
    this.routesRegistry.set(routeConfig.route, routeConfig);
    console.log(`📝 Rota registrada: ${routeConfig.route} -> ${routeConfig.name}`);
    
    // Se é a primeira rota (bios), define como estado inicial
    if (routeConfig.route === '/bios' && !this.navigationState.value.component) {
      this.updateNavigationState({
        ...this.navigationState.value,
        component: routeConfig.component
      });
    }
  }

  /**
   * Registra múltiplas rotas de uma vez
   */
  registerRoutes(routes: RouteConfig[]): void {
    routes.forEach(route => this.registerRoute(route));
  }

  /**
   * Navega para uma nova tela
   */
  navigate(route: string, data: any = {}): void {
    const routeConfig = this.routesRegistry.get(route);
    
    if (!routeConfig) {
      console.error(`❌ Rota não encontrada: ${route}`);
      return;
    }

    const newState: NavigationState = {
      screenName: routeConfig.name,
      route: route,
      data: data,
      component: routeConfig.component
    };

    this.updateNavigationState(newState);
    console.log(`🚀 Navegando para: ${routeConfig.name} (${route})`);
  }

  /**
   * Retorna o estado atual de navegação
   */
  getCurrentState(): NavigationState {
    return this.navigationState.value;
  }

  /**
   * Retorna todas as rotas registradas
   */
  getRegisteredRoutes(): RouteConfig[] {
    return Array.from(this.routesRegistry.values());
  }

  /**
   * Verifica se uma rota existe
   */
  routeExists(route: string): boolean {
    return this.routesRegistry.has(route);
  }

  private updateNavigationState(newState: NavigationState): void {
    this.navigationState.next(newState);
  }
} 