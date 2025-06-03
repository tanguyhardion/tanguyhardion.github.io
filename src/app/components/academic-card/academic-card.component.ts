import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

import { Academic } from '@model/interfaces/academic';
import { FormatDatePipe } from '@pipes/format-date.pipe';
import { VisibilityObserverService } from '@services/visibility-observer.service';
import getImageColor from '@utils/image-color';

@Component({
  selector: 'AcademicCard',
  imports: [CommonModule, TranslatePipe, FormatDatePipe, AnimateOnScrollModule],
  templateUrl: './academic-card.component.html',
  styleUrl: './academic-card.component.scss'
})
export class AcademicCardComponent implements AfterViewInit {
  @Input() academic: Academic;
  @ViewChild('card', { static: false }) cardElement: ElementRef;

  isRevealed = false;
  backgroundColor = '';

  constructor(private visibilityObserverService: VisibilityObserverService) {}

  async ngAfterViewInit(): Promise<void> {
    this.backgroundColor = (await getImageColor(`image-${this.academic.school.logo}`)) || '#000';

    if (this.cardElement) {
      this.visibilityObserverService.observeElementOnce(this.cardElement, (isRevealed) => {
        this.isRevealed = isRevealed;
      });
    }
  }

  encodeURIComponent(str: string): string {
    return encodeURIComponent(str);
  }
}
