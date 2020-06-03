import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponseMeta, HttpCollectionResponse } from 'src/app/core/services/resource/resource.service';
import { PageEvent } from '@angular/material/paginator';
import { CollegeService } from 'src/app/services/college/college.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { BehaviorSubject } from 'rxjs';
import { College } from 'src/app/models/college/college';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fetchAnimation } from 'src/app/animations/animations';
import { debounceTime } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ComponentDataFiltering } from 'src/app/core/components/data-filtering-component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ fetchAnimation ]
})
export class IndexComponent extends ComponentDataFiltering {

  source: MatTableDataSource<College>;

  subject: BehaviorSubject<College[]>;

  displayedColumns: string[] = ['name', 'code', 'departments', 'view'];

  constructor(private collegeService: CollegeService,
              private stateService: StateService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private breakpointObserver: BreakpointObserver) {

    super('colleges.index', stateService, activatedRoute, router);

    this.source = new MatTableDataSource(this.stateService.get('colleges') ?? []);
    this.subject = this.source.connect();

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe( state => {
      this.displayedColumns = state.matches
                                ? ['code', 'view']
                                : ['name', 'code', 'departments', 'view']
    })


  }

  init(): void {
    const colleges: College[] = this.getState('data', []);
    this.subject.next(colleges);
    this.fetchColleges();
  }

  destroy(): void {
    this.setState('data', this.source.data);
    this.subject.unsubscribe();
  }

  onResourceFetch(): void {
    this.fetchColleges();
  }
  
  fetchColleges(): void {
    this.loading = true;
    this.collegeService.queryWithMeta({
      params: this.queryParams
    }).subscribe( (response: HttpCollectionResponse) => {
      this.subject.next(response.data);
      this.setMeta(response.meta);
      this.loading = false;
    });
  }

}
