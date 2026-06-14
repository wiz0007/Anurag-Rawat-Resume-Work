import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class Experience {

  experiences = [
    {
      company: 'JW Marriott',
      role: 'HR Coordinator',
      duration: '2023 - Present',
      points: [
        'Handling Recruitments',
        'Joining Formalities',
        'Bills Management',
        'Organizing Events'
      ]
    },
    {
      company: 'JW Marriott',
      role: 'OJT',
      duration: '2023',
      points: [
        'Recruitment Support',
        'Vendor Coordination',
        'Event Management'
      ]
    },
    {
      company: 'JW Marriott',
      role: 'Trainee',
      duration: '2022 - 2023',
      points: [
        'Cafeteria Supervision',
        'Presentation Preparation',
        'Administrative Support'
      ]
    },
    {
      company: 'Vijan Mahal',
      role: 'Industrial Trainee',
      duration: '2022',
      points: [
        'Food & Beverage Operations',
        'Banquet Operations',
        'Cafe Operations'
      ]
    }
  ];

}