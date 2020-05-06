import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Store } from '@ngrx/store';
import { Post } from '../../../models/post/post';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  columns: string[] = [ 'created_at', 'title', 'user' ];
  dataSource: MatTableDataSource<Post> = new MatTableDataSource();

  loading: boolean = false;

  subscription: Subscription;

  constructor(private postService: PostService,
              private store: Store<{posts: Post[]}>,
              private router: Router) {

    this.subscription = store.select('posts').subscribe( posts => {
                          this.dataSource.connect().next(posts);
                        });

  }

  ngOnInit(): void {
    this.fetchPost();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  fetchPost(): void{
    this.loading = true;
    this.postService.query().subscribe( posts => {
      this.loading = false;
    });
  }

  show(id: string): void{
    setTimeout(() => {
      this.router.navigate([`/management/posts/${id}`]);
    }, 100);
  }

}
