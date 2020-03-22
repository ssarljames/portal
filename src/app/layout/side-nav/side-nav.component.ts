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
      displayName: 'Service Transactions',
      iconName: 'print',
      route: 'service-transactions'
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
          route: '/settings/printing-service',
          iconName: 'insert_drive_file'
        },
      ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
