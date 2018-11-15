import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})

export class MapService {

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }


  getStations(year: number): Observable<any> {
    return this.http.get("src/assets/stations/" + year + ".geojson")
  }

}