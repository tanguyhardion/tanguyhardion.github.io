import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectCardComponent } from '@components/project-card/project-card.component';
import { ProjectContext } from '@model/enums/project-context';
import { Project } from '@model/interfaces/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projectList: Project[] = [
    {
      titleKey: 'projects.ml_challenge.title',
      descriptionKey: 'projects.ml_challenge.description',
      durationKey: 'projects.ml_challenge.duration',
      team: 3,
      technologies: ['R (FNN, caret, XGBoost, randomForest, etc.)'],
      context: ProjectContext.School,
      contextLogo: 'utc.png',
      contextLogoLink: 'https://www.utc.fr/',
      image: 'ml.jpg'
    },
    {
      titleKey: 'projects.personal_website.title',
      descriptionKey: 'projects.personal_website.description',
      durationKey: 'projects.personal_website.duration',
      team: 1,
      technologies: ['Vue.js (Nuxt)', 'GitHub Pages'],
      context: ProjectContext.Personal,
      image: 'website.png',
      link: 'https://github.com/tanguyhardion/tanguyhardion.github.io'
    },
    {
      titleKey: 'projects.cpage_map.title',
      descriptionKey: 'projects.cpage_map.description',
      durationKey: 'projects.cpage_map.duration',
      team: 1,
      technologies: ['Angular', 'SpringBoot', 'Flask', 'PostgreSQL', 'HuggingFace', 'ETL'],
      context: ProjectContext.Work,
      contextLogo: 'cpage.png',
      contextLogoLink: 'https://www.cpage.fr/',
      image: 'map.png'
    },
    {
      titleKey: 'projects.cnn_cifar100.title',
      descriptionKey: 'projects.cnn_cifar100.description',
      durationKey: 'projects.cnn_cifar100.duration',
      team: 1,
      context: ProjectContext.School,
      contextLogo: 'utt.png',
      contextLogoLink: 'https://www.utt.fr/',
      technologies: ['TensorFlow', 'Keras', 'HuggingFace'],
      image: 'cnn.jpg',
      link: 'https://github.com/tanguyhardion/cifar100-cnn'
    },
    {
      titleKey: 'projects.llama2_finetuning.title',
      descriptionKey: 'projects.llama2_finetuning.description',
      durationKey: 'projects.llama2_finetuning.duration',
      team: 1,
      context: ProjectContext.Work,
      contextLogo: 'cpage.png',
      contextLogoLink: 'https://www.cpage.fr/',
      technologies: ['PyTorch', 'HuggingFace', 'Meta AI'],
      image: 'llama2.jpg'
    },
    {
      titleKey: 'projects.visualizer.title',
      descriptionKey: 'projects.visualizer.description',
      durationKey: 'projects.visualizer.duration',
      team: 1,
      context: ProjectContext.Work,
      contextLogo: 'cpage.png',
      contextLogoLink: 'https://www.cpage.fr/',
      technologies: ['Angular', 'SpringBoot', 'Oracle'],
      image: 'graph.png'
    }
  ];
}
