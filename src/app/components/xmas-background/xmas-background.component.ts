import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Snowflake {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  fontSize: string;
  color: string;
  content: string;
  animationName: string;
}

@Component({
  selector: 'app-xmas-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xmas-background.component.html',
  styleUrls: ['./xmas-background.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class XmasBackgroundComponent implements OnInit {
  snowflakes: Snowflake[] = [];
  private nextId = 0;

  ngOnInit() {
    const snowflakeCount = this.getSnowflakeCount();
    this.snowflakes = Array.from({ length: snowflakeCount }, () => this.createSnowflake());
  }

  private getSnowflakeCount(): number {
    const width = window.innerWidth;
    if (width < 480) {
      return 15; // Mobile (small)
    } else if (width < 768) {
      return 25; // Mobile/Tablet (medium)
    } else if (width < 1024) {
      return 35; // Tablet (large)
    } else {
      return 50; // Desktop
    }
  }

  createSnowflake(initial = true): Snowflake {
    return {
      id: this.nextId++,
      left: Math.random() * 100 + 'vw',
      animationDuration: (Math.random() * 5 + 5) + 's',
      animationDelay: initial ? (Math.random() * 20) + 's' : '0s',
      opacity: Math.random(),
      fontSize: (Math.random() * 25 + 10) + 'px',
      color: this.getRandomColor(),
      content: this.getRandomShape(),
      animationName: 'fall-' + (Math.floor(Math.random() * 3) + 1)
    };
  }

  getRandomColor(): string {
    const colors = ['#ffffff', '#add8e6', '#e0ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getRandomShape(): string {
    const shapes = ['\u2744', '\u2745', '\u2746'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  onAnimationEnd(index: number) {
    this.snowflakes[index] = this.createSnowflake(false);
  }

  trackByFn(index: number, item: Snowflake): number {
    return item.id;
  }
}
