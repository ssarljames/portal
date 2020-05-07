import { Injectable } from '@angular/core';
import { ResourceService } from '../../core/services/resource/resource.service';
import { PrintQuality } from '../../models/print-quality/print-quality';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrintQualityService extends ResourceService<PrintQuality> {

  constructor(private http: HttpClient) {
    super(http, 'print-qualities');
  }
}
