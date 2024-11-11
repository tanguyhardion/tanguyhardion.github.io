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
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experienceList: Experience[] = [
    {
      company: {
        name: 'CPage',
        logo: 'cpage.png',
        location: 'Dijon, France',
        link: 'https://www.cpage.fr/'
      },
      positionKey: 'experience.cpage.position.junior_software_engineer',
      jobType: JobType.FixedTerm,
      descriptionKey: 'experience.cpage.description.summer_job',
      projects: ['CPage Map'],
      dates: {
        start: new Date('2024-07-01'),
        end: new Date('2024-08-01')
      }
    },
    {
      company: {
        name: 'CPage',
        logo: 'cpage.png',
        location: 'Dijon, France',
        link: 'https://www.cpage.fr/'
      },
      positionKey: 'experience.cpage.position.software_engineer_intern',
      jobType: JobType.Internship,
      descriptionKey: 'experience.cpage.description.mid_degree_internship',
      projects: ['Visualizer', 'Llama 2 fine-tuning'],
      dates: {
        start: new Date('2024-07-01'),
        end: new Date('2024-12-31')
      }
    },
    {
      company: {
        name: 'Autoroutes Paris-Rhin-Rhône (APRR)',
        logo: 'aprr.png',
        location: 'Saint-Apollinaire, France',
        link: 'https://aprr.fr/'
      },
      positionKey: 'experience.aprr.position.software_developer_intern',
      jobType: JobType.Internship,
      descriptionKey: 'experience.aprr.description.final_year_internship',
      projects: [],
      dates: {
        start: new Date('2022-04-01'),
        end: new Date('2022-06-01')
      }
    }
  ];
}
