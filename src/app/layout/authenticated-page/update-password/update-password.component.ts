import { User } from 'src/app/models/user/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  form: FormGroup;

  isLoading: boolean = false;

  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private modalService: ModalService) {
    this.form = new FormGroup({
      id: new FormControl(this.authService.user.id, Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_new_password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }


  saveUser(): void{
    if(this.form.valid)
        this.isLoading = true;
        this.userService.update((new User()).formFill(this.form).set('secure', 1)).subscribe((user) => {
          this.modalService.toast('Password changed!');
          this.authService.setUser(user);
          this.isLoading = false;
        },
        e => {
          this.form.fillErrors(e);
          this.isLoading = false;

          if(e.error ?? e.error.message)
            this.modalService.toast(e.error.message);
        });
  }

  logout(): void{
    this.modalService.confirm({
      message: 'Are you sure to logout from the system?'
    }).then( r => {
      if(r)
        this.authService.logout();
    })
  }

}
