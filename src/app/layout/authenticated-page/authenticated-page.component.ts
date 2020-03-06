import { AuthenticationService } from './../../core/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-authenticated-page',
  templateUrl: './authenticated-page.component.html',
  styleUrls: ['./authenticated-page.component.scss']
})
export class AuthenticatedPageComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  user: User;

  ngOnInit(): void {
    this.user = this.authService.user();
  }

  doLogout(): void{
    this.authService.logout();
  }

  toggle(): void{

  }
}
