import { Component, OnInit } from '@angular/core';
import { StationUsageLog } from 'src/app/models/station-usage-log/station-usage-log';
import { MatTableDataSource } from '@angular/material/table';
import { StationUsageLogService } from 'src/app/services/station-usage-log/station-usage-log.service';

@Component({
  selector: 'app-duty-time-percentage',
  templateUrl: './duty-time-percentage.component.html',
  styleUrls: ['./duty-time-percentage.component.scss']
})
export class DutyTimePercentageComponent implements OnInit {

  duty_time_percentages_mds: MatTableDataSource<StationUsageLog>;


  timePercantageTableColumns: string[] = [ 'user', 'total_time', 'percentage' ];

  isDataLoaded: boolean = false;
  isLoading: boolean = false;

  constructor(private stationUsageLogService: StationUsageLogService) {
    this.duty_time_percentages_mds = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.fetchDutyTimePercentage();
  }

  fetchDutyTimePercentage(): void{
    this.isLoading = true;
    this.stationUsageLogService.query({
      params: {
        duty_time_percentage: 1
      }
    }).subscribe(dutyTimePercentages => {
      this.isLoading = false;
      this.isDataLoaded = true;
      this.duty_time_percentages_mds.connect().next(dutyTimePercentages);
    });
  }
}
