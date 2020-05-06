import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/event/event';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Event> = new MatTableDataSource();

  columns: string[] = [ 'name', 'date' ];

  loading: boolean = false;

  subscription: Subscription;

  constructor(private eventService: EventService,
              private store: Store<{events: Event[]}>,
              private router: Router) {


    this.subscription = store.select('events').subscribe( events => {      
                          this.dataSource.connect().next(events.map( e => new Event().fill(e)));
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
    setTimeout( () => {
      this.router.navigate(['/management/events/' + event.id]);
    }, 100);
  }

}
