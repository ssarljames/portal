import { AuthenticationService } from './../../../core/services/authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  error: string = null;

  constructor(private authService: AuthenticationService) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

  }

  submit(): void{

    if(this.form.valid)
      this.authService.login({
        username: this.form.controls.username.value,
        password: this.form.controls.password.value
      }).subscribe((user) => {
        console.log('ok');

      },(e: any) => {
        if(e.hasOwnProperty('error'))
          this.error = e.error;
      })
  }

}
