import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';
import { MatSidenav } from '@angular/material/sidenav';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  @Output() toggled = new EventEmitter<boolean>();

  constructor(private authService: AuthenticationService,
              private modalService: ModalService) { }

  user: User;

  sidenav: MatSidenav;

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  doLogout(): void{
    this.modalService.confirm({
      message: 'Are you sure to logout?'
    }).then(c => {
      if(c)
        this.authService.logout();
    })
  }

  toggle(): void{
    this.toggled.emit(true);
  }
}
