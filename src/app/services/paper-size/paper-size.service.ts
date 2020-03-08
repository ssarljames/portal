import { Injectable } from '@angular/core';
import { ResourceService } from '../../core/services/resource/resource.service';
import { HttpClient } from '@angular/common/http';
import { PaperSize } from '../../models/paper-size/paper-size';


@Injectable({
  providedIn: 'root'
})
export class PaperSizeService extends ResourceService<PaperSize> {

  constructor(private http: HttpClient) {
    super(http, 'paper-sizes');
  }
}
