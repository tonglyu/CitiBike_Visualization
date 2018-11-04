import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit{

  // default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 40.7128;
  lng = -74.0060;

  // data
  source: any;
  markers: any;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.markers = this.mapService.getGeoJSON()
    this.initializeMap()
  }

  private initializeMap() {

    this.buildMap()

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    /// Add geojson data on map load
    this.map.on('load', (event) => {
        this.map.addSource('subway', { 
            type: 'geojson',
            data: {
               type: 'FeatureCollection',
               features: []
         }
        });
        
        // get source
        this.source = this.map.getSource('subway');
      
        
        // subscribe to realtime database and set data source
        this.markers.subscribe(markers => {
              this.source.setData(markers)
        })

        
        this.map.addLayer({
            id: 'subway',
            type: 'circle',
            source: 'subway',
            layout: {
              visibility: 'visible'
            },
            paint: {
                'circle-radius': 5,
                'circle-color': 'yellow'
            }
        });
    })

  }


}
