import { Injectable } from '@angular/core';

import { ResourceService, ResourceAction } from '../../core/services/resource/resource.service';
import { Post } from '../../models/post/post';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { PostAddAction, PostUpdateAction, PostLoadAction, PostRemove } from '../../store/post/actions';

class PostAction implements ResourceAction<Post>{

  constructor(public store: Store<{posts: Post[]}>){}

  create(post: Post): void {
    this.store.dispatch(new PostAddAction(post));
  }

  update(post: Post): void {
    this.store.dispatch(new PostUpdateAction(post));
  }

  list(posts: Post[]): void {
    this.store.dispatch(new PostLoadAction(posts));
  }

  read(post: Post): void {
    this.store.dispatch(new PostUpdateAction(post));
  }

  delete(post: Post): void {
    this.store.dispatch(new PostRemove(post));
  }


}

@Injectable({
  providedIn: 'root'
})
export class PostService extends ResourceService<Post> {

  constructor(http: HttpClient, store: Store<{posts: Post[]}>) {
    super(http, 'posts', null, new PostAction(store));
  }
}
