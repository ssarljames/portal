import { Component, OnInit } from '@angular/core';
import { StationUsageLogService } from 'src/app/services/station-usage-log/station-usage-log.service';
import { MatTableDataSource } from '@angular/material/table';
import { StationUsageLog } from 'src/app/models/station-usage-log/station-usage-log';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StationUsageLogLoadAction } from 'src/app/store/station-usage-log/actions';

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

  subs: Subscription;

  constructor(private stationUsageLogService: StationUsageLogService,
              private store: Store<{station_usage_logs: StationUsageLog[]}>) {
    this.station_usage_logs_mds = new MatTableDataSource();

    this.subs = this.store.select('station_usage_logs').subscribe(station_usage_logs => {
      this.isDataLoaded = true;
      this.station_usage_logs_mds.connect().next(station_usage_logs);
    })

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
      this.store.dispatch(new StationUsageLogLoadAction(station_usage_logs))
      this.isDataLoaded = true;
      this.isLoading = false;
    });
  }

}
