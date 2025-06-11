import { Component } from '@angular/core';
import { ThreeSceneComponent } from './components/three-scene/three-scene.component';
import { ScreenComponent } from './components/screen/screen.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThreeSceneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portifolio-3d';
}
