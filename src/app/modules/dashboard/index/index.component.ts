import { StationUsageLogService } from './../../../services/station-usage-log/station-usage-log.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { StationUsageLog } from 'src/app/models/station-usage-log/station-usage-log';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  station_usage_logs_mds: MatTableDataSource<StationUsageLog>;

  stationUsageLogsTableColumns: string[] = [ 'created_at', 'station', 'user', 'time_in', 'time_out', 'total_time' ];

  constructor(private stationUsageLogService: StationUsageLogService) {
    this.station_usage_logs_mds = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void{
    this.stationUsageLogService.query({
      params: {
        sortBy: 'created_at',
        sortOrder: 'desc'
      }
    }).subscribe((station_usage_logs) => {
      this.station_usage_logs_mds.connect().next(station_usage_logs);
    });
  }
}
