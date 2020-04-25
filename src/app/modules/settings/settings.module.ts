import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { PrintingServiceComponent } from './printing-service/printing-service.component';
import { SharedModule } from '../shared/shared.module';
import { DateFnsModule } from 'ngx-date-fns';


@NgModule({
  declarations: [PrintingServiceComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    DateFnsModule.forRoot()
  ]
})
export class SettingsModule { 
  constructor(){
    console.log('Settings Module Loaded');
  }
}
