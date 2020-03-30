import { Component, OnInit } from '@angular/core';
import { StationUsageLogService } from 'src/app/services/station-usage-log/station-usage-log.service';
import { MatTableDataSource } from '@angular/material/table';
import { StationUsageLog } from 'src/app/models/station-usage-log/station-usage-log';

@Component({
  selector: 'app-station-usage-logs',
  templateUrl: './station-usage-logs.component.html',
  styleUrls: ['./station-usage-logs.component.scss']
})
export class StationUsageLogsComponent implements OnInit {


  station_usage_logs_mds: MatTableDataSource<StationUsageLog>;

  stationUsageLogsTableColumns: string[] = [ 'created_at', 'station', 'user', 'time_in', 'time_out', 'total_time' ];

  isDataLoaded: boolean = false;
  isLoading: boolean = false;

  constructor(private stationUsageLogService: StationUsageLogService) {
    this.station_usage_logs_mds = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.fetchStationUsageLogs();
  }


  fetchStationUsageLogs(): void{
    this.isLoading = true;
    this.stationUsageLogService.query({
      params: {
        sortBy: 'created_at',
        sortOrder: 'desc'
      }
    }).subscribe((station_usage_logs) => {
      this.station_usage_logs_mds.connect().next(station_usage_logs);
      this.isDataLoaded = true;
      this.isLoading = false;
    });
  }

}
