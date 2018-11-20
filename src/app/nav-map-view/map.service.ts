import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {ACCESS_TOKEN} from './constants';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})

export class MapService {

  public yearsSource = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = ACCESS_TOKEN
  }

  changeYears(years: string[]) {
      this.yearsSource.next(years);
  }

}
