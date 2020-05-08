import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss']
})
export class ProfileBoxComponent implements OnInit {

  user: User;

  constructor(private authService: AuthenticationService,
              private modalService: ModalService) {

                
    authService.user$.subscribe( user => {
      this.user = user
    });
  }

  ngOnInit(): void {
    
  }


  doLogout(): void{
    this.modalService.confirm({
      message: 'Are you sure to logout?'
    }).then(c => {
      if(c)
        this.authService.logout();
    })
  }

}
