import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

import { BaseCardComponent } from '@components/base-card/base-card.component';
import { Experience } from '@model/interfaces/experience';
import { FormatDatePipe } from '@pipes/format-date.pipe';
import { VisibilityObserverService } from '@services/visibility-observer.service';

@Component({
  selector: 'ExperienceCard',
  imports: [CommonModule, TranslatePipe, FormatDatePipe, AnimateOnScrollModule],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss'
})
export class ExperienceCardComponent extends BaseCardComponent {
  @Input() experience: Experience;

  constructor(
    protected override visibilityObserverService: VisibilityObserverService,
    private translateService: TranslateService
  ) {
    super(visibilityObserverService);
  }

  protected getImageId(): string {
    return `image-${this.experience.company.logo}`;
  }

  get projectText(): string {
    if (this.translateService.currentLang === 'fr') {
      return this.experience.relatedProjects.length > 1 ? 'Projets' : 'Projet';
    }
    return this.experience.relatedProjects.length > 1 ? 'Projects' : 'Project';
  }
}
