import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './achievements.html',
  styleUrls: ['./achievements.scss']
})
export class Achievements {

  achievements = [
    {
      value: '100+',
      label: 'Interviews Coordinated'
    },
    {
      value: '50+',
      label: 'Successful Onboardings'
    },
    {
      value: '20+',
      label: 'Events Organized'
    },
    {
      value: '100%',
      label: 'Documentation Accuracy'
    }
  ];

}
