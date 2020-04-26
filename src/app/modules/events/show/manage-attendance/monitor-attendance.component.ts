import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { EventTimeLogService } from 'src/app/services/event-time-log/event-time-log.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { Event } from 'src/app/models/event/event';

import * as difference_in_days from 'date-fns/difference_in_days';
import * as add_days from 'date-fns/add_days';
import * as is_weekend from 'date-fns/is_weekend';
import * as format from 'date-fns/format';
import * as is_today from 'date-fns/is_today';
import * as is_before from 'date-fns/is_before';

import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EventTimeLog } from 'src/app/models/event-time-log/event-time-log';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-monitor-attendance',
  templateUrl: './monitor-attendance.component.html',
  styleUrls: ['./monitor-attendance.component.scss']
})
export class MonitorAttendanceComponent implements OnInit {

  event: Event;

  dates: Date[] = [];

  dataSource: MatTableDataSource<EventTimeLog> = new MatTableDataSource();

  columns: string[] = [ 'name', 'time', 'type' ];

  defaultTabIndex: number = 0;
  loading: boolean = false;

  recording: boolean = false;
  initializing: boolean = false;

  subject: BehaviorSubject<EventTimeLog[]>;

  constructor(private eventService: EventService,
              private store: Store<{events: Event[]}>,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
              private router: Router,
              private eventTimeLogService: EventTimeLogService) {


    this.subject = this.dataSource.connect();
  }


  ngOnInit(): void {

    const event_id = this.activatedRoute.snapshot.params.id;

    this.store.select('events').subscribe(events => {
      if(events.length > 0){
        this.event = (new Event()).fill( events.find(e => e && e.id == event_id) );

        if(this.event)
          this.setDates();
      }
    });


    this.fetchEvent();

  }

  fetchEvent(): void{
    const event_id = this.activatedRoute.snapshot.params.id;
    this.eventService.read(event_id, {
      params: {
        include_logs: true
      }
    }).subscribe( event => {

    });
  }

  setDates(): void{
    let d1: Date = this.event.start_date;
    let d2: Date = this.event.end_date;

    if(d2 == null)
      this.dates = [ d1 ];

    else{
      const days = difference_in_days(d2, d1) + 1;


      this.dates = [];

      for(let i=0; i<days; i++){
        const d = add_days(d1, i);
        if(is_weekend(d) == false || this.event.include_weekends){
          this.dates.push( d );
          
          this.defaultTabIndex = is_today(d) || is_before(d, new Date()) ? this.dates.length - 1 : this.defaultTabIndex;

        }

        
      }
      
    }

    if(is_today(this.dates[this.defaultTabIndex]))
      this.subject.next(this.event.time_logs);
    
  }

  tabChange(e: MatTabChangeEvent): void{
    this.fetchTimeLogs(this.dates[e.index]);
  }

  fetchTimeLogs(date: Date): void{

    this.loading = true;

    this.subject.next([]);
    this.eventTimeLogService.query({
      params: {
        date: format(date, 'YYYY-MM-DD')
      }
    }, `events/${this.event.id}/`).subscribe( logs => {
      this.subject.next(logs);
      this.loading = false;
    });
  }

  toggleRecording(date: Date): void{

    this.recording = !this.recording;

    this.initializing = true;
    setTimeout(()=> {
      this.initializing = false;
    }, 2000);

    // const log: EventTimeLog = new EventTimeLog().fill({
    //   user_id: this.subject.getValue().length % 2 + 1
    // });

    // this.eventTimeLogService.create(log, `events/${this.event.id}/`).subscribe( log => {
      
      
    //   this.subject.next([log, ...this.subject.getValue()] );

    // });

  }

  scan(code: string): void{
    this.modalService.toast(`Code: ${code}`, 'Scan Complete', 'success');
  }

}
