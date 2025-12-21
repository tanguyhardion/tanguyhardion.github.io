import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MarkedPipe } from '@pipes/marked.pipe';
import dayjs from 'dayjs';
import { PlanetSystemComponent } from '../planet-system/planet-system.component';

@Component({
  selector: 'ProfileInfo',
  imports: [CommonModule, TranslatePipe, MarkedPipe, PlanetSystemComponent],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements AfterViewInit {
  @ViewChild('info') infoEl!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    setInterval(() => {
      const result = dayjs().diff(dayjs(1046516400000), 'year', true);
      const age = result.toString().substring(0, 12);
      const ageEl = this.infoEl.nativeElement.querySelector('.age-placeholder');
      if (ageEl) {
        ageEl.textContent = age;
      }
    }, 50);
  }
}
