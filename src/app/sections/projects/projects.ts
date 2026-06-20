import { Component, computed, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({ selector: 'app-projects', standalone: true, imports: [RevealDirective], templateUrl: './projects.html', styleUrl: './projects.scss' })
export class Projects {
  readonly active = signal(0);
  readonly initiatives = [
    { number: '01', title: 'Recruitment Coordination', category: 'Talent operations', summary: 'A structured candidate journey connecting sourcing, screening, scheduling and stakeholder communication.', tags: ['Screening', 'Interview flow', 'Candidate care'] },
    { number: '02', title: 'Employee Onboarding', category: 'Employee experience', summary: 'A clear joining workflow designed around documentation, timely communication and a confident first day.', tags: ['Joining formalities', 'Documentation', 'Coordination'] },
    { number: '03', title: 'Workplace Engagement', category: 'Culture and events', summary: 'Employee events and operational touchpoints coordinated to strengthen participation and team connection.', tags: ['Events', 'Vendors', 'Communication'] },
    { number: '04', title: 'HR Administration', category: 'Process reliability', summary: 'Accurate records, billing coordination and reporting support that keep daily people operations dependable.', tags: ['Records', 'Bills', 'Reporting'] }
  ];
  readonly selected = computed(() => this.initiatives[this.active()]);

  move(direction: number): void {
    this.active.update((value) => (value + direction + this.initiatives.length) % this.initiatives.length);
  }

  offset(index: number): number {
    let value = index - this.active();
    const half = this.initiatives.length / 2;
    if (value > half) value -= this.initiatives.length;
    if (value < -half) value += this.initiatives.length;
    return value;
  }

  depth(index: number): number {
    return Math.min(Math.abs(this.offset(index)), 1);
  }
}
