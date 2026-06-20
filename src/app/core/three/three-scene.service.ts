import { Injectable, NgZone, inject } from '@angular/core';
import type { Material, Mesh } from 'three';

export type SceneVariant = 'hero' | 'workspace' | 'skills' | 'contact';

export interface SceneController {
  dispose(): void;
  setActive(active: boolean): void;
}

@Injectable({ providedIn: 'root' })
export class ThreeSceneService {
  private readonly zone = inject(NgZone);

  async mount(canvas: HTMLCanvasElement, variant: SceneVariant): Promise<SceneController> {
    const THREE = await import('three');
    const { gsap } = await import('gsap');
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = matchMedia('(max-width: 760px)').matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !compact,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1.15 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.25, variant === 'workspace' ? 8.2 : 7);

    const root = new THREE.Group();
    scene.add(root);
    this.addLighting(THREE, scene);
    this.addParticles(THREE, scene, compact ? 140 : variant === 'hero' ? 520 : 260);
    this.buildScene(THREE, root, variant, compact);

    root.scale.setScalar(0.72);
    root.rotation.x = 0.12;
    gsap.to(root.scale, { x: 1, y: 1, z: 1, duration: reduceMotion ? 0 : 1.2, ease: 'power3.out' });
    gsap.fromTo(root.rotation, { y: -0.35 }, { y: 0, duration: reduceMotion ? 0 : 1.35, ease: 'power3.out' });

    let active = true;
    let disposed = false;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = Math.max(canvas.clientWidth, 1);
      const height = Math.max(canvas.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });

    const render = () => {
      if (disposed) return;
      frame = requestAnimationFrame(render);
      if (!active) return;
      const elapsed = clock.getElapsedTime();
      if (!reduceMotion) {
        root.rotation.y += (pointerX * 0.22 - root.rotation.y) * 0.025;
        root.rotation.x += (-pointerY * 0.1 + 0.08 - root.rotation.x) * 0.025;
        root.position.y = Math.sin(elapsed * 0.65) * 0.08;
        scene.rotation.y = elapsed * 0.018;
      }
      renderer.render(scene, camera);
    };
    this.zone.runOutsideAngular(render);

    return {
      setActive: (value: boolean) => (active = value),
      dispose: () => {
        disposed = true;
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        canvas.removeEventListener('pointermove', onPointerMove);
        gsap.killTweensOf(root.scale);
        gsap.killTweensOf(root.rotation);
        scene.traverse((object) => {
          const mesh = object as Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) mesh.material.forEach((material: Material) => material.dispose());
          else mesh.material?.dispose();
        });
        renderer.dispose();
      }
    };
  }

  private addLighting(THREE: typeof import('three'), scene: import('three').Scene): void {
    scene.add(new THREE.HemisphereLight(0x8adfff, 0x090512, 1.7));
    const key = new THREE.PointLight(0x38bdf8, 32, 20);
    key.position.set(4, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x8b5cf6, 28, 18);
    rim.position.set(-5, -2, 3);
    scene.add(rim);
  }

  private addParticles(THREE: typeof import('three'), scene: import('three').Scene, count: number): void {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count * 3; index += 3) {
      positions[index] = (Math.random() - 0.5) * 15;
      positions[index + 1] = (Math.random() - 0.5) * 10;
      positions[index + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.025, transparent: true, opacity: 0.72 });
    scene.add(new THREE.Points(geometry, material));
  }

  private buildScene(
    THREE: typeof import('three'),
    root: import('three').Group,
    variant: SceneVariant,
    compact: boolean
  ): void {
    const cyan = new THREE.MeshStandardMaterial({ color: 0x22d3ee, metalness: 0.62, roughness: 0.2 });
    const violet = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.7, roughness: 0.18 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x101827, metalness: 0.58, roughness: 0.3 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x9bdcff, transparent: true, opacity: 0.28, roughness: 0.08, metalness: 0.2 });

    if (variant === 'hero') {
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, compact ? 1 : 2), glass);
      root.add(core);
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.75, 0.055, compact ? 80 : 150, 12), cyan);
      knot.rotation.x = Math.PI / 2.4;
      root.add(knot);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.025, 10, compact ? 80 : 160), violet);
      ring.rotation.set(1.15, 0.3, 0.2);
      root.add(ring);
      return;
    }

    if (variant === 'workspace') {
      const desk = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.2, 2.6), dark);
      desk.position.y = -1.35;
      root.add(desk);
      const monitor = new THREE.Mesh(new THREE.BoxGeometry(2.45, 1.5, 0.16), glass);
      monitor.position.set(0, 0.25, 0);
      root.add(monitor);
      const stand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.1, 0.18), violet);
      stand.position.y = -0.85;
      root.add(stand);
      const laptop = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 1.05), cyan);
      laptop.position.set(-1.6, -1.12, 0.25);
      root.add(laptop);
      for (let index = 0; index < 3; index++) {
        const book = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 0.85), index % 2 ? cyan : violet);
        book.position.set(1.65, -1.1 + index * 0.14, 0.25);
        root.add(book);
      }
      return;
    }

    if (variant === 'skills') {
      root.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, compact ? 1 : 3), glass));
      const total = compact ? 8 : 12;
      for (let index = 0; index < total; index++) {
        const angle = (index / total) * Math.PI * 2;
        const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), index % 2 ? cyan : violet);
        node.position.set(Math.cos(angle) * 2.55, Math.sin(angle * 2) * 0.65, Math.sin(angle) * 1.55);
        root.add(node);
      }
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.018, 8, 120), cyan);
      orbit.rotation.x = Math.PI / 2;
      root.add(orbit);
      return;
    }

    const ring = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.18, compact ? 80 : 150, 16), glass);
    root.add(ring);
    for (let index = 0; index < 5; index++) {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), index % 2 ? cyan : violet);
      node.position.set(Math.cos(index * 1.25) * 2.2, Math.sin(index * 1.25) * 1.6, -0.4);
      root.add(node);
    }
  }
}
