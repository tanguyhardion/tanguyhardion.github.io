import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MarkedPipe } from '@pipes/marked.pipe';
import dayjs from 'dayjs';

@Component({
  selector: 'ProfileInfo',
  imports: [CommonModule, TranslatePipe, MarkedPipe],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements AfterViewInit {
  @ViewChild('info') infoEl!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    setInterval(() => {
      const result = dayjs().diff(dayjs(1047423600000), 'year', true);
      const age = result.toString().substring(0, 12);
      const ageEl = this.infoEl.nativeElement.querySelector('.age-placeholder');
      if (ageEl) {
        ageEl.textContent = age;
      }
    }, 50);
  }
}
