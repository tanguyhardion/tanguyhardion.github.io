import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { NavbarComponent } from '@components/navbar/navbar.component';
import { NavColorService } from '@services/nav-color.service';
import hexToRgba from '@utils/hex-to-rgba';
import { StorageHelper } from '@utils/storage-helper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  homePage: boolean;
  x = 0;
  y = 0;
  targetX = 0;
  targetY = 0;
  backlightOn = false;

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title,
    private translateService: TranslateService,
    private navColorService: NavColorService
  ) {
    // mouse backlight
    this.smoothMove();

    // translation configuration
    const langs = ['fr', 'en'];
    this.translateService.addLangs(langs);
    this.translateService.setDefaultLang('en');
    const storedLang = StorageHelper.get('lang');
    if (storedLang && langs.includes(storedLang)) {
      this.translateService.use(storedLang);
    } else {
      const browserLang = this.translateService.getBrowserLang() || 'en';
      this.translateService.use(langs.includes(browserLang) ? browserLang : 'en');
    }

    // page title configuration
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.homePage = event.url === '/';
        document.title = this.getTitle(event.url);
      }
    });

    // meta configuration
    this.title.setTitle('Tanguy Hardion');
    this.meta.addTags([
      { name: 'author', content: "Tanguy Hardion's website" },
      {
        name: 'description',
        content:
          'Student specializing in AI and Data Science at UTC, France. Passionate about technology, innovation and entrepreneurship.'
      },
      { name: 'keywords', content: 'Tanguy Hardion, personal website, portfolio' }
    ]);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.backlightOn) {
      this.x = event.clientX;
      this.y = event.clientY;
      this.backlightOn = true;
    }
    this.targetX = event.clientX;
    this.targetY = event.clientY;
  }

  get backlightStyle() {
    const currentLink = this.navColorService.getCurrentLink();
    const color = currentLink != undefined ? currentLink.color : '#ffffff';
    return {
      'left.px': this.x,
      'top.px': this.y,
      background: `radial-gradient(circle, ${hexToRgba(color, 0.5)} 0%, ${hexToRgba(color, 0)} 80%)`
    };
  }

  private smoothMove() {
    setInterval(() => {
      this.x += (this.targetX - this.x) * 0.1;
      this.y += (this.targetY - this.y) * 0.1;
    }, 16);
  }

  private getTitle(route: string) {
    const cleanRoute = route.replace('/', '') || 'home';

    if (cleanRoute === 'home') {
      return 'Tanguy Hardion';
    }

    return 'Tanguy Hardion' + ' - ' + cleanRoute.charAt(0).toUpperCase() + cleanRoute.slice(1);
  }
}
