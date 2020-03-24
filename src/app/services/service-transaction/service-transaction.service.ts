import { HttpClient } from '@angular/common/http';
import { ServiceTransaction } from 'src/app/models/service-transaction/service-transaction';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceTransactionService extends ResourceService<ServiceTransaction> {

  constructor(http: HttpClient) {
    super(http, 'service-transactions');
  }
}
