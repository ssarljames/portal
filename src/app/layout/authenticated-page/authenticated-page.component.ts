import { NavItem } from './../side-menu-item/nav-item';
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

  navItems: NavItem[] = [
    {
      displayName: 'Darshboard',
      route: '/',
      iconName: 'dashboard'
    },
    {
      displayName: 'Services',
      iconName: 'headset_mic',
      children: [
        {
          displayName: 'Printing',
          iconName: 'print',
          route: '/printing',
        }
      ]
    },
    {
      displayName: 'Users',
      route: '/users',
      iconName: 'group'
    }
  ];

  ngOnInit(): void {
    this.user = this.authService.user();
  }

  doLogout(): void{
    this.authService.logout();
  }

  toggle(): void{

  }
}
