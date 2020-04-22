import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/event/event';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  dataSource: MatTableDataSource<Event> = new MatTableDataSource();

  columns: string[] = [ 'name', 'date' ];

  constructor(private eventService: EventService,
              private store: Store<{events: Event[]}>,
              private router: Router) {


    store.select('events').subscribe( events => {      
      this.dataSource.connect().next(events);
    })

  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void{
    this.eventService.query().subscribe( events => {

    });
  }

  select(event: Event): void{
    setTimeout( () => {
      this.router.navigate(['/management/events/' + event.id]);
    }, 100);
  }

}
