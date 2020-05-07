import { HttpClient } from '@angular/common/http';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Injectable } from '@angular/core';
import { Station } from 'src/app/models/station/station';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService extends ResourceService<Station> {

  constructor(private http: HttpClient) {
    super(http, 'stations');
  }

  public use(station: Station, password: string): Observable<Station>{
    return this.http.put<Station>(`${this.uri}/${station.id}`, {
      use: 1,
      password: password
    });
  }


  public leave(station: Station, password: string): Observable<Station>{
    return this.http.put<Station>(`${this.uri}/${station.id}`, {
      leave: 1,
      password: password
    });
  }
}
