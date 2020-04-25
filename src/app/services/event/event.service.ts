import { Injectable } from '@angular/core';
import { ResourceService, ResourceAction } from 'src/app/core/services/resource/resource.service';
import { Event } from 'src/app/models/event/event';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { EventAddAction, EventUpdateAction, EventLoadAction, EventRemove } from 'src/app/store/event/actions';


class EventAction implements ResourceAction<Event> {
  
  constructor(public store: Store){

  }

  create(event: Event): void {
    this.store.dispatch(new EventAddAction(event));
  }

  update(event: Event): void {
    this.store.dispatch(new EventUpdateAction(event));
  }

  list(events: Event[]): void {
    this.store.dispatch(new EventLoadAction(events));
  }

  read(event: Event): void {
    this.store.dispatch(new EventUpdateAction(event));
  }

  delete(event: Event): void {
    this.store.dispatch(new EventRemove(event));
  }

  
}

@Injectable({
  providedIn: 'root'
})
export class EventService extends ResourceService<Event> {

  constructor(http: HttpClient, store: Store) {
    super(http, 'events', null, new EventAction(store));
  }
}

