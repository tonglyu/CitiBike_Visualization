import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { MapService } from '../map.service';


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit{

  // default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 40.7300;
  lng = -73.9800;

  // data
  source: any;
  markers: any;
  
    

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.initializeMap();
    this.stations2013 = this.mapService.getStations(2013);
    this.stations2017 = this.mapService.getStations(2017);
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
        this.map.addSource('stations2013', { 
            type: 'geojson',
            data: {
               type: 'FeatureCollection',
               features: []
         }
        });
        
        // get source
        this.source = this.map.getSource('stations2013');
      
        this.markers = this.stations2013;
        // subscribe to realtime database and set data source
        this.markers.subscribe(markers => {
              this.source.setData(markers)
        })

        
        this.map.addLayer({
            id: 'stations2013',
            type: 'circle',
            source: 'stations2013',
            layout: {
              visibility: 'visible'
            },
            paint: {
                'circle-radius': 3,
                'circle-color': 'yellow'
            }
        });
        
    })
    
  }


}
