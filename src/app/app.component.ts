import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showContent: boolean = false;
  isOffline: boolean = false;

  constructor(private themeService: ThemeService,
              private connectionService: ConnectionService) {

    this.connectionService.monitor().subscribe(isConnected => {
      this.isOffline = isConnected == false;
    });


    themeService.theme.subscribe((s) => {
      this.showContent = true;
    })
  }
}
