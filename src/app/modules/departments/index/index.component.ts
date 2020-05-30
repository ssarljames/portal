import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponseMeta, HttpCollectionResponse } from 'src/app/core/services/resource/resource.service';
import { PageEvent } from '@angular/material/paginator';
import { DepartmentService } from 'src/app/services/department/department.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { BehaviorSubject } from 'rxjs';
import { Department } from 'src/app/models/department/department';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fetchAnimation } from 'src/app/animations/animations';
import { debounceTime } from 'rxjs/operators';

interface DepartmentFilter {
  q: FormControl;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ fetchAnimation ]
})
export class IndexComponent implements OnInit, OnDestroy {

  meta: HttpResponseMeta = {
    current_page: 1,
    per_page: 15
  };

  filter: DepartmentFilter = {
    q: new FormControl('')
  }

  loading: boolean = false;

  source: MatTableDataSource<Department>;

  subject: BehaviorSubject<Department[]>;

  displayedColumns: string[] = ['name', 'code', 'view'];

  constructor(private departmentService: DepartmentService,
              private stateService: StateService) {


    this.source = new MatTableDataSource(this.stateService.get('departments') ?? []);
    this.subject = this.source.connect();


  }

  ngOnInit(): void {

    this.meta = this.stateService.get('departments.meta') ?? this.meta;
    this.filter.q.setValue( this.stateService.get('department.filter') ?? '');

    this.fetchDepartments();


    this.filter.q.valueChanges.pipe(
      debounceTime(300)
    ).subscribe( q => {
      this.fetchDepartments();
    });
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
    this.stateService.set('departments', this.source.data);
    this.stateService.set('departments.meta', this.meta);
    this.stateService.set('department.filter', this.filter.q.value);
  }
  
  fetchDepartments(page: PageEvent = null): void {
    this.loading = true;
    this.departmentService.queryWithMeta({
      params: {
        page: page ? page.pageIndex + 1 : 1,
        per_page: page ? page.pageSize : 15,
        q: this.filter.q.value
      }
    }).subscribe( (response: HttpCollectionResponse) => {
      this.subject.next(response.data);
      this.meta = response.meta;
      this.loading = false;
    });
  }

}
