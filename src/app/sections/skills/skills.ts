import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class Skills {

  skills = [
    'Talent Acquisition',
    'Candidate Screening',
    'Interview Coordination',
    'Employee Engagement',
    'HR Documentation',
    'Payroll Coordination',
    'MS Excel',
    'MS PowerPoint',
    'MS Word',
    'Vendor Coordination',
    'Conflict Resolution',
    'Communication Skills'
  ];

}
