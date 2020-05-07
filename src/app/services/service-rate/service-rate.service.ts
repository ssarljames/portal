import { Injectable } from '@angular/core';
import { ResourceService } from '../../core/services/resource/resource.service';
import { ServiceRate } from '../../models/service-rate/service-rate';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceRateService extends ResourceService<ServiceRate> {

  constructor(private http: HttpClient) {
    super(http, 'service-rates');
  }
}
