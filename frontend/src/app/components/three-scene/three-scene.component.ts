import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  NgZone
} from '@angular/core';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { CommonModule } from '@angular/common';
import { ScreenComponent } from '../screen/screen.component';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  templateUrl: './three-scene.component.html',
  imports: [CommonModule, ScreenComponent],
  styleUrls: ['./three-scene.component.scss']
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  
  //#region ViewChild References
  @ViewChild('sceneContainer', { static: true }) sceneContainer!: ElementRef;
  @ViewChild(ScreenComponent, { static: true }) screenComponent!: ScreenComponent;
  //#endregion

  //#region Three.js Core Objects
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Group;
  private animationId: any;
  private isDestroyed = false;
  //#endregion

  //#region Screen and Lighting Control
  private screenMesh!: THREE.Mesh;
  private screenLights: THREE.Light[] = [];
  private lampLight!: THREE.PointLight;
  //#endregion

  //#region Animation Control Variables
  private initialCameraPos = new THREE.Vector3(-7, 7, 10);
  private targetCameraPos = new THREE.Vector3(-0.063, 0.384, 3.5);
  private lerpProgress = 0;
  private animationCompleted = false;
  //#endregion

  //#region LookAt Animation Variables
  private initialLookAt = new THREE.Vector3(0, 0, 0);
  private targetLookAt = new THREE.Vector3(-0.063, 0.384, 0);
  private currentLookAt = new THREE.Vector3(0, 0, 0);
  //#endregion

  //#region Screen Activation Control
  isScreenActive = false;
  private resizeHandler = this.onWindowResize.bind(this);
  //#endregion

  //#region Constructor
  constructor(private ngZone: NgZone) { }
  //#endregion

  //#region Lifecycle Methods
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.ngZone.runOutsideAngular(() => {
        this.initThreeJsScene();
        this.startAnimationLoop();
      });
    }
  }

  ngOnDestroy(): void {
    this.cleanupResources();
  }
  //#endregion

  //#region Three.js Initialization
  private initThreeJsScene(): void {
    this.setupRenderer();
    this.setupCamera();
    this.setupScene();
    this.setupLighting();
    this.loadModel();
    this.setupEventListeners();
  }

  private setupRenderer(): void {
    const { width, height } = this.getContainerDimensions();
    
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.sceneContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private setupCamera(): void {
    const { width, height } = this.getContainerDimensions();
    
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.copy(this.initialCameraPos);
  }

  private setupScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);
  }

  private setupLighting(): void {
    // Luz ambiente muito sutil
    const ambientLight = new THREE.AmbientLight(0x404040, 0.34);
    this.scene.add(ambientLight);
  }

  private loadModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      'assets/3D/80sTech.glb', 
      (gltf) => this.onModelLoaded(gltf),
      (xhr) => this.onModelProgress(xhr),
      (error) => this.onModelError(error)
    );
  }

  private onModelLoaded(gltf: any): void {
    this.model = gltf.scene;
    this.model.scale.set(0.75, 0.75, 0.75);
    this.model.rotation.y = 3.15;
    this.model.position.set(0, 0, 0);
    this.scene.add(this.model);
    
    this.initializeCameraLookAt();
    this.initializeScreenSystem();
    this.initializeLightingSystem();
  }

  private onModelProgress(xhr: any): void {
    console.log(`Modelo carregando: ${(xhr.loaded / xhr.total) * 100}%`);
  }

  private onModelError(error: any): void {
    console.error('Erro ao carregar modelo 3D:', error);
  }

  private initializeCameraLookAt(): void {
    this.initialLookAt.copy(this.model.position);
    this.currentLookAt.copy(this.model.position);
    this.camera.lookAt(this.model.position);
  }

  private initializeScreenSystem(): void {
    this.initScreenOff();
  }

  private initializeLightingSystem(): void {
    this.addInitialLights();
  }

  private setupEventListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.resizeHandler);
    }
  }
  //#endregion

  //#region Screen Control System
  private initScreenOff(): void {
    if (!this.model) return;

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name === 'TV_SCREEN') {
        this.configureScreenMesh(child);
        this.startInitialFlickerSequence();
      }
    });
  }

  private configureScreenMesh(mesh: THREE.Mesh): void {
    const blackMaterial = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(0x000000),
      transparent: false,
      side: THREE.DoubleSide
    });
    
    mesh.material = blackMaterial;
    this.screenMesh = mesh;
    
    console.log('📺 Tela configurada: APAGADA');
  }

  private startInitialFlickerSequence(): void {
    setTimeout(() => {
      this.executeFlickerPattern();
    }, 1500);
  }

  private executeFlickerPattern(): void {
    console.log('⚡ Iniciando piscadas da tela...');
    
    const flickerPattern = this.getFlickerPattern();

    flickerPattern.forEach(flicker => {
      setTimeout(() => {
        if (flicker.on) {
          this.flickerScreenOn(flicker.duration);
        } else {
          this.flickerScreenOff();
        }
      }, flicker.delay);
    });

    this.finalizeFlickerSequence();
  }

  private getFlickerPattern() {
    return [
      { delay: 0, duration: 150, on: true },     // Pisca 1: Liga
      { delay: 200, duration: 100, on: false },  // Pisca 1: Desliga
      { delay: 500, duration: 200, on: true },   // Pisca 2: Liga
      { delay: 800, duration: 150, on: false },  // Pisca 2: Desliga
      { delay: 1200, duration: 100, on: true },  // Pisca 3: Liga (rápida)
      { delay: 1400, duration: 200, on: false }, // Pisca 3: Desliga
      { delay: 1800, duration: 250, on: true },  // Pisca 4: Liga (mais longa)
      { delay: 2200, duration: 0, on: false }    // Final: Desliga definitivamente
    ];
  }

  private finalizeFlickerSequence(): void {
    setTimeout(() => {
      this.flickerScreenOff();
      console.log('📺 Sequência de piscadas concluída - Tela apagada');
    }, 2500);
  }

  private flickerScreenOn(duration: number): void {
    if (!this.screenMesh) return;

    this.applyFlickerMaterial();
    this.addTemporaryLight(duration);
  }

  private applyFlickerMaterial(): void {
    const flickerMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x000800),
      emissive: new THREE.Color(0x002200),
      emissiveIntensity: 0.4,
      transparent: false,
      side: THREE.DoubleSide
    });

    this.screenMesh.material = flickerMaterial;
  }

  private addTemporaryLight(duration: number): void {
    const tempLight = new THREE.RectAreaLight(0x00ff00, 6, 0.3, 0.2);
    tempLight.position.set(0, 0.2, 1.3);
    tempLight.lookAt(0, 0, 2);
    this.scene.add(tempLight);

    if (duration > 0) {
      setTimeout(() => {
        this.scene.remove(tempLight);
      }, duration);
    }
  }

  private flickerScreenOff(): void {
    if (!this.screenMesh) return;

    this.applyBlackMaterial();
    this.removeTemporaryLights();
  }

  private applyBlackMaterial(): void {
    const blackMaterial = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(0x000000),
      transparent: false,
      side: THREE.DoubleSide
    });

    this.screenMesh.material = blackMaterial;
  }

  private removeTemporaryLights(): void {
    const lightsToRemove: THREE.Light[] = [];
    this.scene.traverse((child) => {
      if (child instanceof THREE.RectAreaLight && child.intensity === 6) {
        lightsToRemove.push(child);
      }
    });
    
    lightsToRemove.forEach(light => {
      this.scene.remove(light);
    });
  }

  private turnOnScreen(): void {
    if (!this.screenMesh) return;

    this.applyEmissiveMaterial();
    this.animateScreenGlow();

    console.log('💡 Tela LIGADA DEFINITIVAMENTE - Emissão verde ativada!');
  }

  private applyEmissiveMaterial(): void {
    const emissiveMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x001100),
      emissive: new THREE.Color(0x003300),
      emissiveIntensity: 0.8,
      transparent: false,
      side: THREE.DoubleSide
    });

    this.screenMesh.material = emissiveMaterial;
  }

  private animateScreenGlow(): void {
    let intensity = 0;
    const material = this.screenMesh.material as THREE.MeshStandardMaterial;
    
    const animateGlow = () => {
      if (intensity < 0.8) {
        intensity += 0.02;
        if (material instanceof THREE.MeshStandardMaterial) {
          material.emissiveIntensity = intensity;
        }
        requestAnimationFrame(animateGlow);
      }
    };
    animateGlow();
  }
  //#endregion

  //#region Lighting System
  private addInitialLights(): void {
    this.lampLight = new THREE.PointLight(0xf2fef2, 1.5, 10, 2);
    this.lampLight.position.set(4, 1.5, 1.8);
    this.scene.add(this.lampLight);
    
    console.log('💡 Luzes iniciais: Apenas abajur ativo');
  }

  private activateScreenLights(): void {
    this.createScreenLights();
    this.animateLightsIntensity();
    
    console.log('💡 Luzes da tela ATIVADAS - Ambiente iluminado!');
  }

  private createScreenLights(): void {
    const screenEmissionColor = new THREE.Color('#00ff00');
    
    // Luz frontal da tela
    const screenLight = new THREE.RectAreaLight(screenEmissionColor, 12, 0.5, 0.4);
    screenLight.position.set(0, 0.2, 1.3);
    screenLight.lookAt(0, 0, 2);
    this.scene.add(screenLight);
    this.screenLights.push(screenLight);

    // Luz traseira para profundidade
    const backLight = new THREE.RectAreaLight(screenEmissionColor, 8, 0.3, 0.3);
    backLight.position.set(0, 0.2, -0.5);
    backLight.lookAt(0, 0, -1);
    this.scene.add(backLight);
    this.screenLights.push(backLight);

    // Luz de preenchimento
    const fillLight = new THREE.DirectionalLight(0x404040, 0.4);
    fillLight.position.set(-2, 3, 2);
    this.scene.add(fillLight);
    this.screenLights.push(fillLight);
  }

  private animateLightsIntensity(): void {
    let progress = 0;
    const initialIntensities = this.screenLights.map(light => {
      if (light instanceof THREE.RectAreaLight) return light.intensity;
      if (light instanceof THREE.DirectionalLight) return light.intensity;
      return 1;
    });

    const animateIntensity = () => {
      if (progress < 1) {
        progress += 0.03;
        
        this.screenLights.forEach((light, index) => {
          const targetIntensity = initialIntensities[index];
          const currentIntensity = targetIntensity * this.easeInOutCubic(progress);
          
          if (light instanceof THREE.RectAreaLight) {
            light.intensity = currentIntensity;
          } else if (light instanceof THREE.DirectionalLight) {
            light.intensity = currentIntensity;
          }
        });
        
        requestAnimationFrame(animateIntensity);
      }
    };
    animateIntensity();
  }
  //#endregion

  //#region Screen Activation Sequence
  private activateScreen(): void {
    if (!this.animationCompleted) {
      this.animationCompleted = true;
      
      this.ngZone.run(() => {
        this.isScreenActive = true;
        this.executeActivationSequence();
      });
      
      console.log('🎬 Animação completada - Sequência de ativação iniciada!');
    }
  }

  private executeActivationSequence(): void {
    setTimeout(() => {
      // 1. Ligar a tela (emissão verde)
      this.turnOnScreen();
      
      // 2. Ativar luzes da tela
      setTimeout(() => {
        this.activateScreenLights();
      }, 300);
      
      // 3. Ativar interface do screen component
      setTimeout(() => {
        this.activateScreenComponent();
      }, 600);
      
    }, 200);
  }

  private activateScreenComponent(): void {
    if (this.screenComponent) {
      this.screenComponent.activate();
    }
  }
  //#endregion

  //#region Animation System
  private startAnimationLoop(): void {
    this.animate();
  }

  private animate = () => {
    if (this.isDestroyed) return;

    this.animationId = requestAnimationFrame(this.animate);
    this.updateCameraAnimation();
    this.renderScene();
  };

  private updateCameraAnimation(): void {
    if (this.lerpProgress < 1) {
      this.updateAnimationProgress();
      this.updateCameraPosition();
      this.updateCameraLookAt();
    } else {
      this.finalizeCameraAnimation();
      this.activateScreen();
    }
  }

  private updateAnimationProgress(): void {
    this.lerpProgress += 0.004;
  }

  private updateCameraPosition(): void {
    const easedProgress = this.easeInOutCubic(this.lerpProgress);
    const newPos = new THREE.Vector3().lerpVectors(
      this.initialCameraPos,
      this.targetCameraPos,
      easedProgress
    );
    this.camera.position.copy(newPos);
  }

  private updateCameraLookAt(): void {
    const easedProgress = this.easeInOutCubic(this.lerpProgress);
    this.currentLookAt.lerpVectors(
      this.initialLookAt,
      this.targetLookAt,
      easedProgress
    );
    this.camera.lookAt(this.currentLookAt);
  }

  private finalizeCameraAnimation(): void {
    this.camera.position.copy(this.targetCameraPos);
    this.camera.lookAt(this.targetLookAt);
  }

  private renderScene(): void {
    this.renderer.render(this.scene, this.camera);
  }
  //#endregion

  //#region Event Handlers
  private onWindowResize(): void {
    if (!this.camera || !this.renderer) return;

    const { width, height } = this.getContainerDimensions();

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  //#endregion

  //#region Public Methods
  public setNewCameraTarget(position: THREE.Vector3, lookAt: THREE.Vector3): void {
    this.resetAnimation(position, lookAt);
    this.deactivateScreen();
  }

  private resetAnimation(position: THREE.Vector3, lookAt: THREE.Vector3): void {
    this.initialCameraPos.copy(this.camera.position);
    this.targetCameraPos.copy(position);
    
    this.initialLookAt.copy(this.currentLookAt);
    this.targetLookAt.copy(lookAt);
    
    this.lerpProgress = 0;
    this.animationCompleted = false;
  }

  private deactivateScreen(): void {
    this.ngZone.run(() => {
      this.isScreenActive = false;
      if (this.screenComponent) {
        this.screenComponent.isActive = false;
      }
    });
  }
  //#endregion

  //#region Utility Methods
  private getContainerDimensions() {
    return {
      width: this.sceneContainer.nativeElement.clientWidth,
      height: this.sceneContainer.nativeElement.clientHeight
    };
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  //#endregion

  //#region Cleanup
  private cleanupResources(): void {
    this.isDestroyed = true;
    
    if (typeof window !== 'undefined') {
      this.cleanupAnimations();
      this.cleanupThreeJs();
      this.cleanupEventListeners();
    }
  }

  private cleanupAnimations(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private cleanupThreeJs(): void {
    if (this.renderer) {
      this.renderer.dispose();
      this.removeRendererFromDOM();
    }
  }

  private removeRendererFromDOM(): void {
    const canvas = this.renderer.domElement;
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }

  private cleanupEventListeners(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }
  //#endregion
}
