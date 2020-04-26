import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student/student';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Student> = new MatTableDataSource();

  columns: string[] = [ 'fullname', 'id_number', 'created_at' ];

  subject: BehaviorSubject<Student[]>;
  susbcription: Subscription;

  constructor(private studentService: StudentService,
              private store: Store<{students: Student[]}>,
              private router: Router) {

    this.subject = this.dataSource.connect();

    this.susbcription = this.store.select('students').subscribe(students => {
      this.subject.next(students.map(s => (new Student).fill(s)));
    });
  }

  ngOnInit(): void {
    this.fetchStudents();
  }

  ngOnDestroy(): void{
    this.susbcription.unsubscribe();
    this.subject.unsubscribe();
  }

  fetchStudents(): void{
    this.studentService.query().subscribe();
  }

  selectStudent(student: Student): void{
    setTimeout( () => {
      this.router.navigate(['management', 'students', student.id]);
    }, 100);
  }

}
