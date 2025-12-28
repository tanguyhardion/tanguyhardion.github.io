import { Component, ViewEncapsulation, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
export class XmasBackgroundComponent implements OnInit, OnDestroy {
  snowflakes: Snowflake[] = [];
  private nextId = 0;
  private visibilityHandler: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.visibilityHandler = this.handleVisibilityChange.bind(this);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSnowflakes(false);
      document.addEventListener('visibilitychange', this.visibilityHandler);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
  }

  private handleVisibilityChange() {
    if (!document.hidden) {
      this.initSnowflakes(true);
    }
  }

  private initSnowflakes(distribute: boolean) {
    const snowflakeCount = this.getSnowflakeCount();
    this.snowflakes = Array.from({ length: snowflakeCount }, () => 
      this.createSnowflake(distribute ? 'distributed' : 'initial')
    );
  }

  private getSnowflakeCount(): number {
    const width = window.innerWidth;
    if (width < 480) {
      return 10; // Mobile (small)
    } else if (width < 768) {
      return 15; // Mobile/Tablet (medium)
    } else if (width < 1024) {
      return 25; // Tablet (large)
    } else {
      return 35; // Desktop
    }
  }

  createSnowflake(mode: 'initial' | 'respawn' | 'distributed' = 'initial'): Snowflake {
    const durationVal = Math.random() * 5 + 5;
    const duration = durationVal + 's';
    
    let delay = '0s';
    if (mode === 'initial') {
      delay = (Math.random() * 20) + 's';
    } else if (mode === 'distributed') {
      delay = -(Math.random() * durationVal) + 's';
    }

    return {
      id: this.nextId++,
      left: Math.random() * 100 + 'vw',
      animationDuration: duration,
      animationDelay: delay,
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
    this.snowflakes[index] = this.createSnowflake('respawn');
  }

  trackByFn(index: number, item: Snowflake): number {
    return item.id;
  }
}
