import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class Education {

  education = [
    {
      degree: 'Bachelor of Business Administration',
      institute: 'KC Group of Institutions',
      year: '2024 - 2027'
    },
    {
      degree: 'Diploma in Hotel Management',
      institute: 'Renaissance College',
      year: '2022 - 2023'
    },
    {
      degree: 'Intermediate Commerce',
      institute: 'Shivalik Holy Mount Academy',
      year: '2020 - 2021'
    }
  ];

}
