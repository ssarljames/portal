import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event/event';
import { EventService } from 'src/app/services/event/event.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../shared/services/modal/modal.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  event: Event;

  constructor(private eventService: EventService,
              private store: Store<{events: Event[]}>,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
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

  deleteEvent(): void{
    this.modalService.confirm({
      message: 'Are you sure to delete this event?'
    }).then( c => {
      if(c)
        this.eventService.delete(this.event).subscribe( () => {
          this.router.navigate(['/monitorment/events']);
          this.modalService.toast('Event was deleted.', 'Success', 'success');
        });
    })
  }

}
