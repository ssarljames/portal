import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Store } from '@ngrx/store';
import { Post } from '../../../models/post/post';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  columns: string[] = [ 'created_at', 'title', 'user' ];
  dataSource: MatTableDataSource<Post> = new MatTableDataSource();

  constructor(private postService: PostService,
              private store: Store<{posts: Post[]}>,
              private router: Router) {

    store.select('posts').subscribe( posts => {
      console.log(posts);
      
      this.dataSource.connect().next(posts);
    })

  }

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost(): void{
    this.postService.query().subscribe( posts => {

    });
  }

  show(id: string): void{
    setTimeout(() => {
      this.router.navigate([`/management/posts/${id}`]);
    }, 300);
  }

}
