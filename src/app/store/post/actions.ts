import { Action } from '@ngrx/store';
import { Post } from '../../models/post/post';

export enum PostActionTypes{
  Add    = '[Post] Add',
  Update = '[Post] Update',
  Remove = '[Post] Remove',
  Load   = '[Post] Load'
}

export class PostAction implements Action{
  type: string;
  payload: any;
}

export class PostAddAction extends PostAction{
  type = PostActionTypes.Add;
  constructor(public payload: Post){
    super();
  }
}


export class PostUpdateAction extends PostAction{
  type = PostActionTypes.Update;
  constructor(public payload: Post){
    super();
  }
}


export class PostRemove extends PostAction{
  type = PostActionTypes.Remove;
  constructor(public payload: Post){
    super();
  }
}


export class PostLoadAction extends PostAction{
  type = PostActionTypes.Load;
  constructor(public payload: Post[]){
    super();
  }
}
