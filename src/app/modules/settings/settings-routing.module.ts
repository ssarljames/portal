import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintingServiceComponent } from './printing-service/printing-service.component';
import { AdministratorGuard } from 'src/app/core/guards/administrator/administrator.guard';


const routes: Routes = [
  {
    path: 'printing-service',
    component: PrintingServiceComponent,
    canActivate: [ AdministratorGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
