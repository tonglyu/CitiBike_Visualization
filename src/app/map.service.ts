import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject } from 'rxjs';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})

export class MapService {

    public yearsSource = new BehaviorSubject<string[]>([]);

    constructor(private http: HttpClient) {
        mapboxgl.accessToken = environment.mapbox.accessToken
    }

    changeYears(years: string[]) {
        this.yearsSource.next(years);
    }

}