import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ExperienceCardComponent } from '@components/experience-card/experience-card.component';
import { JobType } from '@model/enums/job-type';
import { Experience } from '@model/interfaces/experience';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceCardComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experienceList: Experience[] = [
    {
      company: {
        name: 'CPage',
        logo: 'cpage.png',
        location: 'Dijon, France',
        link: 'https://www.cpage.fr/',
      },
      position: 'Junior Software Engineer',
      jobType: JobType.FixedTerm,
      description: 'Summer job that followed my previous internship.',
      projects: ['CPage Map'],
      dates: {
        start: new Date('2024-07-01'),
        end: new Date('2024-08-01'),
      },
    },
    {
      company: {
        name: 'CPage',
        logo: 'cpage.png',
        location: 'Dijon, France',
        link: 'https://www.cpage.fr/',
      },
      position: 'Software Engineer Intern',
      jobType: JobType.Internship,
      description: `Mid-engineering degree internship at CPage, a company that develops software for public health institutions.`,
      projects: ['Visualizer', 'Llama 2 fine-tuning'],
      dates: {
        start: new Date('2024-07-01'),
        end: new Date('2024-12-31'),
      },
    },
    {
      company: {
        name: 'Autoroutes Paris-Rhin-Rhône (APRR)',
        logo: 'aprr.png',
        location: 'Saint-Apollinaire, France',
        link: 'https://aprr.fr/',
      },
      position: 'Software Developer Intern',
      jobType: JobType.Internship,
      description: `Final year DUT (associate degree) internship in the department that manages
    the installation and support of the systems used by the company.`,
      projects: [],
      dates: {
        start: new Date('2022-04-01'),
        end: new Date('2022-06-01'),
      },
    },
  ];
}
