import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageHelper } from '@utils/storage-helper';

@Component({
  selector: 'NavBar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isDropdownOpen = false;
  links = [
    { name: 'Home', path: '', color: '#dc143c' },
    { name: 'Academics', path: '/academics', color: '#ffdd48' },
    { name: 'Experience', path: '/experience', color: '#f16529' },
    { name: 'Projects', path: '/projects', color: '#5ec9f8' },
    { name: 'Skills', path: '/skills', color: '#9148ff' },
    { name: 'More', path: '/more', color: '#757678' }
  ];
  currentPath: string | undefined;

  selectedLang: { label: string; flag: string; value: string };
  languages = [
    { label: 'English', flag: 'assets/images/flags/us.png', value: 'en' },
    { label: 'French', flag: 'assets/images/flags/france.png', value: 'fr' }
  ];

  constructor(private router: Router, private translateService: TranslateService) {
    this.selectedLang =
      this.languages.find((lang) => lang.value === this.translateService.currentLang) ||
      this.languages[0];

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.urlAfterRedirects.split('/');
        this.currentPath = urlSegments[1] ? urlSegments[1] : '';
      }
    });

    // on click outside dropdown
    document.addEventListener('click', (event) => {
      if (!(event.target as HTMLElement).closest('.custom-select')) {
        this.isDropdownOpen = false;
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  getTitle(route: string | undefined): string {
    if (!route) {
      return 'Tanguy Hardion';
    }

    return route === 'index'
      ? 'Tanguy Hardion'
      : `Tanguy Hardion | ${route.charAt(0).toUpperCase() + route.slice(1)}`;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(option: { label: string; flag: string; value: string }) {
    this.selectedLang = option;
    this.isDropdownOpen = false;
    this.changeLang(option.value);
  }

  get filteredLanguages() {
    return this.languages.filter((lang) => lang.value !== this.selectedLang.value);
  }

  changeLang(language: any) {
    this.translateService.use(language);
    StorageHelper.set('lang', language);
  }
}
