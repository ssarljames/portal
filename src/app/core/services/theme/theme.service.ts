import { Injectable } from '@angular/core';


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
export class ThemeService {

  private _themes: Theme[] =  [
    {
      href: 'assets/css/themes/deeppurple-amber.css',
      primary: '#673AB7',
      accent: '#FFC107',
      displayName: 'Deep Purple & Amber',
      name: 'deeppurple-amber',
      isDark: false,
      selected: true
    },
    {
      href: 'assets/css/themes/indigo-pink.css',
      primary: '#3F51B5',
      accent: '#E91E63',
      displayName: 'Indigo & Pink',
      name: 'indigo-pink',
      isDark: false,
      selected: false,
    },
    {
      href: 'assets/css/themes/pink-bluegrey.css',
      primary: '#E91E63',
      accent: '#607D8B',
      displayName: 'Pink & Blue-grey',
      name: 'pink-bluegrey',
      isDark: true,
      selected: false
    },
    {
      href: 'assets/css/themes/purple-green.css',
      primary: '#9C27B0',
      accent: '#4CAF50',
      displayName: 'Purple & Green',
      name: 'purple-green',
      isDark: true,
      selected: false
    },
  ];

  currentTheme: Theme;

  constructor() { }


  get availableThemes(){
    return this._themes;
  }

  setTheme(theme: Theme): Theme{
    this.removeStyle(theme)
    getLinkElementForKey(theme.name).setAttribute('href', theme.href);
    return theme;
  }

  private removeStyle(theme: Theme) {

    const existingLinkElement = getExistingLinkElementByKey(theme.name);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
}



function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.id = 'active-theme';
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);


  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}