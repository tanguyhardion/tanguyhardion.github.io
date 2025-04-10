import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MarkedPipe } from '@pipes/marked.pipe';
import dayjs from 'dayjs';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'ProfileInfo',
  imports: [CommonModule, LottieComponent, TranslatePipe, MarkedPipe],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements AfterViewInit {
  @ViewChild('info') infoEl!: ElementRef<HTMLDivElement>;

  options: AnimationOptions = {
    path: 'assets/lottie/animation.json',
    renderer: 'canvas' as any
  };

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
