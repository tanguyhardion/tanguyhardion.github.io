import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MarkedPipe } from '@pipes/marked.pipe';
import dayjs from 'dayjs';
import { PlanetSystemComponent } from '../planet-system/planet-system.component';

interface ShootingStar {
  style: {
    left: string;
    top: string;
    transform: string;
    '--duration': string;
  };
  animating: boolean;
}

@Component({
  selector: 'ProfileInfo',
  imports: [CommonModule, TranslatePipe, MarkedPipe, PlanetSystemComponent],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, AfterViewInit {
  @ViewChild('info') infoEl!: ElementRef<HTMLDivElement>;
  stars: ShootingStar[] = [];

  ngOnInit(): void {
    this.initStars();
  }

  initStars(): void {
    const starCount = 2; // Reduced number of stars
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        style: this.getRandomStyle(),
        animating: false
      });

      // Initial random start
      setTimeout(() => {
        this.stars[i].animating = true;
      }, Math.random() * 3000);
    }
  }

  getRandomStyle() {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * -20}%`, // Start slightly above or near top
      transform: `rotate(${Math.random() * 60 - 30}deg)`, // Random angle
      '--duration': `${2 + Math.random() * 2}s` // 2-4s duration
    } as any;
  }

  onAnimationEnd(index: number) {
    this.stars[index].animating = false;

    // Random delay before next appearance
    setTimeout(
      () => {
        this.stars[index].style = this.getRandomStyle();
        this.stars[index].animating = true;
      },
      Math.random() * 5000 + 2000
    ); // 2-7s delay
  }

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
