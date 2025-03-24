import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Project } from '@model/interfaces/project';
import { ProjectContext } from '@model/enums/project-context';
import { VisibilityObserverService } from '@services/visibility-observer.service';
import getImageColor from '@utils/image-color';

@Component({
    selector: 'ProjectCard',
    imports: [CommonModule, TranslatePipe],
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent implements AfterViewInit {
  @Input() project: Project;
  @ViewChild('card', { static: false }) cardElement: ElementRef;

  backgroundColor = '';
  isRevealed = false;
  ProjectContext = ProjectContext;

  constructor(private visibilityObserverService: VisibilityObserverService) {}

  async ngAfterViewInit(): Promise<void> {
    this.backgroundColor = (await getImageColor(`image-${this.project.image}`)) || '#000';

    if (this.cardElement) {
      this.visibilityObserverService.observeElementOnce(this.cardElement, (isRevealed) => {
        this.isRevealed = isRevealed;
      });
    }
  }
}
