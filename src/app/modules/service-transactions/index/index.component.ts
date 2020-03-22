import { Component, OnInit } from '@angular/core';
import { StationService } from 'src/app/services/station/station.service';
import { Station } from 'src/app/models/station/station';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  stations: Station[];

  constructor(private stationService: StationService) { }

  ngOnInit(): void {
    this.fetchStations();
  }

  fetchStations(): void{
    this.stationService.query().subscribe((stations: Station[]) => {
      this.stations = stations;
    });
  }

}
