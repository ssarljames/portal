import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


export interface Theme {
  className: string;
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
      className: 'default-theme',
      displayName: 'Light Mode',
      isDark: false,
      selected: false
    },
    {
      className: 'dark-theme',
      displayName: 'Dark Mode',
      isDark: true,
      selected: false
    },
  ];

  currentTheme: Theme;
  themeIsLoaded: boolean = false;

  private themeLoading: BehaviorSubject<string>;

  constructor() {

    const theme_name = localStorage.getItem('theme');

    const theme = this._themes.find((t) => t.className == theme_name);

    this.themeLoading = new BehaviorSubject(theme ? theme.className : this._themes[0].className);

    this.currentTheme = theme  ? this.setTheme(theme) : this.setTheme(this._themes[0]);




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
    const body:  HTMLBodyElement = document.getElementsByTagName('body').item(0);

    if(this.currentTheme){
      body.classList.remove(this.currentTheme.className);
      this.currentTheme.selected = false;
    }
    body.classList.add(theme.className)


    this.currentTheme = theme;
    this.currentTheme.selected = true;

    localStorage.setItem('theme', theme.className);

    return theme;
  }

  setDarkTheme(): void{
    this.setTheme( this._themes.find(t => t.isDark));
  }

  setLightTheme(): void{
    this.setTheme( this._themes.find(t => !t.isDark));
  }

}


