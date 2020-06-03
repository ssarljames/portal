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
import { ComponentDataFiltering } from 'src/app/core/components/data-filtering-component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ fetchAnimation ]
})
export class IndexComponent extends ComponentDataFiltering {

  source: MatTableDataSource<Department>;

  subject: BehaviorSubject<Department[]>;

  displayedColumns: string[] = ['name', 'code', 'view'];

  constructor(private departmentService: DepartmentService,
              private stateService: StateService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    super('departments.index', stateService, activatedRoute, router);

    this.source = new MatTableDataSource(this.stateService.get('departments') ?? []);
    this.subject = this.source.connect();
  }

  init(): void {
    const departments: Department[] = this.getState('data', []);
    this.subject.next( departments );
    this.fetchDepartments();
  }

  destroy(): void {
    this.setState('data', this.subject.value);
    this.subject.unsubscribe();
  }

  onResourceFetch(): void {
    this.fetchDepartments();
  }
  
  fetchDepartments(): void {
    this.loading = true;
    this.departmentService.queryWithMeta({
      params: this.queryParams
    }).subscribe( (response: HttpCollectionResponse) => {
      this.subject.next(response.data);
      this.setMeta(response.meta);
      this.loading = false;
    });
  }

}
