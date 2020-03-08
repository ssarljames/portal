import { AuthenticationService } from './../../../core/services/authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  error: string = null;

  loading: boolean = false;

  constructor(private authService: AuthenticationService, private themeService: ThemeService) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

  }

  submit(): void{

    if(this.form.valid){
      this.loading = true;

      const user = new User();
      user.username = this.form.controls.username.value;
      user.password = this.form.controls.password.value;

      this.authService.login(user).subscribe((user) => {
        this.loading = false;
      },(e: any) => {
        if(e.hasOwnProperty('error'))
          this.error = e.error;
        this.loading = false;
      })
    }
  }

}
