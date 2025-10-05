import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

import { BaseCardComponent } from '@components/base-card/base-card.component';
import { ProjectContext } from '@model/enums/project-context';
import { Project } from '@model/interfaces/project';
import { VisibilityObserverService } from '@services/visibility-observer.service';

@Component({
  selector: 'ProjectCard',
  imports: [CommonModule, TranslatePipe, AnimateOnScrollModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent extends BaseCardComponent {
  @Input() project: Project;

  ProjectContext = ProjectContext;

  constructor(protected override visibilityObserverService: VisibilityObserverService) {
    super(visibilityObserverService);
  }

  protected getImageId(): string {
    return `image-${this.project.image}`;
  }
}
