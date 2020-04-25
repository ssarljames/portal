import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { MonitorAttendanceComponent } from './show/manage-attendance/monitor-attendance.component';

import { ConfirmLeaveGuard } from '../../core/guards/confirm-leave/confirm-leave.guard';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: ':id/edit',
    component: EditComponent
  },
  {
    path: ':id/monitor-attendance',
    component: MonitorAttendanceComponent,
    canDeactivate: [ ConfirmLeaveGuard ]
  },
  {
    path: ':id',
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
