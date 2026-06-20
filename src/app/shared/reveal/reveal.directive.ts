import { Directive, DestroyRef, ElementRef, Input, afterNextRender, inject } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective {
  @Input() revealDelay = 0;
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.init());
  }

  private init(): void {
    const node = this.element.nativeElement;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const { gsap } = await import('gsap');
      gsap.fromTo(node, { autoAlpha: 0, y: 34 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: this.revealDelay,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility'
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    observer.observe(node);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
