import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: CreateComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: ShowComponent
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
