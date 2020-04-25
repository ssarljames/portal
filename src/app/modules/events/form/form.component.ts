import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Event } from 'src/app/models/event/event';
import { EventService } from 'src/app/services/event/event.service';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MaterialSelectOption } from '../../shared/utils/material-select/material-select.component';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';


import * as format from 'date-fns/format';
import * as add_days from 'date-fns/add_days';

import { ModalService } from '../../shared/services/modal/modal.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {

  @Input() event: Event;
  @Output() onSaved: EventEmitter<Event> = new EventEmitter();

  editor =  ClassicEditor;

  form: FormGroup;

  eventTypes: MaterialSelectOption[];

  notSingleDayEvent: boolean = false;
  saving: boolean = false;

  constructor(private eventService: EventService,
              private modalService: ModalService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.event ? this.event.id : ''),
      name: new FormControl(this.event ? this.event.name : '', Validators.required),
      description: new FormControl(this.event ? this.event.description : '', Validators.required),
      type: new FormControl(this.event ? this.event.type : '', Validators.required),
      start_date: new FormControl(this.event ? this.event.start_date : new Date(), Validators.required),
      end_date: new FormControl(this.event ? this.event.end_date : null),
      include_weekends: new FormControl(this.event ? this.event.include_weekends : '')
    });

    this.notSingleDayEvent = this.event && this.event.end_date ? true : false;

    this.eventTypes = [
      {
        label: 'Meeting/Assembly',
        value: 1
      },
      {
        label: 'Activity',
        value: 2
      },
      {
        label: 'Others',
        value: 3
      }
    ]
  }

  toggleNotSingleDayEvent(change: MatCheckboxChange){
    this.notSingleDayEvent = change.checked;
    if(this.notSingleDayEvent == false)
      this.form.controls.end_date.setValue(null);
    else
      this.form.controls.end_date.setValue( add_days(this.form.controls.start_date.value, 1) );
  }

  save(): void{

    if(this.form.valid){

      const eventData: any = (new Event).formFill(this.form);

      eventData.start_date = format(eventData.start_date, 'YYYY-MM-DD');
      if(eventData.end_date)
        eventData.end_date = format(eventData.end_date, 'YYYY-MM-DD');

      const request: Observable<Event> = this.event 
                                          ? this.eventService.update(eventData)
                                          : this.eventService.create(eventData);

      this.saving = true;
      request.subscribe( event => {
        this.onSaved.emit(event);
        this.modalService.toast(this.event ? 'Event was updated successfully' : 'Event was created.', 'Success', 'success');
        this.saving = false;
      },
      e => {
        this.saving = false;
        this.modalService.toast(this.event ? 'Error on updating event' : 'Error on creating event.', 'Ooops', 'error');
        this.form.fillErrors(e);
      });

    }
  }

}
