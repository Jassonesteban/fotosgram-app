import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa', { static: true }) mapa: any;

  constructor() { }

  ngOnInit() {
    const LatLong = this.coords.split(',');
    const lat = Number(LatLong[0]);
    const lgn = Number(LatLong[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiamFzc29uZ3VhbGd1YW4iLCJhIjoiY2ttOXptMGw0MW5obzJvbzU2a3UwcTgxeSJ9.q1E6G8oJVqa8YXG7rGhBMw';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lgn, lat],
      zoom: 15,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    map.on('load', function () {
      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },

        labelLayerId
      );
    });

    const marker = new mapboxgl.Marker().setLngLat([lgn, lat]).addTo(map);
  }

}
