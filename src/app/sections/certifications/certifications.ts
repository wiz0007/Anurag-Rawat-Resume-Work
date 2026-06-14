import { Component } from '@angular/core';

@Component({
  selector: 'app-certifications',
  standalone: true,
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