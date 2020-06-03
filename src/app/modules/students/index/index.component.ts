import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student/student';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpCollectionResponse, HttpResponseMeta, UrlQueryParams } from 'src/app/core/services/resource/resource.service';
import { PageEvent } from '@angular/material/paginator';
import { StateService } from 'src/app/core/services/state/state.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { fetchAnimation } from 'src/app/animations/animations';
import { ComponentDataFiltering } from 'src/app/core/components/data-filtering-component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [fetchAnimation]
})
export class IndexComponent extends ComponentDataFiltering {

  dataSource: MatTableDataSource<Student> = new MatTableDataSource();

  columnDefinitions: string[] = [ 'fullname', 'id_number', 'program', 'year_level', 'view' ];

  visibleColumns: string[];

  subject: BehaviorSubject<Student[]>;
  susbcription: Subscription;

  constructor(private studentService: StudentService,
              private store: Store<{students: Student[]}>,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              private stateService: StateService,
              private activatedRoute: ActivatedRoute) {

    super('students.index', stateService, activatedRoute, router);

    this.subject = this.dataSource.connect();

    this.susbcription = this.store.select('students').subscribe(students => {
      this.subject.next(students.map(s => (new Student).fill(s)));
    });

    breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.visibleColumns = result.matches
                              ? [ 'fullname', 'view']
                              : this.columnDefinitions;
    })
  }

  init(): void {
    this.fetchStudents();    
  }

  destroy(): void {
    this.susbcription.unsubscribe();
    this.subject.unsubscribe();
  }

  onResourceFetch(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.loading = true;
    this.studentService.queryWithMeta({
      params: this.queryParams
    }).subscribe( (response: HttpCollectionResponse) => {
      this.loading = false;
      this.setMeta(response.meta)      
    });
  }

  selectStudent(student: Student): void {
    setTimeout( () => {
      this.router.navigate(['/', 'students', student.id]);
    }, 100);
  }

}
