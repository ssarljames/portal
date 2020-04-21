import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService,
              private store: Store<{posts: Post[]}>) {

          store.select('posts').subscribe( posts => {
            this.posts = posts;
          })

  }
  ngOnInit(): void {
    this.postService.query().subscribe(posts => {
      // this.posts = posts;
    })
  }

}
