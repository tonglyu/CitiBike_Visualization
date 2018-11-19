import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { MapService } from '../map.service';
import {STATIONS_URL_PREFIX, YEARS} from '../constants'

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})

export class MapBoxComponent implements OnInit {

  // default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 40.7300;
  lng = -73.9800;

  // data
  source: any;
  markers: any;

  //read-in data
  STATIONS = {};

  constructor(private mapService: MapService) {
  }

  ngOnInit() {   
    this.initializeMap();
  }

  private loadStationsData() {
    // STATIONS = {'2013' : './src/assets/stations/2013.geojson', ...}
    YEARS.forEach((year) => {
      this.STATIONS[year] = "stations" + year
      this.map.addSource(this.STATIONS[year], {
        type: 'geojson',
        data: STATIONS_URL_PREFIX + year + ".geojson"
      });
    })
  }

  private initializeMap() {
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 12,
      center: [this.lng, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    // Add geojson data on map load
    this.map.on('load', (event) => {
      this.loadStationsData();

      // // get source
      // this.source = this.map.getSource('stations2013');

      // this.markers = this.stations2013;
      // // subscribe to realtime database and set data source
      // this.markers.subscribe(markers => {
      //   this.source.setData(markers)
      // })

      this.map.addLayer({
        id: 'stations2013',
        type: 'circle',
        source: 'stations2013',
        layout: {
          visibility: 'visible'
        },
        paint: {
          'circle-radius': 3,
          'circle-color': 'red'
        }
      });

      this.map.addLayer({
        id: 'stations2017',
        type: 'circle',
        source: 'stations2017',
        layout: {
          visibility: 'visible'
        },
        paint: {
          'circle-radius': 3,
          'circle-color': 'green'
        }
      });

    })

  }
}
