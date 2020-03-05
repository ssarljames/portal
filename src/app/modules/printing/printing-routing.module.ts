import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: IndexComponent
  // },
  {
    path: '',
    redirectTo: 'printer/1',
    pathMatch: 'full'
  },
  {
    path: 'printer/:id',
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingRoutingModule { }
