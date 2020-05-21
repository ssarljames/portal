import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Store } from '@ngrx/store';
import { Post } from '../../../models/post/post';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fetchAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ fetchAnimation ]
})
export class IndexComponent implements OnInit, OnDestroy {

  visibleColumns: string[] = [];
  dataSource: MatTableDataSource<Post> = new MatTableDataSource();

  loading: boolean = false;

  subscription: Subscription;

  constructor(private postService: PostService,
              private store: Store<{posts: Post[]}>,
              private router: Router,
              breakpointObserver: BreakpointObserver) {

    this.subscription = store.select('posts').subscribe( posts => {
                          this.dataSource.connect().next(posts);
                        });

    breakpointObserver.observe(Breakpoints.Handset).subscribe( state => {
      this.visibleColumns = state.matches
                              ? [ 'created_at', 'title']
                              : [ 'created_at', 'title', 'user' ];
    })
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
      this.router.navigate([`/posts/${id}`]);
    }, 100);
  }

}
