import { Component, OnInit } from '@angular/core';
import { GeoService } from 'src/app/core/services/geo/geo.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {


  mapImageUrl: string = null;

  constructor(private geoService: GeoService) { }

  ngOnInit(): void {

    this.geoService.connect.subscribe( position => {
      this.mapImageUrl = this.geoService.getImage();      
    });

    this.geoService.getLocation();
  }

}
