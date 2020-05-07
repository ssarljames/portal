import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { UploaderService } from 'src/app/core/services/uploader/uploader.service';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  userForm: FormGroup;

  user_id: string;

  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File = null;

  done: boolean = true;


  @ViewChild('fileInput') fileInput: HTMLInputElement;

  imageUrl: string | ArrayBuffer = "/assets/images/profile.png";
  fileName: string = "No file selected";

  constructor(private authService: AuthenticationService,
              private modalService: ModalService,
              private uploader: UploaderService) {

    this.user_id = this.authService.user.id;

    this.imageUrl = authService.user.profile_image ? authService.user.profile_image : this.imageUrl

    this.userForm = new FormGroup({
      id: new FormControl(this.user_id, Validators.required),
      username: new FormControl(this.authService.user.username, Validators.required),
      new_password: new FormControl(),
      confirm_new_password: new FormControl()
    });
  }

  ngOnInit(): void {
    this.uploader.progressSource.subscribe(progress => {
      this.progress = progress;
    });
  }


  onChange(file: File) {
    if (file) {
      this.done = false;
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
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
          this.authService.updateProfile((new User()).formFill(this.userForm).set('password', p)).subscribe((user) => {
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

  doUpload() {
    this.progress = 0;
    this.isUploading = true;



    const form: FormData = new FormData();

    form.append('image', this.file);


    
    this.uploader.upload(form, `${environment.endpoint}/upload-profile-picture`).subscribe( response => {
      this.isUploading = false;
      this.modalService.toast('Profile photo changed!');
      const user = this.authService.user;
      user.profile_image = response.data;
      this.authService.setUser(user);
      this.done = true;
      this.file = null;
    });
  }
}
