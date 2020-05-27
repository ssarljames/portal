import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student/student';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpCollectionResponse, HttpResponseMeta } from 'src/app/core/services/resource/resource.service';
import { PageEvent } from '@angular/material/paginator';
import { StateService } from 'src/app/core/services/state/state.service';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime } from 'rxjs/operators';
import { fetchAnimation } from 'src/app/animations/animations';

interface StudentIndexFilter{
  q: FormControl;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [fetchAnimation]
})
export class IndexComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Student> = new MatTableDataSource();

  columnDefinitions: string[] = [ 'fullname', 'id_number', 'program', 'view' ];

  visibleColumns: string[];

  subject: BehaviorSubject<Student[]>;
  susbcription: Subscription;

  loading: boolean = false;

  meta: HttpResponseMeta = {
    current_page: 1,
    per_page: 15
  };

  filter: StudentIndexFilter = {
    q: new FormControl('')
  }


  constructor(private studentService: StudentService,
              private store: Store<{students: Student[]}>,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              private stateService: StateService) {

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

  ngOnInit(): void {
    this.meta = this.stateService.get('students.meta') ?? this.meta;
    this.filter.q.setValue( this.stateService.get('students.filter.q') ?? '');
   
    this.fetchStudents({
      pageIndex: this.meta.current_page - 1,
      length: this.meta.total,
      pageSize: this.meta.per_page
    });


    this.filter.q.valueChanges.pipe(
      debounceTime(300)
    ).subscribe( q => {
      this.fetchStudents();
    });



  }

  ngOnDestroy(): void{
    this.susbcription.unsubscribe();
    this.subject.unsubscribe();
    this.stateService.set('students.meta', this.meta); 
    this.stateService.set('students.filter.q', this.filter.q.value);
  }

  fetchStudents(page: PageEvent = null): void{

    this.loading = true;
    this.studentService.queryWithMeta({
      params: {
        page: page ? page.pageIndex + 1 : 1,
        per_page: page ? page.pageSize : 15,
        q: this.filter.q.value
      }
    }).subscribe( (response: HttpCollectionResponse) => {
      this.loading = false;
      this.meta = response.meta;      
    });
  }

  selectStudent(student: Student): void{
    setTimeout( () => {
      this.router.navigate(['/', 'students', student.id]);
    }, 100);
  }

}
