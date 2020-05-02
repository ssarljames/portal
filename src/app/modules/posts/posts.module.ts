import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { PostsRoutingModule } from './posts-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    IndexComponent, 
    CreateComponent, 
    EditComponent, 
    ShowComponent, 
    FormComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    CKEditorModule
  ],
  entryComponents: [
    FormComponent
  ]
})
export class PostsModule { }
