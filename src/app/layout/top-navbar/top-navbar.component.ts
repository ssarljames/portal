import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  user: User;

  sidenav: MatSidenav;

  ngOnInit(): void {
    this.user = this.authService.user();
  }

  doLogout(): void{
    this.authService.logout();
  }

  toggle(): void{

  }
}
