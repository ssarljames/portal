import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showContent: boolean = false;

  constructor(private themeService: ThemeService){
    themeService.theme.subscribe((s) => {
      this.showContent = true;
    })
  }
}
