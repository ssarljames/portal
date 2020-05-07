import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { DutyTimePercentageComponent } from './duty-time-percentage/duty-time-percentage.component';
import { StationUsageLogsComponent } from './station-usage-logs/station-usage-logs.component';


@NgModule({
  declarations: [
    IndexComponent,
    DutyTimePercentageComponent,
    StationUsageLogsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
