import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

@Component({ selector: 'app-loader', standalone: true, templateUrl: './loader.html', styleUrl: './loader.scss' })
export class Loader {
  readonly isVisible = signal(true);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const timer = window.setTimeout(() => this.isVisible.set(false), 850);
      this.destroyRef.onDestroy(() => window.clearTimeout(timer));
    });
  }
}
