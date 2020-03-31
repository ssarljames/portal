import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from './side-menu-item/nav-item';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() sidenav: MatSidenav;


  navItems: NavItem[] = [
    {
      displayName: 'Darshboard',
      route: '/',
      iconName: 'dashboard',
      allowed_roles: []
    },
    {
      displayName: 'Service Transactions',
      iconName: 'print',
      route: 'service-transactions',
      allowed_roles: []
    },
    {
      displayName: 'Administration',
      iconName: 'account_balance',
      allowed_roles: ['administrator'],
      children: [
        {
          displayName: 'Users',
          route: '/users',
          iconName: 'group',
          allowed_roles: [ 'administrator' ]
        },
        {
          displayName: 'Service Settings',
          route: '/settings/printing-service',
          iconName: 'insert_drive_file',
          allowed_roles: [ 'administrator' ]
        },
      ]
    }
  ];


  constructor(private authService: AuthenticationService) {
    this.navItems = this.navItems.filter((item) => {
      return this.filterItem(item);
    });
  }

  filterItem(item: NavItem): boolean{
      if(item.children && item.children.length > 0)
        item.children = item.children.filter((item) => {
          return this.filterItem(item);
        });

      return item.allowed_roles.length == 0
      || item.allowed_roles.indexOf(this.authService.user.role) > -1;
  }

  ngOnInit(): void {
  }

}
