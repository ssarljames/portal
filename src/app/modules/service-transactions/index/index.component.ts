import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StationService } from 'src/app/services/station/station.service';
import { Station } from 'src/app/models/station/station';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  stations: Station[];

  fetchingStations: boolean = false;

  constructor(private stationService: StationService,
              private authService: AuthenticationService,
              private router: Router,
              private stateService: StateService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    const station: Station = this.stateService.get('active_station');
    if(station)
      this.setActiveStation(station);
    else
      this.fetchStations();
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
        this.stations = stations;
      else
        this.setActiveStation(activeStation);

      this.fetchingStations = false;
    });
  }

  useStation(station: Station): void{
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
    this.router.navigate([`/service-transactions/${station.id}`]);
  }

}
