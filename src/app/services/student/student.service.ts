import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Student } from '../../models/student/student';
import { ResourceService, ResourceAction } from '../../core/services/resource/resource.service';
import { StudentAddAction, StudentUpdateAction, StudentLoadAction, StudentRemove } from '../../store/student/actions';

class StudentAction implements ResourceAction<Student>{

  constructor(public store: Store){

  }

  create(student: Student): void {
    this.store.dispatch( new StudentAddAction(student));
  }
  update(student: Student): void {
    this.store.dispatch( new StudentUpdateAction(student));
  }
  list(students: Student[]): void {
    this.store.dispatch( new StudentLoadAction(students));
  }
  read(student: Student): void {
    this.store.dispatch(new StudentUpdateAction(student));
  }
  delete(student: Student): void {
    this.store.dispatch(new StudentRemove(student));
  }

}

@Injectable({
  providedIn: 'root'
})
export class StudentService extends ResourceService<Student>{

  constructor(http: HttpClient, store: Store) {
    super(http, 'students', null, new StudentAction(store));
  }
}
