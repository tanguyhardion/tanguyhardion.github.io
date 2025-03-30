import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisibilityObserverService {
  observeElementOnce(
    element: ElementRef,
    callback: (isRevealed: boolean) => void,
    options: IntersectionObserverInit = { threshold: 0.5, rootMargin: '0px' }
  ): void {
    if (!element) {
      console.error('Element reference is invalid.');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(true);
          observer.unobserve(element.nativeElement);
        }
      });
    }, options);

    observer.observe(element.nativeElement);
  }
}
