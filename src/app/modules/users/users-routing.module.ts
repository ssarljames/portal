import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorGuard } from 'src/app/core/guards/administrator/administrator.guard';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [ AdministratorGuard ]
  },
  {
    path: ':id/edit',
    component: EditComponent,
    canActivate: [ AdministratorGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
