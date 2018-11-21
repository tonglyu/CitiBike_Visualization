import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { MapService } from '../map.service';
import { STATIONS_URL_PREFIX, YEARS, COLORS } from '../constants';


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
  year: string;

  //read-in data
  STATIONS = {};
  selectedYears: string[];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.initializeMap();
  }

  private loadStationsData() {
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
      zoom: 11.15,
      center: [this.lng, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.mapService.changeYears([]);

    // Add geojson data on map load
    this.map.on('load', (event) => {
      this.loadStationsData();
      var legend = document.getElementById("legend");
      YEARS.forEach((year) => {
        this.map.addLayer({
          id: 'stations' + year,
          type: 'circle',
          source: 'stations' + year,
          layout: {
            visibility: 'none'
          },
          paint: {
            'circle-radius': 3,
            'circle-color': COLORS[year]
          }
        });

        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = COLORS[year];

        var value = document.createElement('span');
        value.innerHTML = year;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
      });

      // Create a popup, but don't add it to the map yet.
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      this.mapService.yearsSource.subscribe((years) => {
        YEARS.forEach((year) => {
          if (years.includes(year)) {
            this.map.setLayoutProperty('stations' + year, 'visibility', 'visible');
            this.map.on('mouseenter', 'stations' + year, (e) => {
              // Change the cursor style as a UI indicator.
              this.map.getCanvas().style.cursor = 'pointer';

              var coordinates = e.features[0].geometry.coordinates.slice();
              var description = e.features[0].properties.addr;

              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears
              // over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              // Populate the popup and set its coordinates
              // based on the feature found.
              popup.setLngLat(coordinates)
                .setHTML(description)
                .addTo(this.map);
            });


            this.map.on('mouseleave', 'stations' + year, () => {
              this.map.getCanvas().style.cursor = '';
              popup.remove();
            });
          } else {
            this.map.setLayoutProperty('stations' + year, 'visibility', 'none');
          }
        });
      });
    });
  }
}
