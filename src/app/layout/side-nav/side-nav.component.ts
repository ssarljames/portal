import { Component, OnInit } from '@angular/core';
import { NavItem } from './side-menu-item/nav-item';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {


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
          route: '/services/printing',
        }
      ]
    },
    {
      displayName: 'Administration',
      iconName: 'account_balance',
      children: [
        {
          displayName: 'Users',
          route: '/users',
          iconName: 'group'
        },
        {
          displayName: 'Printing Settings',
          route: '/printing/settings',
          iconName: 'insert_drive_file'
        },
      ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
