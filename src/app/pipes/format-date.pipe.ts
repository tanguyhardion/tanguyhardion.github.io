import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(date: Date | undefined): string {
    if (!date) {
      return 'Present';
    }

    return `${date.toLocaleString('en', { month: 'short' })}. ${date.getFullYear()}`;
  }
}
