import { Component, OnInit } from '@angular/core';
import { ThreeSceneComponent } from './components/three-scene/three-scene.component';
import { ScreenComponent } from './components/screen/screen.component';
import { NavigationProvider } from './providers/navigation.provider';
import { initializeRoutes } from './config/routes.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThreeSceneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portifolio-3d';

  constructor(private navigationProvider: NavigationProvider) {}

  ngOnInit() {
    // Inicializar sistema de rotas da aplicação
    initializeRoutes(this.navigationProvider);
    console.log('🚀 Aplicação inicializada com sistema de navegação');
  }
}
