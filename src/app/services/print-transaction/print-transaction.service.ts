import { Injectable } from '@angular/core';
import { PrintTransaction } from '../../models/print-transaction/print-transaction';
import { ResourceService } from '../../core/services/resource/resource.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintTransactionService extends ResourceService<PrintTransaction>{

  constructor(private http: HttpClient) {
    super(http, 'print-transactions');
  }
}
