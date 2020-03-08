import { AuthenticationService } from './../../core/services/authentication/authentication.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-authenticated-page',
  templateUrl: './authenticated-page.component.html',
  styleUrls: ['./authenticated-page.component.scss']
})
export class AuthenticatedPageComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private authService: AuthenticationService) { }

  user: User;

  ngOnInit(): void {
    this.user = this.authService.user();
  }

  ngAfterViewInit(){

  }

  doLogout(): void{
    this.authService.logout();
  }

  onToggle(e: any): void{
    this.sidenav.toggle();
  }
}
