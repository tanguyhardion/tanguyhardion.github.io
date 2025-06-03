import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavColorService {
  private links = [
    { nameKey: 'appBar.links.home', path: '/', color: '#dc143c' },
    { nameKey: 'appBar.links.academics', path: '/academics', color: '#ffdd48' },
    { nameKey: 'appBar.links.experience', path: '/experience', color: '#f16529' },
    { nameKey: 'appBar.links.projects', path: '/projects', color: '#5ec9f8' },
    { nameKey: 'appBar.links.skills', path: '/skills', color: '#9148ff' },
    { nameKey: 'appBar.links.more', path: '/more', color: '#757678' }
  ];
  private currentLink: { nameKey: string; path: string; color: string } | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLink = this.links.find((link) => link.path === event.urlAfterRedirects);
      }
    });
  }

  getLinks() {
    return this.links;
  }

  getCurrentLink() {
    return this.currentLink;
  }
}
