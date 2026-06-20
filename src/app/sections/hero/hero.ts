import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SceneCanvas } from '../../shared/scene-canvas/scene-canvas';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SceneCanvas, RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  readonly profile = {
    name: 'Anurag Rawat',
    role: 'HR Coordinator',
    tagline: 'People operations, thoughtfully coordinated.'
  };
}
