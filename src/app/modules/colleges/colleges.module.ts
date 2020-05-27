import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollegesRoutingModule } from './colleges-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    FormComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    CollegesRoutingModule,
    SharedModule
  ]
})
export class CollegesModule { }
