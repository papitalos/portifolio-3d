import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NavigationProvider, NavigationState } from '../../providers/navigation.provider';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss',
})
export class ScreenComponent implements OnInit, OnDestroy {
  @Input() isActive: boolean = false;

  // Componente atual a ser renderizado
  currentComponent: Type<any> | null = null;

  // Tema visual atual
  currentTheme: string = 'bios';

  // Subject para cleanup de subscriptions
  private destroy$ = new Subject<void>();

  constructor(private navigationProvider: NavigationProvider) {}

  ngOnInit() {
    // Subscrever às mudanças de navegação
    this.navigationProvider.currentState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: NavigationState) => {
        this.updateCurrentComponent(state);
      });

    console.log('📺 Screen Orchestrator inicializado');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('📺 Screen Orchestrator destruído');
  }

  /**
   * Método público para ativar a tela (chamado pelo three-scene component)
   */
  activate() {
    this.isActive = true;
    console.log('📺 Screen ativada - Componente atual sendo renderizado');
  }

  /**
   * Atualiza o componente atual baseado no estado de navegação
   */
  private updateCurrentComponent(state: NavigationState) {
    this.currentComponent = state.component;
    this.currentTheme = state.theme || 'bios';
    console.log(`📺 Renderizando componente: ${state.screenName} (${state.route})`);
    
    // Se houver dados, pode ser útil para componentes filhos
    if (state.data && Object.keys(state.data).length > 0) {
      console.log('📦 Dados da navegação:', state.data);
    }
  }
}
