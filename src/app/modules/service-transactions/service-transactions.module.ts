import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTransactionsRoutingModule } from './service-transactions-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ServiceTransactionsRoutingModule,
    SharedModule
  ]
})
export class ServiceTransactionsModule { }
