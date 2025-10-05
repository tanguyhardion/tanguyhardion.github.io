import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { VisibilityObserverService } from '@services/visibility-observer.service';
import getImageColor from '@utils/image-color';

/**
 * Base component for cards that use image-based gradients.
 * Provides common functionality for extracting image colors and applying them as gradients.
 */
@Component({
  template: ''
})
export abstract class BaseCardComponent implements AfterViewInit {
  @ViewChild('card', { static: false }) cardElement: ElementRef;

  backgroundColor = '';
  isRevealed = false;

  constructor(protected visibilityObserverService: VisibilityObserverService) {}

  /**
   * Returns the image ID used to extract the color.
   * Must be implemented by child components.
   */
  protected abstract getImageId(): string;

  async ngAfterViewInit(): Promise<void> {
    await this.initializeGradient();
    this.observeCardVisibility();
  }

  /**
   * Initializes the gradient by extracting the main color from the card's image.
   */
  private async initializeGradient(): Promise<void> {
    const imageId = this.getImageId();
    this.backgroundColor = (await getImageColor(imageId)) || '#000';
  }

  /**
   * Sets up visibility observation for animation purposes.
   */
  private observeCardVisibility(): void {
    if (this.cardElement) {
      this.visibilityObserverService.observeElementOnce(this.cardElement, (isRevealed) => {
        this.isRevealed = isRevealed;
      });
    }
  }

  /**
   * Utility method for encoding URI components.
   * Useful for child components that need to generate links.
   */
  protected encodeURIComponent(str: string): string {
    return encodeURIComponent(str);
  }
}
