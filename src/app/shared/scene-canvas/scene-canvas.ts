import { Component, DestroyRef, ElementRef, Input, afterNextRender, inject, viewChild } from '@angular/core';
import { SceneVariant, ThreeSceneService } from '../../core/three/three-scene.service';

@Component({
  selector: 'app-scene-canvas',
  standalone: true,
  templateUrl: './scene-canvas.html',
  styleUrl: './scene-canvas.scss'
})
export class SceneCanvas {
  @Input() variant: SceneVariant = 'hero';
  @Input() eager = false;
  @Input() label = 'Decorative interactive 3D scene';

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly scenes = inject(ThreeSceneService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.observe());
  }

  private observe(): void {
    const canvas = this.canvas().nativeElement;
    let mounted = false;
    let controller: Awaited<ReturnType<ThreeSceneService['mount']>> | undefined;
    const mount = async () => {
      if (mounted) return;
      mounted = true;
      try {
        controller = await this.scenes.mount(canvas, this.variant);
      } catch {
        canvas.dataset['fallback'] = 'true';
      }
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries[0]?.isIntersecting ?? false;
      if (visible) void mount();
      controller?.setActive(visible);
    }, { rootMargin: '220px 0px', threshold: 0.01 });
    observer.observe(canvas);
    if (this.eager) void mount();
    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      controller?.dispose();
    });
  }
}
