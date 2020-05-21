import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';
import { MatSidenav } from '@angular/material/sidenav';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  is_dark_mode: boolean;

  devMode: boolean = environment.production == false;

  @Output() toggled = new EventEmitter<boolean>();

  constructor(private authService: AuthenticationService,
              private modalService: ModalService,
              private themeService: ThemeService) {

    this.is_dark_mode = this.themeService.currentTheme.isDark

  }

  user: User;

  sidenav: MatSidenav;

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  doLogout(): void{
    this.modalService.confirm({
      message: 'Are you sure to logout?'
    }).then(c => {
      if(c)
        this.authService.logout();
    })
  }

  toggle(): void{
    this.toggled.emit(true);
  }

  toggleDarkMode(): void{

    this.is_dark_mode = !this.is_dark_mode;

    this.is_dark_mode
      ? this.themeService.setDarkTheme()
      : this.themeService.setLightTheme();
  }

  reload(): void{
    document.location.reload(true);
  }
}
