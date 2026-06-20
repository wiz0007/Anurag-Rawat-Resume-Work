import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './certifications.html',
  styleUrls: ['./certifications.scss']
})
export class Certifications {

  certifications = [
    {
      title: 'Advanced MS Excel'
    },
    {
      title: 'HR Documentation'
    },
    {
      title: 'Recruitment & Talent Acquisition'
    },
    {
      title: 'Employee Relations'
    }
  ];

}
