import { Injectable } from '@angular/core';
import { ResourceService } from '../../core/services/resource/resource.service';
import { PrintRate } from '../../models/print-rate/print-rate';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PrintRateService extends ResourceService<PrintRate> {

  constructor(private http: HttpClient) {
    super(http, 'print-rates');
  }
}
