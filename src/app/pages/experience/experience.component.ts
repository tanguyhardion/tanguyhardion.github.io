import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ExperienceCardComponent } from '@components/experience-card/experience-card.component';
import { JobType } from '@model/enums/job-type';
import { Experience } from '@model/interfaces/experience';

@Component({
  selector: 'experience',
  imports: [CommonModule, ExperienceCardComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experienceList: Experience[] = [
    {
      company: {
        name: 'Deloitte',
        logo: 'deloitte.png',
        location: 'Luxembourg',
        link: 'https://www.deloitte.lu/'
      },
      positionKey: 'experience.deloitte.position.ai_data_science_trainee',
      jobType: JobType.Internship,
      descriptionKey: 'experience.deloitte.description.final_engineering_internship',
      relatedProjects: [],
      dates: {
        start: new Date('2025-02-01'),
        end: new Date('2025-07-31')
      }
    },
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
      relatedProjects: [{ id: 'cpagemap', name: 'CPage Map' }],
      dates: {
        start: new Date('2024-07-01'),
        end: new Date('2024-08-31')
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
      relatedProjects: [
        { id: 'visualizer', name: 'Visualizer' },
        { id: 'llama2', name: 'Llama 2 fine-tuning' }
      ],
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
      descriptionKey: 'experience.aprr.description.dut_internship',
      relatedProjects: [],
      dates: {
        start: new Date('2022-04-01'),
        end: new Date('2022-06-30')
      }
    }
  ];
}
