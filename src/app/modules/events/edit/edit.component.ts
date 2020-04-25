import { Component, OnInit, OnChanges } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event/event';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  event: Event;

  constructor(private eventService: EventService,
              private store: Store<{events: Event[]}>,
              private activatedRoute: ActivatedRoute,
              private router: Router) {


  }

  ngOnInit(): void {

    const event_id = this.activatedRoute.snapshot.params.id;

    this.store.select('events').subscribe(events => {
      if(events)
        this.event = (new Event()).fill( events.find(e => e && e.id == event_id) );
    })

    this.fetchEvent();
  }

  fetchEvent(): void{
    const event_id = this.activatedRoute.snapshot.params.id;
    this.eventService.read(event_id).subscribe( event => {

    });
  }

  onUpdated(event: Event): void{
    this.router.navigate(['/management/events/'+ event.id]);
  }
}
