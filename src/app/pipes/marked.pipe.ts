import { Pipe, type PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'marked',
  standalone: true
})
export class MarkedPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    const html = marked(value, {
      async: false
    });

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
