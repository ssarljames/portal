import { User } from 'src/app/models/user/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  error: string;

  isFetching: boolean = true;

  randomPassword: string;
  resetPassword: boolean = false;

  userId: string;

  constructor(private userService: UserService,
              private modalService: ModalService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      'username': new FormControl(''),
      'firstname': new FormControl(''),
      'lastname': new FormControl(''),
    });
  }


  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.isFetching = true;
    this.userService.read(this.userId).subscribe((user: User) => {

      this.form.setValue({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      });


      this.isFetching = false;

      this.randomizePassword();


    });


  }



  submit(): void{
    if(this.form.valid){


      this.userService.update({
        id: this.userId,
        username: this.form.controls.username.value,
        firstname: this.form.controls.firstname.value,
        lastname: this.form.controls.lastname.value,
        password: this.randomPassword,
        reset_password: this.resetPassword
      }).subscribe(() => {
        this.modalService.swal({
          'text': 'User succesfully created',
          'icon': 'success'
        });

        this.router.navigate(['/users']);
      },

      response => {

        for (const key in response.error.errors) {
          if (this.form.controls.hasOwnProperty(key)) {
            this.form.controls[key].setErrors(response.error.errors[key]);
          }
        }

      });
    }
  }



  randomizePassword(): void{
      const length = 6
      let result           = '';
      let characters       = '0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < length; i++ )
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      this.randomPassword = result;
  }
}
