import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  skills = [
    'Talent Acquisition',
    'Recruitment',
    'Onboarding',
    'Employee Relations',
    'Vendor Coordination',
    'MS Excel',
    'Communication'
  ];

}
