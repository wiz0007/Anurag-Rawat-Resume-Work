import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader implements OnInit {

  readonly isVisible = signal(true);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {

    const loaderTimer = setTimeout(() => {
      this.isVisible.set(false);
    }, 2500);

    this.destroyRef.onDestroy(() => clearTimeout(loaderTimer));

  }

}
