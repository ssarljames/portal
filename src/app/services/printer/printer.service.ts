import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Printer } from 'src/app/models/printer/printer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrinterService extends ResourceService<Printer> {

  constructor(private http: HttpClient) {
    super(http, 'printers');
   }
}
