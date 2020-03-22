import { HttpClient } from '@angular/common/http';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Injectable } from '@angular/core';
import { Station } from 'src/app/models/station/station';

@Injectable({
  providedIn: 'root'
})
export class StationService extends ResourceService<Station> {

  constructor(http: HttpClient) {
    super(http, 'stations');
  }
}
