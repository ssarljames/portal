import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student/student';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GeoService } from 'src/app/core/services/geo/geo.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Student> = new MatTableDataSource();

  columnDefinitions: string[] = [ 'fullname', 'id_number', 'created_at' ];

  visibleColumns: string[];

  subject: BehaviorSubject<Student[]>;
  susbcription: Subscription;

  loading: boolean = false;

  constructor(private studentService: StudentService,
              private store: Store<{students: Student[]}>,
              private router: Router,
              private breakpointObserver: BreakpointObserver) {

    this.subject = this.dataSource.connect();

    this.susbcription = this.store.select('students').subscribe(students => {
      this.subject.next(students.map(s => (new Student).fill(s)));
    });

    breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.visibleColumns = result.matches
                              ? [ 'fullname', 'id_number' ]
                              : this.columnDefinitions;
    })
  }

  ngOnInit(): void {
    this.fetchStudents();
  }

  ngOnDestroy(): void{
    this.susbcription.unsubscribe();
    this.subject.unsubscribe();
  }

  fetchStudents(): void{
    this.loading = true;
    this.studentService.query().subscribe( () => {
      this.loading = false;
    });
  }

  selectStudent(student: Student): void{
    setTimeout( () => {
      this.router.navigate(['/', 'students', student.id]);
    }, 100);
  }

}
