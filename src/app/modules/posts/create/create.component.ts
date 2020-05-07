import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  saved(post: Post): void{
    this.router.navigate(['/posts/' + post.id]);
  }

}
