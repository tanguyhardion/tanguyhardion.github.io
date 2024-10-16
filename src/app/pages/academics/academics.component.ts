import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Academic } from '@model/interfaces/academic';
import { AcademicCardComponent } from '@components/academic-card/academic-card.component';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [CommonModule, AcademicCardComponent],
  templateUrl: './academics.component.html',
  styleUrl: './academics.component.scss'
})
export class AcademicsComponent {
  academicList: Academic[] = [
    {
      school: {
        name: 'Université de Technologie de Compiègne (UTC)',
        logo: 'utc.png',
        location: 'Compiègne, France',
        link: 'https://utc.fr/'
      },
      degree: 'UT Group Mobility Semester',
      field: 'Specialization in Artificial Intelligence and Data Science',
      dates: {
        start: new Date('2024-09-01'),
        end: new Date('2025-02-01')
      },
      relevantCoursework: [
        'Advanced Machine Learning',
        'Deep Learning',
        'Advanced Statistics',
        'Multi-Agent Systems'
      ]
    },
    {
      school: {
        name: 'Université de Technologie de Troyes (UTT)',
        logo: 'utt.png',
        location: 'Troyes, France',
        link: 'https://utt.fr/'
      },
      degree: "Engineer's degree",
      field: 'Computer Science and Information Systems, Data Science track',
      gpa: 'GPA: 3.67/4.0',
      dates: {
        start: new Date('2022-09-01'),
        end: new Date('2025-08-01')
      },
      relevantCoursework: [
        'Machine Learning',
        'Introductory Deep Learning',
        'Computer Vision',
        'Big Data',
        'Data Visualization',
        'Data Analytics',
        'Software Engineering'
      ]
    },
    {
      school: {
        name: 'IUT Dijon',
        logo: 'iut-dijon.png',
        location: 'Dijon, France',
        link: 'https://iutdijon.u-bourgogne.fr/'
      },
      degree: 'DUT (⇔ to an associate degree)',
      field: 'Computer Science',
      gpa: 'Top 10 out of 100',
      dates: {
        start: new Date('2020-09-01'),
        end: new Date('2022-07-01')
      },
      relevantCoursework: [
        'Algorithms',
        'Probability & Statistics',
        'Programming',
        'Web Development',
        'Databases',
        'Computer Networks',
        'Operating Systems',
      ]
    }
  ];
}
