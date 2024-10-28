import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _userLang: string = 'en';

  constructor() {
    i18n.global.locale = userLang.startsWith('fr') ? 'fr' : 'en';
  }

  get userLang() {
    return this._userLang;
  }
}
