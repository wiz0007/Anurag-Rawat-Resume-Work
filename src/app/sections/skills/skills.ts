import { Component, computed, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SceneCanvas } from '../../shared/scene-canvas/scene-canvas';

@Component({ selector: 'app-skills', standalone: true, imports: [SceneCanvas, RevealDirective], templateUrl: './skills.html', styleUrl: './skills.scss' })
export class Skills {
  readonly activeCategory = signal('Operations');
  readonly categories = ['Operations', 'People', 'Tools'];
  readonly skills = [
    { name: 'Recruitment', category: 'Operations', level: 92 },
    { name: 'Onboarding', category: 'Operations', level: 90 },
    { name: 'Documentation', category: 'Operations', level: 94 },
    { name: 'Employee engagement', category: 'People', level: 88 },
    { name: 'Communication', category: 'People', level: 93 },
    { name: 'Conflict resolution', category: 'People', level: 84 },
    { name: 'Microsoft Excel', category: 'Tools', level: 88 },
    { name: 'PowerPoint', category: 'Tools', level: 86 },
    { name: 'Word', category: 'Tools', level: 90 }
  ];
  readonly visibleSkills = computed(() => this.skills.filter((skill) => skill.category === this.activeCategory()));
}
