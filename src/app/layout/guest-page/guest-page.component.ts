import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/guest/login/login.component';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

interface Link{
  displayName: string;
  url: string;
  exact?: boolean;
}

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.scss']
})
export class GuestPageComponent implements OnInit {

  is_dark_mode: boolean;

  @ViewChild('sidenav') sidenav: MatSidenav;

  isHandset: boolean;

  links: Link[] = [
    {
      displayName: 'Home',
      url: '',
      exact: true
    },
    {
      displayName: 'Services',
      url: '/services'
    },
    {
      displayName: 'About',
      url: '/about'
    },
    {
      displayName: 'Directory',
      url: '/directory'
    }
  ]

  constructor(private matDialog: MatDialog,
              private breakpointObserver: BreakpointObserver,
              private themeService: ThemeService) {

    breakpointObserver.observe(Breakpoints.XSmall).subscribe( result => {
      this.isHandset = result.matches;

      if(this.isHandset == false && this.sidenav)
        this.sidenav.close();
    });


    this.is_dark_mode = this.themeService.currentTheme.isDark
  }

  ngOnInit(): void {

  }

  signIn(): void{
    this.matDialog.open(LoginComponent, {
      width: '400px'
    });
  }

  openNav(): void{
    if(this.isHandset)
      this.sidenav.open();
  }

  closeNav(): void{
    if(this.isHandset)
      this.sidenav.close();
  }
  
  toggleDarkMode(): void{

    this.is_dark_mode = !this.is_dark_mode;

    this.is_dark_mode
      ? this.themeService.setDarkTheme()
      : this.themeService.setLightTheme();
  }

}
