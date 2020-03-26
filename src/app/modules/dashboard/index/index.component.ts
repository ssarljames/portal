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



  constructor() {

  }

  ngOnInit(): void {

  }

}
