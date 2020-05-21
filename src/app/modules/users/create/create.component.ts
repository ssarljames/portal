import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private userService: UserService,
              private modalService: ModalService,
              private router: Router) {
    this.form = new FormGroup({
      'username': new FormControl(''),
      'firstname': new FormControl(''),
      'lastname': new FormControl(''),
      'password': new FormControl('')
    });
  }

  ngOnInit(): void {
    this.randomizePassword();
    this.form.controls.username.disable();
  }

  setUsername(): void{

    let fname: string = this.form.controls.firstname.value;
    let lname: string = this.form.controls.lastname.value;

    if(fname.trim().length > 0 && lname.trim().length > 0)
      this.form.controls.username.setValue((fname.charAt(0) + '.' + lname).toLowerCase());
    else
      this.form.controls.username.setValue('');


  }

  randomizePassword(): void{
      const length = 6
      let result           = '';
      let characters       = '0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      // this.form.controls.password.setValue(result);
      this.form.controls.password.setValue('password');
  }


  submit(): void{
    if(this.form.valid){


      const user = new User();

      user.username = this.form.controls.username.value;
      user.firstname = this.form.controls.firstname.value;
      user.lastname = this.form.controls.lastname.value;
      user.password = this.form.controls.password.value;

      this.userService.create(user).subscribe((user) => {

        this.modalService.swal({
          'text': 'User succesfully created',
          'icon': 'success'
        });


        this.router.navigate(['users']);
      },

      response => {

        for (const key in response.error.errors) {
          if (this.form.controls.hasOwnProperty(key)) {
            if(key == 'username' && response.error.errors[key] != 'The username field is required.')
              this.form.controls.username.enable();
            this.form.controls[key].setErrors(response.error.errors[key]);
          }
        }

      });
    }
  }

}
