import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  post: Post = null;

  post_id: string;

  constructor(private postService: PostService,
              private store: Store<{posts: Post[]}>,
              private activatedRoute: ActivatedRoute,
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

  saved(post: Post): void{
    this.router.navigate(['/management/posts/' + post.id]);
  }
}
