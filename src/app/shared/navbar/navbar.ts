import { Component, HostListener, signal } from '@angular/core';

@Component({ selector: 'app-navbar', standalone: true, templateUrl: './navbar.html', styleUrl: './navbar.scss' })
export class Navbar {
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void { this.scrolled.set(window.scrollY > 24); }

  close(): void { this.menuOpen.set(false); }
}
