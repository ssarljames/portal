import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostService } from 'src/app/services/post/post.service';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { FormControl } from '@angular/forms';
import { Post } from 'src/app/models/post/post';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpShowResponse } from 'src/app/core/services/resource/resource.service';
import { map } from 'rxjs/operators';

let http: HttpClient = null;

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
    placeholder: 'Content here...',
    extraPlugins: [ this.TheUploadAdapterPlugin ]
  };

  constructor(private postService: PostService,
              private modalService: ModalService,
              private _http: HttpClient) {

                http = _http;

  }

  TheUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, http, `${environment.endpoint}/upload`);
    };
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id:  new FormControl( this.post ? this.post.id : ''),
      title:  new FormControl( this.post ? this.post.title : ''),
      content:  new FormControl(this.post ? this.post.content : ''),
      valid_until: new FormControl(this.post ? this.post.valid_until : ''),
      type: new FormControl(this.post ? this.post.type : '')
    });

    console.log(ClassicEditor);
    

    // this.editor.plugins.get( 'FileRepository' ).createUploadAdapter = loader => {
    //   return new MyUploadAdapter( loader );
    // };

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

class UploadAdapter {

  constructor(private loader: any, 
              private http: HttpClient, 
              private url: string) {
  }

  upload() {

    
    return this.loader.file

    
        .then( file => new Promise( ( resolve, reject ) => {


          const form = new FormData();
          form.append('image', file);
          form.append('type', 'post');

          this.http.post<HttpShowResponse>(this.url, form).subscribe( response => {
            

            resolve({ 
              default: response.data.image_url
            });

          });

        } ) );
  }

  abort() {
    console.log('UploadAdapter abort');
  }

}