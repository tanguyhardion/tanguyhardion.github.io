import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavColorService {
  private links = [
    { nameKey: 'appBar.navigation.home', path: '/', color: '#dc143c' },
    { nameKey: 'appBar.navigation.academics', path: '/academics', color: '#ffdd48' },
    { nameKey: 'appBar.navigation.experience', path: '/experience', color: '#f16529' },
    { nameKey: 'appBar.navigation.projects', path: '/projects', color: '#5ec9f8' },
    { nameKey: 'appBar.navigation.skills', path: '/skills', color: '#9148ff' },
    { nameKey: 'appBar.navigation.more', path: '/more', color: '#757678' }
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
