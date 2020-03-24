import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { StationUsageLog } from 'src/app/models/station-usage-log/station-usage-log';

@Injectable({
  providedIn: 'root'
})
export class StationUsageLogService extends ResourceService<StationUsageLog> {

  constructor(http: HttpClient) {
    super(http, 'station-usage-logs');
  }
}
