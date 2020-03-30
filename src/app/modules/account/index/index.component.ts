import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  userForm: FormGroup;

  user_id: string;

  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private modalService: ModalService) {
    this.user_id = this.authService.user.id;

    this.userForm = new FormGroup({
      id: new FormControl(this.user_id, Validators.required),
      username: new FormControl(this.authService.user.username, Validators.required),
      new_password: new FormControl(),
      confirm_new_password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  saveUser(): void{

    if(this.userForm.controls.new_password.value
        && this.userForm.controls.new_password.value != this.userForm.controls.confirm_new_password.value){
        this.userForm.controls.confirm_new_password.setErrors(['Not matched to new password'])
        this.userForm.controls.confirm_new_password.markAsTouched();
    }else
      this.modalService.prompt({
        question: 'Enter your current password to continue',
        password: true
      }).then(p => {
        if(p)
          this.userService.update((new User()).formFill(this.userForm).set('password', p)).subscribe((user) => {
            this.modalService.swal({
              title: 'Account information saved!',
              icon: 'success'
            });
            this.authService.setUser(user);
            this.userForm.controls.new_password.setValue('');
            this.userForm.controls.confirm_new_password.setValue('');
          },
          e => {
            this.userForm.fillErrors(e);

            if(e.error ?? e.error.message)
              this.modalService.toast(e.error.message);
          });
      })
  }

}
