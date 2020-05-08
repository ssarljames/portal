import { NavService } from './nav.service';
import { Router } from '@angular/router';
import { NavItem } from './nav-item';
import { Component, OnInit, HostBinding, Input, AfterViewInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SideMenuItemComponent implements OnInit, AfterViewInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;


  @Input() sidenav: MatSidenav;

  hasActive: boolean;
  isHandset: boolean;

  currentUrl: string = '';

  user: User = null;

  constructor(public navService: NavService,
              public router: Router,
              breakpointObserver: BreakpointObserver,
              private authService: AuthenticationService) {


    breakpointObserver.observe(Breakpoints.Handset).subscribe(state => {
      this.isHandset = state.matches
    });
    if (this.depth === undefined) {
      this.depth = 0;
    }

    this.expanded = false;
    this.hasActive = false;

    this.authService.user$.subscribe( user => this.user = user);
  }

  ngOnInit() {
    this.checkIfHasActiveChild(this.router.url);
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.navService.currentUrl.subscribe((url: string) => {
        this.checkIfHasActiveChild(url);
        
        if(this.isHandset && this.sidenav.opened && url && this.currentUrl != url)
          this.sidenav.toggle()

        this.currentUrl = url ? url : this.currentUrl;
      });
    }, 100);
  }

  checkIfHasActiveChild(url: string = ''): void{

    let hasOpened = false;

    if(this.item.children && this.item.children.length > 0)
      this.item.children.forEach( (child: NavItem) => {
      

        child.isActive = false;

        if(this.router.isActive(child.route, true) || url.indexOf(child.route) === 0){
          hasOpened = true;
          child.isActive = true;
        }

      });


    this.expanded = hasOpened;
    this.ariaExpanded = this.expanded;

  }

  onItemSelected(item: NavItem) {

    // this.router.navigate([item.route]);

    if(item.children && item.children.length > 0)
      this.expanded = !this.expanded;
    else
      this.sidenav.close();
    
  }

}
