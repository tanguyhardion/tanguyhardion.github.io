import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AcademicCardComponent } from '@components/academic-card/academic-card.component';
import { Academic } from '@model/interfaces/academic';

@Component({
  selector: 'app-academics',
  imports: [CommonModule, AcademicCardComponent],
  templateUrl: './academics.component.html',
  styleUrl: './academics.component.scss'
})
export class AcademicsComponent {
  academicList: Academic[] = [
    {
      school: {
        nameKey: 'academics.utc.name',
        logo: 'utc.png',
        location: 'Compiègne, France',
        link: 'https://utc.fr/'
      },
      degreeKey: 'academics.utc.degree',
      fieldKey: 'academics.utc.field',
      dates: {
        start: new Date('2024-09-01'),
        end: new Date('2025-02-01')
      },
      relevantCourseworkKeys: [
        'academics.utc.coursework.advanced_ml',
        'academics.utc.coursework.deep_learning',
        'academics.utc.coursework.advanced_statistics',
        'academics.utc.coursework.multi_agent_systems'
      ]
    },
    {
      school: {
        nameKey: 'academics.utt.name',
        logo: 'utt.png',
        location: 'Troyes, France',
        link: 'https://utt.fr/'
      },
      degreeKey: 'academics.utt.degree',
      fieldKey: 'academics.utt.field',
      gpaKey: 'academics.utt.gpa',
      dates: {
        start: new Date('2022-09-01'),
        end: new Date('2025-08-01')
      },
      relevantCourseworkKeys: [
        'academics.utt.coursework.ml',
        'academics.utt.coursework.deep_learning',
        'academics.utt.coursework.computer_vision',
        'academics.utt.coursework.big_data',
        'academics.utt.coursework.data_visualization',
        'academics.utt.coursework.data_analytics',
        'academics.utt.coursework.software_engineering'
      ]
    },
    {
      school: {
        nameKey: 'academics.iut_dijon.name',
        logo: 'iut-dijon.png',
        location: 'Dijon, France',
        link: 'https://iutdijon.u-bourgogne.fr/'
      },
      degreeKey: 'academics.iut_dijon.degree',
      fieldKey: 'academics.iut_dijon.field',
      gpaKey: 'academics.iut_dijon.gpa',
      dates: {
        start: new Date('2020-09-01'),
        end: new Date('2022-07-01')
      },
      relevantCourseworkKeys: [
        'academics.iut_dijon.coursework.algorithms',
        'academics.iut_dijon.coursework.probability_statistics',
        'academics.iut_dijon.coursework.programming',
        'academics.iut_dijon.coursework.web_development',
        'academics.iut_dijon.coursework.databases',
        'academics.iut_dijon.coursework.computer_networks',
        'academics.iut_dijon.coursework.operating_systems'
      ]
    }
  ];
}
