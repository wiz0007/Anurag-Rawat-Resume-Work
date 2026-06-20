import { Component } from '@angular/core';
import { About } from '../../sections/about/about';
import { Achievements } from '../../sections/achievements/achievements';
import { Certifications } from '../../sections/certifications/certifications';
import { Contact } from '../../sections/contact/contact';
import { Education } from '../../sections/education/education';
import { Experience } from '../../sections/experience/experience';
import { Hero } from '../../sections/hero/hero';
import { Projects } from '../../sections/projects/projects';
import { Skills } from '../../sections/skills/skills';
import { Footer } from '../../shared/footer/footer';
import { Loader } from '../../shared/loader/loader';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Loader, Navbar, Hero, About, Skills, Projects, Experience, Education, Certifications, Achievements, Contact, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {}
