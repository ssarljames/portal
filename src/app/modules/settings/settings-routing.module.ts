import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintingServiceComponent } from './printing-service/printing-service.component';


const routes: Routes = [
  {
    path: 'printing-service',
    component: PrintingServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
