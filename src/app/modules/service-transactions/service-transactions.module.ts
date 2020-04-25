import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTransactionsRoutingModule } from './service-transactions-routing.module';
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
    ServiceTransactionsRoutingModule,
    SharedModule
  ]
})
export class ServiceTransactionsModule { 
  constructor(){
    console.log('Service Transactions Module Loaded');
  }
}
