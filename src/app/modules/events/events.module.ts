import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { EventsRoutingModule } from './events-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { FormComponent } from './form/form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { MonitorAttendanceComponent } from './show/manage-attendance/monitor-attendance.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    FormComponent,
    ShowComponent,
    EditComponent,
    MonitorAttendanceComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    CKEditorModule,
    ZXingScannerModule
  ],
  entryComponents: [
    FormComponent
  ]
})
export class EventsModule {
  constructor(){
    console.log('Events Module Loaded');
  }
}
