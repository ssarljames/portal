import { DateFnsModule } from 'ngx-date-fns';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { PermissionsModalComponent } from './permissions-modal/permissions-modal.component';
import { AddPermissionComponent } from './show/add-permission/add-permission.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    PermissionsModalComponent,
    AddPermissionComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    DateFnsModule.forRoot()
  ]
})
export class UsersModule { }
