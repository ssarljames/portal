import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post/post';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../shared/services/modal/modal.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  post: Post = null;

  post_id: string;

  constructor(private postService: PostService,
              private store: Store<{posts: Post[]}>,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
              private router: Router) { }

  ngOnInit(): void {

    this.post_id = this.activatedRoute.snapshot.params.id;

    this.store.select('posts').subscribe( posts => {
      this.post = posts.find( p => p.id == this.post_id);
    });

    this.fetchPost();
  }

  fetchPost(): void{
    this.postService.read(this.post_id).subscribe( post => {

    });
  }

  deletePost(): void{
    this.modalService.confirm({
      message: 'Are you sure to delete this post?',
      type: 'warn'
    }).then(v => {
      if(v){
        this.postService.delete(this.post).subscribe(() => {
          this.modalService.toast('Post was successfully deleted.', 'Success', 'Success');
          this.router.navigate(['/management/posts']);
        });
      }
    })
  }

}
