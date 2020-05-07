import { Injectable } from '@angular/core';

import { ModalService } from '../../../modules/shared/services/modal/modal.service';

import { BehaviorSubject, Observable } from 'rxjs';

interface GeolocationCoordinates{
  latitude: number;
  longitude: number;
  altitude: string;
  accuracy: number;
  altitudeAccuracy: any;
  heading: string;
  speed: string;
}

interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private $data: BehaviorSubject<GeolocationPosition>;

  constructor(private modalService: ModalService) {

    this.$data = new BehaviorSubject(null);

  }


  getLocation(): void{
    if ( navigator.geolocation ) { 
      navigator.geolocation
                .getCurrentPosition( 
                      this.setCurrentPosition,
                      this.positionError,
                      { 
                        enableHighAccuracy: false, 
                        timeout: 15000, 
                        maximumAge: 0 
                      } 
                  );
    } 
    
 }

 get connect(): Observable<GeolocationPosition> {
   return this.$data;
 }
     
 private setCurrentPosition = ( position ) => { 
    
    this.$data.next(position);
        
  }

 private positionError = ( error ) => { 
        switch ( error.code ) {
            case error.PERMISSION_DENIED: 
                  this.modalService.toast( "User denied the request for Geolocation.", 'Geo Location Error', 'error' ); 
                  break; 

            case error.POSITION_UNAVAILABLE:
                  this.modalService.toast( "Location information is unavailable.", 'Geo Location Error', 'error' ); 
                  break; 
                  
            case error.TIMEOUT: 
                  this.modalService.toast( "The request to get user location timed out.", 'Geo Location Error', 'error' ); 
                  break; 

            case error.UNKNOWN_ERROR: 
                  this.modalService.toast( "An unknown error occurred.", 'Geo Location Error', 'error' ); 
                  break; 
                
        }
      
  }


  getImage(): string{

    const position: GeolocationPosition = this.$data.value;

    if(position){

      const latlon = position.coords.latitude + "," + position.coords.longitude;
      const zoom = 14;
      const size = '400x300';

      const key = 'Pls9xrkBMe4GeVjamgsM6bo1kGxGGoZk';

      return `https://open.mapquestapi.com/staticmap/v5/map?key=${key}&shape=radius:10mi|${latlon}&zoom=8`;

    }

    return '';

  }
 
}
