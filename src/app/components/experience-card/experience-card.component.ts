import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Experience } from '@model/interfaces/experience';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { VisibilityObserverService } from '@services/visibility-observer.service';
import getImageColor from '@utils/image-color';

@Component({
  selector: 'ExperienceCard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss'
})
export class ExperienceCardComponent implements AfterViewInit {
  @Input() experience: Experience;
  @ViewChild('card', { static: false }) cardElement: ElementRef;

  backgroundColor = '';
  isRevealed = false;

  constructor(
    private visibilityObserverService: VisibilityObserverService,
    private translateService: TranslateService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    this.backgroundColor = (await getImageColor(`image-${this.experience.company.logo}`)) || '#000';

    if (this.cardElement) {
      this.visibilityObserverService.observeElementOnce(this.cardElement, (isRevealed) => {
        this.isRevealed = isRevealed;
      });
    }
  }

  formatDate(date: Date): string {
    return `${date.toLocaleString('en', {
      month: 'short'
    })}. ${date.getFullYear()}`;
  }

  get projectText(): string {
    if (this.translateService.currentLang === 'fr') {
      return this.experience.relatedProjects.length > 1 ? 'Projets' : 'Projet';
    }
    return this.experience.relatedProjects.length > 1 ? 'Projects' : 'Project';
  }
}
