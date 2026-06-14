import { Component } from '@angular/core';

@Component({
  selector: 'app-achievements',
  standalone: true,
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