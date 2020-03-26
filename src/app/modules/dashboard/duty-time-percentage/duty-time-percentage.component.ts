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

  constructor(private stationUsageLogService: StationUsageLogService) {
    this.duty_time_percentages_mds = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.fetchDutyTimePercentage();
  }

  fetchDutyTimePercentage(): void{
    this.stationUsageLogService.query({
      params: {
        duty_time_percentage: 1
      }
    }).subscribe(dutyTimePercentages => {
      this.duty_time_percentages_mds.connect().next(dutyTimePercentages);
    });
  }
}
