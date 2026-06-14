import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

  profile = {
    name: 'Anurag Rawat',
    role: 'HR Coordinator',
    tagline: 'Building Strong Teams Through People & Process Excellence'
  };

}