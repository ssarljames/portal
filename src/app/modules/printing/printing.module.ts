import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintingRoutingModule } from './printing-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ShowComponent } from './show/show.component';
import { CreateTransactionComponent } from './show/create-transaction/create-transaction.component';


@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    CreateTransactionComponent
  ],
  imports: [
    CommonModule,
    PrintingRoutingModule,
    SharedModule
  ]
})
export class PrintingModule { }
