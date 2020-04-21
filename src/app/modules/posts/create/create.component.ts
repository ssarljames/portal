import { Component, OnInit } from '@angular/core';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { FormControl } from '@angular/forms';


import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post/post';
import { Router } from '@angular/router';
import { ModalService } from '../../shared/services/modal/modal.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  editor = ClassicEditor;

  saving: boolean = false;

  editorConfig = {
    placeholder: 'Content here...'
  };

  constructor(private postService: PostService,
              private router: Router,
              private modalService: ModalService) {

    this.form = new FormGroup({
      title:  new FormControl(''),
      content:  new FormControl(''),
      valid_until: new FormControl(''),
      type: new FormControl('')
    });
  }

  ngOnInit(): void {

  }

  save(): void{
    if(this.form.valid){
      this.saving = true;

      const post: Post = (new Post()).fill(this.form.value); 

      this.postService.create(post).subscribe( post => {

        this.router.navigate(['management/posts']);
        this.modalService.toast('New post was saved.', 'Success', 'success');
      },
      e => {
        this.form.fillErrors(e);
        this.saving = false;
        this.modalService.toast('There was an error saving the post.', 'Error', 'error');
      }
      );
    }
  }

}
