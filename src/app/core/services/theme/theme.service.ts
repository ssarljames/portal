import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


export interface Theme {
  href: string;
  name: string;

  primary: string,
  accent: string,

  displayName: string;
  isDark: boolean;
  selected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {

  private _themes: Theme[] =  [
    {
      href: 'assets/css/themes/cs3-default.css',
      primary: '#9C27B0',
      accent: '#4CAF50',
      displayName: 'Light Mode',
      name: 'yellow-amber-light',
      isDark: false,
      selected: true
    },
    {
      href: 'assets/css/themes/cs3-dark.css',
      primary: '#9C27B0',
      accent: '#4CAF50',
      displayName: 'Dark Mode',
      name: 'yellow-amber-dark',
      isDark: true,
      selected: false
    },
    // {
    //   href: 'assets/css/themes/deeppurple-amber.css',
    //   primary: '#673AB7',
    //   accent: '#FFC107',
    //   displayName: 'Deep Purple & Amber',
    //   name: 'deeppurple-amber',
    //   isDark: false,
    //   selected: false
    // },
    // {
    //   href: 'assets/css/themes/indigo-pink.css',
    //   primary: '#3F51B5',
    //   accent: '#E91E63',
    //   displayName: 'Indigo & Pink',
    //   name: 'indigo-pink',
    //   isDark: false,
    //   selected: false,
    // },
    // {
    //   href: 'assets/css/themes/pink-bluegrey.css',
    //   primary: '#E91E63',
    //   accent: '#607D8B',
    //   displayName: 'Pink & Blue-grey',
    //   name: 'pink-bluegrey',
    //   isDark: true,
    //   selected: false
    // },
    // {
    //   href: 'assets/css/themes/purple-green.css',
    //   primary: '#9C27B0',
    //   accent: '#4CAF50',
    //   displayName: 'Purple & Green',
    //   name: 'purple-green',
    //   isDark: true,
    //   selected: false
    // },
  ];

  currentTheme: Theme;
  themeIsLoaded: boolean = false;

  private themeLoading: BehaviorSubject<string>;

  constructor() {

    const theme_name = localStorage.getItem('theme');

    const theme = this._themes.find((t) => t.name == theme_name);

    this.themeLoading = new BehaviorSubject(theme ? theme.name : this._themes[0].name);

    if(theme)
      this.setTheme(theme);
    else
      this.setTheme(this._themes[0]);




  }

  ngOnInit(){

  }

  get theme(): Observable<string>{
    return this.themeLoading.asObservable();
  }


  get availableThemes(){
    return this._themes;
  }

  setTheme(theme: Theme): Theme{
    this.removeStyle(theme)
    this.getLinkElementForKey(theme.name).setAttribute('href', theme.href);
    localStorage.setItem('theme', theme.name);
    theme.selected = true;
    return theme;
  }

  private removeStyle(theme: Theme) {

    const existingLinkElement = this.getExistingLinkElementByKey(theme.name);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }



  getLinkElementForKey(key: string) {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
  }

  createLinkElementWithKey(key: string) {
    this.themeIsLoaded = false;
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.id = 'active-theme';
    linkEl.classList.add(this.getClassNameForKey(key));

    linkEl.onload = () => {
      this.themeIsLoaded = false;
      this.themeLoading.next(key)
    };

    document.head.appendChild(linkEl);


    return linkEl;
  }

  getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }

}


