import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from '../../core/services/resource/resource.service';
import { EventTimeLog } from '../../models/event-time-log/event-time-log';

@Injectable({
  providedIn: 'root'
})
export class EventTimeLogService extends ResourceService<EventTimeLog> {

  constructor(http: HttpClient) {
    super(http, 'event-time-logs');
  }
}
