import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StationService } from 'src/app/services/station/station.service';
import { Station } from 'src/app/models/station/station';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { Store } from '@ngrx/store';
import { StationLoadAction } from 'src/app/store/station/actions';
import { StationUsageLog } from 'src/app/models/station-usage-log/station-usage-log';
import { Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { StationUsageLogService } from '../../../services/station-usage-log/station-usage-log.service';
import { StationUsageLogLoadAction } from '../../../store/station-usage-log/actions';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {


  stations: Station[];

  fetchingStations: boolean = false;




  station_usage_logs_mds: MatTableDataSource<StationUsageLog> = new MatTableDataSource();

  stationUsageLogsTableColumns: string[] = [ 'created_at', 'station', 'user', 'time_in', 'time_out', 'total_time' ];

  isDataLoaded: boolean = false;
  isLoading: boolean = false;

  subs: Subscription[] = [];

  constructor(private stationService: StationService,
              private authService: AuthenticationService,
              private router: Router,
              private stateService: StateService,
              private modalService: ModalService,
              private stationUsageLogService: StationUsageLogService,
              private store: Store<{ stations: Station[], station_usage_logs: StationUsageLog[]}>) {

              this.subs.push(
                this.store.select('stations').subscribe( stations => {
                  this.stations = stations;
                })
              );


              this.subs.push(
                this.store.select('station_usage_logs').subscribe(station_usage_logs => {
                  this.isDataLoaded = true;
                  this.station_usage_logs_mds.connect().next(station_usage_logs);
                })
              );


  }

  ngOnInit(): void {
    const station: Station = this.stateService.get('active_station');
    if(station)
      this.setActiveStation(station);
    else
      this.fetchStations();


    this.fetchStationUsageLogs();
  }
  
  ngOnDestroy(): void{
    this.subs.forEach(sub => sub.unsubscribe());
  }

  fetchStations(): void{
    this.fetchingStations = true;
    this.stationService.query().subscribe((stations: Station[]) => {

      let activeStation: Station = null;

      stations.forEach((station: Station) => {
        if(station.current_session && station.current_session.user_id == this.authService.user.id)
          activeStation = station;
      });

      if(activeStation == null)
        this.store.dispatch(new StationLoadAction(stations))
        // this.stations = stations;
      else
        this.setActiveStation(activeStation);

      this.fetchingStations = false;
    });
  }

  useStation(station: Station): void{
    station = {...station};
    this.modalService.prompt({
      question: "Please enter your password to continue",
      required: true,
      password: true
    }).then(password => {

      if(password){
        station.isJoining = true;
        this.stationService.use(station, password).subscribe((station: Station) => {
          station.isJoining = false;
          this.setActiveStation(station);
        },
        e => {
          station.isJoining = false;
          this.modalService.alert({
            message: 'Password is not correct',
            type: 'warn'
          })
        });
      }

    })
  }

  setActiveStation(station: Station): void{
    this.stateService.set('active_station', station);
    this.router.navigate([`management/service-transactions/${station.id}`]);
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
