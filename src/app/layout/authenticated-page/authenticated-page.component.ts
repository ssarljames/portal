import { AuthenticationService } from './../../core/services/authentication/authentication.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ApplicationService } from 'src/app/core/services/application/application.service';

@Component({
  selector: 'app-authenticated-page',
  templateUrl: './authenticated-page.component.html',
  styleUrls: ['./authenticated-page.component.scss']
})
export class AuthenticatedPageComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  isHandset: boolean;

  error_occured: boolean = false;

  constructor(private authService: AuthenticationService,
              private breakpointObserver: BreakpointObserver) {

                breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
                  this.isHandset = result.matches;
                })
  }

  user: User;

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    },
    e => {
      this.error_occured = true;
    }
    )
  }

  ngAfterViewInit(){

  }


  onToggle(e: any): void{
    this.sidenav.toggle();
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
