import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';
// import { ConnectionService } from 'ng-connection-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from './modules/shared/services/modal/modal.service';
import { from } from 'rxjs';
import { ApplicationService } from './core/services/application/application.service';

declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showContent: boolean = false;
  isOffline: boolean = false;

  constructor(private themeService: ThemeService,
              // private connectionService: ConnectionService,
              activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: ModalService,
              applicationService: ApplicationService) {

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
    });

    
    
  }
  ngOnInit(): void{
    const self = this;
    document.addEventListener('deviceready', function() {
      self.modalService.toast(`Device: ${device.platform}`);
    }, 
    false);
  }
}
