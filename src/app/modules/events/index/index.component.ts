import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/event/event';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fetchAnimation } from 'src/app/animations/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ fetchAnimation ]
})
export class IndexComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Event> = new MatTableDataSource();

  columns: string[] = [ 'name', 'date', 'view' ];

  loading: boolean = false;

  subscription: Subscription;

  isMobile: boolean = false;

  constructor(private eventService: EventService,
              private store: Store<{events: Event[]}>,
              private router: Router,
              breakpointObserver: BreakpointObserver) {


    this.subscription = store.select('events').subscribe( events => {      
                          this.dataSource.connect().next(events.map( e => new Event().fill(e)));
                        });

    breakpointObserver.observe(Breakpoints.Handset).subscribe( state => {
      this.isMobile = state.matches;
      this.columns = this.isMobile 
                          ? [ 'name', 'date' ] 
                          : [ 'name', 'date', 'view' ];
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  fetchEvents(): void{
    this.loading = true;
    this.eventService.query().subscribe( events => {
      this.loading = false;
    });
  }

  select(event: Event): void{

    if(this.isMobile == false)
      return;

    setTimeout( () => {
      this.router.navigate(['/events/' + event.id]);
    }, 100);
  }

}
