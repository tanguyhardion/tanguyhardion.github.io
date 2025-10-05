import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

import { BaseCardComponent } from '@components/base-card/base-card.component';
import { Academic } from '@model/interfaces/academic';
import { FormatDatePipe } from '@pipes/format-date.pipe';
import { VisibilityObserverService } from '@services/visibility-observer.service';

@Component({
  selector: 'AcademicCard',
  imports: [CommonModule, TranslatePipe, FormatDatePipe, AnimateOnScrollModule],
  templateUrl: './academic-card.component.html',
  styleUrl: './academic-card.component.scss'
})
export class AcademicCardComponent extends BaseCardComponent {
  @Input() academic: Academic;

  constructor(protected override visibilityObserverService: VisibilityObserverService) {
    super(visibilityObserverService);
  }

  protected getImageId(): string {
    return `image-${this.academic.school.logo}`;
  }
}
