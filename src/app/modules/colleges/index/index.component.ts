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

interface CollegeFilter {
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

  filter: CollegeFilter = {
    q: new FormControl('')
  }

  loading: boolean = false;

  source: MatTableDataSource<College>;

  subject: BehaviorSubject<College[]>;

  displayedColumns: string[] = ['name', 'code', 'view'];

  constructor(private collegeService: CollegeService,
              private stateService: StateService) {


    this.source = new MatTableDataSource(this.stateService.get('colleges') ?? []);
    this.subject = this.source.connect();


  }

  ngOnInit(): void {

    this.meta = this.stateService.get('colleges.meta') ?? this.meta;
    this.filter.q.setValue( this.stateService.get('college.filter') ?? '');

    this.fetchColleges();


    this.filter.q.valueChanges.pipe(
      debounceTime(300)
    ).subscribe( q => {
      this.fetchColleges();
    });
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
    this.stateService.set('colleges', this.source.data);
    this.stateService.set('colleges.meta', this.meta);
    this.stateService.set('college.filter', this.filter.q.value);
  }
  
  fetchColleges(page: PageEvent = null): void {
    this.loading = true;
    this.collegeService.queryWithMeta({
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
