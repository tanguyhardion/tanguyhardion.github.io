import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageHelper } from '@utils/storage-helper';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  homePage: boolean;

  constructor(private router: Router, private translate: TranslateService) {
    // translation configuration
    const langs = ['fr', 'en'];
    this.translate.addLangs(langs);
    this.translate.setDefaultLang('en');
    const storedLang = StorageHelper.get('lang');
    if (storedLang && langs.includes(storedLang)) {
      this.translate.use(storedLang);
    } else {
      const browserLang = this.translate.getBrowserLang() || 'en';
      this.translate.use(langs.includes(browserLang) ? browserLang : 'en');
    }

    // page title configuration
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.homePage = event.url === '/';
        document.title = this.getTitle(event.url);
      }
    });
  }

  private getTitle(route: string) {
    const cleanRoute = route.replace('/', '') || 'home';

    if (cleanRoute === 'home') {
      return 'Tanguy Hardion';
    }

    return 'Tanguy Hardion' + ' - ' + cleanRoute.charAt(0).toUpperCase() + cleanRoute.slice(1);
  }
}
