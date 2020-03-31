import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/guest/login/login.component';

interface Link{
  displayName: string;
  url: string;
}

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.scss']
})
export class GuestPageComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  isHandset: boolean;

  links: Link[] = [
    {
      displayName: 'Home',
      url: '/g/home'
    },
    {
      displayName: 'Services',
      url: '/g/services'
    },
    {
      displayName: 'About',
      url: '/g/about'
    },
    {
      displayName: 'Directory',
      url: '/g/directory'
    }
  ]

  constructor(private matDialog: MatDialog,
              private breakpointObserver: BreakpointObserver) {

    breakpointObserver.observe(Breakpoints.XSmall).subscribe( result => {
      this.isHandset = result.matches;

      if(this.isHandset == false && this.sidenav)
        this.sidenav.close();
    });
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
}
