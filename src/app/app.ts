import { Component } from '@angular/core';

import { Loader } from './shared/loader/loader';
import { Navbar } from './shared/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Experience } from './sections/experience/experience';
import { Education } from './sections/education/education';
import { Certifications } from './sections/certifications/certifications';
import { Achievements } from './sections/achievements/achievements';
import { Contact } from './sections/contact/contact';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Loader,
    Navbar,
    Hero,
    About,
    Skills,
    Experience,
    Education,
    Certifications,
    Achievements,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}