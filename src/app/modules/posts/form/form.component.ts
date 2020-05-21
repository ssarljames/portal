import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostService } from 'src/app/services/post/post.service';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { FormControl } from '@angular/forms';
import { Post } from 'src/app/models/post/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  editor = ClassicEditor;


  @Input() post: Post;
  @Output() onSave: EventEmitter<Post> = new EventEmitter();

  saving: boolean = false;

  editorConfig = {
    placeholder: 'Content here...'
  };

  constructor(private postService: PostService,
              private modalService: ModalService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id:  new FormControl( this.post ? this.post.id : ''),
      title:  new FormControl( this.post ? this.post.title : ''),
      content:  new FormControl(this.post ? this.post.content : ''),
      valid_until: new FormControl(this.post ? this.post.valid_until : ''),
      type: new FormControl(this.post ? this.post.type : '')
    });
  }

  save(): void{
    if(this.form.valid){
      this.saving = true;

      const postData: Post = (new Post()).fill(this.form.value); 

      const request: Observable<Post> = this.post 
                                          ? this.postService.update(postData)
                                          : this.postService.create(postData);

      request.subscribe( post => {
        this.onSave.emit(post);
        this.modalService.toast('Post was ' + (this.post ? 'updated':'created'), 'Success', 'success');
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
