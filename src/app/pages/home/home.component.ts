import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ProfileInfoComponent } from '@components/profile-info/profile-info.component';

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
  selector: 'home',
  imports: [CommonModule, ProfileInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
    const angle = Math.random() * 30 + 15; // 15 to 45 degrees
    const sign = Math.random() > 0.5 ? 1 : -1;
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * -20}%`, // Start slightly above or near top
      transform: `rotate(${angle * sign}deg)`, // Random angle avoiding vertical
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
}
