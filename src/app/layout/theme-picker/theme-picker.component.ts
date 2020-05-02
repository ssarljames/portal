import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {

  themes: Theme[];

  currentTheme: Theme;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themes = this.themeService.availableThemes
    this.themes.forEach( (t: Theme) => {
      if(t.selected)
        this.currentTheme = t;
    })
  }


  selectTheme(theme: Theme): void{
    if(theme.className != this.currentTheme.className){
      this.currentTheme = this.themeService.setTheme(theme);
    }
  }


}
