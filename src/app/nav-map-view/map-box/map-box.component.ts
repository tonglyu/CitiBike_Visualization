import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { MapService } from '../map.service';
import { STATIONS_URL_PREFIX, YEARS, COLORS } from '../constants';
import { generate } from '../../../../node_modules/rxjs';


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

  private loadSourceData() {
    YEARS.forEach((year) => {
      this.STATIONS[year] = "stations" + year
      this.map.addSource(this.STATIONS[year], {
        type: 'geojson',
        data: STATIONS_URL_PREFIX + year + ".geojson",
        generateId: true
      });
    })

    this.map.addSource('nyc', {
      type: 'geojson',
      data: 'src/assets/statistics/nyc.json',
      generateId: true
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
      this.loadSourceData();
      var legend = document.getElementById("legend");
      var hoveredId = null;
      var clickedId = null;
      var hoveredYear = null;
      var clickedYear = null;
      var isStats = true;

      this.map.addLayer({
        id: "nyc",
        type: "fill",
        source: "nyc",
        'paint': {
          'fill-color': 'aqua',
          'fill-opacity':
            ["case",
              ["boolean", ["feature-state", "pop"], false], 0.75, 0
            ]
        }
      })

      YEARS.forEach((year) => {
        this.map.addLayer({
          id: 'stations' + year,
          type: 'circle',
          source: 'stations' + year,
          layout: {
            visibility: 'none'
          },
          paint: {
            'circle-radius':
              ["case",
                ["boolean", ["feature-state", "click"], false], 4, 3
              ],
            'circle-color':
              ["case",
                ["boolean", ["feature-state", "click"], false], 'aqua', COLORS[year]
              ],
            'circle-stroke-width':
              ["case",
                ["boolean", ["feature-state", "hover"], false], 2, 0
              ],
            'circle-stroke-color': COLORS[year]
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
          } else {
            this.map.setLayoutProperty('stations' + year, 'visibility', 'none');
          }

        });

        // change layers order
        if (Object.prototype.toString.call(years) == "[object Array]") {
          for (var i = 0; i < years.length; i++) {
            this.map.moveLayer('stations' + years[i]); // move to the end of layers
          }
        }
        if (hoveredId) {
          this.map.setFeatureState({ source: 'stations' + hoveredYear, id: hoveredId }, { hover: false });
        }
        if (clickedId) {
          this.map.setFeatureState({ source: 'stations' + clickedYear, id: clickedId }, { click: false });
        }
        hoveredId = null;
        hoveredYear = null;
        clickedId = null;
        clickedYear = null;
      });

      this.mapService.analysisSource.subscribe(name => {
        if (name == "statistics") {
          isStats = true;
        } else {
          isStats = false;
          if (hoveredId) {
            this.map.setFeatureState({ source: 'stations' + hoveredYear, id: hoveredId }, { hover: false });
          }
          if (clickedId) {
            this.map.setFeatureState({ source: 'stations' + clickedYear, id: clickedId }, { click: false });
          }
          hoveredId = null;
          hoveredYear = null;
          clickedId = null;
          clickedYear = null;
        }
      });

      this.mapService.neiborShowSource.subscribe((neighbor) => {
        if (neighbor != "") {
          this.map.setFeatureState({ source: 'nyc', id: neighbor }, { pop: true });
          

          // popup.setLngLat(e.lngLat)
          // .setHTML(description)
          // .addTo(this.map);
        }
      })

      this.mapService.neiborHidSource.subscribe((neighbor) => {
        if (neighbor != "") {
          this.map.setFeatureState({ source: 'nyc', id: neighbor }, { pop: false });
        }
      })

      this.map.on('mouseenter', 'nyc', (e) => {
        // Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = 'pointer';
        console.log(e.features[0].properties.neighborho)

        //var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].id + e.features[0].properties.neighborho;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat)
          .setHTML(description)
          .addTo(this.map);
      })

      this.map.on('mouseleave', 'nyc', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });


      YEARS.forEach((year) => {
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

          // highlight
          if (e.features.length > 0) {
            if (hoveredId) {
              this.map.setFeatureState({ source: 'stations' + hoveredYear, id: hoveredId }, { hover: false });
            }
            hoveredId = e.features[0].id;
            hoveredYear = year;
            this.map.setFeatureState({ source: 'stations' + hoveredYear, id: hoveredId }, { hover: true });
          }
        });


        this.map.on('mouseleave', 'stations' + year, () => {
          //unhighlight
          if (hoveredId) {
            this.map.setFeatureState({ source: 'stations' + hoveredYear, id: hoveredId }, { hover: false });
          }
          hoveredId = null;
          hoveredYear = null;
          this.map.getCanvas().style.cursor = '';
          popup.remove();
        });

        this.map.on('click', 'stations' + year, (e) => {
          // highlight
          if (e.features.length > 0 && isStats) {
            if (hoveredId) {
              this.map.setFeatureState({ source: 'stations' + hoveredYear, id: hoveredId }, { hover: false });
            }
            if (clickedId) {
              this.map.setFeatureState({ source: 'stations' + clickedYear, id: clickedId }, { click: false });
            }
            hoveredId = null;
            hoveredYear = null;
            clickedId = e.features[0].id;
            clickedYear = year;
            this.map.setFeatureState({ source: 'stations' + clickedYear, id: clickedId }, { click: true });
            this.mapService.changeStation({ 'Year': year, 'Id': e.features[0].properties.id, 'Name': e.features[0].properties.addr });
          }
        });

      });
      this.map.setLayoutProperty('stations2013', 'visibility', 'visible');
      clickedYear = "2013";
      clickedId = "100";
      this.map.setFeatureState({ source: 'stations' + clickedYear, id: clickedId }, { click: true });
    });
  }
}
