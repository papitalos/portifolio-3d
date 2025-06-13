import { Routes } from '@angular/router';
import { ScreenComponent } from './components/screen/screen.component';
export const routes: Routes = [
  {
    path: 'screen',
    component: ScreenComponent
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/three-scene/three-scene.component').then(m => m.ThreeSceneComponent)
  }
];
