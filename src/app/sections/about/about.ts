import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SceneCanvas } from '../../shared/scene-canvas/scene-canvas';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SceneCanvas, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  readonly active = signal(0);
  readonly hotspots = [
    { icon: '01', label: 'Profile', title: 'People-first operations', text: 'I coordinate recruitment, onboarding, documentation and employee support with an eye for clarity, trust and detail.' },
    { icon: '02', label: 'Experience', title: 'Hospitality-trained precision', text: 'Experience at JW Marriott shaped a calm, service-led approach to fast-moving operational work and diverse stakeholders.' },
    { icon: '03', label: 'Education', title: 'Business and hospitality', text: 'Business administration and hotel management studies support a practical understanding of people, service and operations.' },
    { icon: '04', label: 'Impact', title: 'Work that moves people forward', text: 'From interviews to joining formalities and workplace events, I focus on a dependable experience at every touchpoint.' }
  ];
}
