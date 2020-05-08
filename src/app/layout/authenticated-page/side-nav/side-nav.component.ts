import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from './side-menu-item/nav-item';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { MatSidenav } from '@angular/material/sidenav';

import { MENU } from './menu';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() sidenav: MatSidenav;

  navItems: NavItem[] = MENU;

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

      return item.permission == null
            || (item.children && item.children.length > 0) 
            || this.authService
                      .user
                        .canAccess(item.permission);
  }

  ngOnInit(): void {
  }
}
