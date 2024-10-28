import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'NavBar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  links = [
    { name: 'Home', path: '', color: '#dc143c' },
    { name: 'Academics', path: '/academics', color: '#ffdd48' },
    { name: 'Experience', path: '/experience', color: '#f16529' },
    { name: 'Projects', path: '/projects', color: '#5ec9f8' },
    { name: 'Skills', path: '/skills', color: '#9148ff' },
    { name: 'Interests', path: '/interests', color: '#00b159' },
    { name: 'More', path: '/more', color: '#757678' }
  ];
  currentPath: string | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.urlAfterRedirects.split('/');
        this.currentPath = urlSegments[1] ? urlSegments[1] : '';
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
}
