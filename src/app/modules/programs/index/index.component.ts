import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Program } from 'src/app/models/program/program';
import { ProgramService } from 'src/app/services/program/program.service';
import { BehaviorSubject } from 'rxjs';
import { HttpCollectionResponse, HttpResponseMeta } from 'src/app/core/services/resource/resource.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { fetchAnimation } from 'src/app/animations/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime } from 'rxjs/operators';
import { ComponentDataFiltering } from 'src/app/core/components/data-filtering-component';

interface ProgramFilter{
  q: FormControl;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ fetchAnimation ]
})
export class IndexComponent extends ComponentDataFiltering {


  source: MatTableDataSource<Program>;
  subject: BehaviorSubject<Program[]>;

  displayedColumns: string[];

  constructor(private programService: ProgramService,
              private stateService: StateService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              breakpoint: BreakpointObserver) {

    super('programs.index', stateService, activatedRoute, router);

    this.source = new MatTableDataSource([]);
    this.subject = this.source.connect();

    this.displayedColumns = [ 'name', 'code', 'student_count' ];

    breakpoint.observe(Breakpoints.Handset).subscribe( state => {
      this.displayedColumns = state.matches
                                ? [ 'name', 'view']
                                : [ 'name', 'code', 'department', 'no_of_years', 'student_count', 'view' ]
    });
  }

  init(): void {
    const programs: Program[] = this.getState('data', []) as Program[];
    this.subject.next(programs);
    this.fetchPrograms();
  }

  destroy(): void {
    this.setState('data', this.subject.value);
    this.subject.unsubscribe();
  }

  onResourceFetch(): void {
    this.fetchPrograms();
  }

  fetchPrograms(): void {
    this.loading = true;
    this.programService.queryWithMeta({
      params: this.queryParams
    }).subscribe( (response: HttpCollectionResponse) => {
      this.subject.next(response.data);
      this.setMeta(response.meta);
      this.loading = false;
    });
  }

  view(program: Program): void {
    this.stateService.set('program', program);
    setTimeout( () => {
      this.router.navigate(['/programs', program.id]);      
    }, 500);
  }

}
