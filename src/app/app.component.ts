import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';
// import { ConnectionService } from 'ng-connection-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showContent: boolean = false;
  isOffline: boolean = false;

  constructor(private themeService: ThemeService,
              // private connectionService: ConnectionService,
              private router: Router) {

    // this.connectionService.monitor().subscribe(isConnected => {
    //   this.isOffline = isConnected == false;
    // });

    const path = localStorage.getItem('path');
    if(path){
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }

    themeService.theme.subscribe((s) => {
      this.showContent = true;
    })
  }
}
