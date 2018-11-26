import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {ACCESS_TOKEN} from './constants';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})

export class MapService {

  public yearsSource = new BehaviorSubject<string[]>([]);
  public stationSource = new BehaviorSubject<object>({});
  public analysisSource = new BehaviorSubject<string>("statistics");

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = ACCESS_TOKEN
  }

  changeYears(years: string[]) {
      this.yearsSource.next(years);
  }
  
  changeStation(station: object) {
      this.stationSource.next(station);
  }
  
  changeAnalysis(analysis: string) {
      this.analysisSource.next(analysis);
  }
  
  public getStations(year: string): Observable<any> {
     return this.http.get("src/assets/stations/" + year + ".geojson");
}

}
