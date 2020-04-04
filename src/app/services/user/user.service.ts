import { HttpClient } from '@angular/common/http';
import { ResourceService, ResourceAction } from 'src/app/core/services/resource/resource.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserAddAction, UserLoadAction, UserUpdateAction, UserRemoveAction } from 'src/app/store/user/actions';
import { Store } from '@ngrx/store';


class UserResourceActions implements ResourceAction<User>{

  constructor(public store: Store){

  }

  create(item: User): void {
    this.store.dispatch(new UserAddAction(item));
  }

  update(item: User): void {
    this.store.dispatch(new UserUpdateAction(item));
  }
  list(items: User[]): void {
    this.store.dispatch(new UserLoadAction(items));
  }
  read(item: User): void {
    this.store.dispatch(new UserUpdateAction(item));
  }
  delete(item: User): void {
    this.store.dispatch(new UserRemoveAction(item))
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {

  constructor(http: HttpClient, store: Store) {
    super(http, 'users', null, new UserResourceActions(store));
  }
}
