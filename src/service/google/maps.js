import { maps, validate } from '@/service/google';
import { fromEventPattern } from 'rxjs';
import polyline from 'polyline';

export function createMap (el) {
  return maps().then((maps) => {
    return new maps.Map(el, {
      zoom: 8,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    });
  });
}

export function getDirection () {
  return maps().then((maps) => {
    const directionsService = new maps.DirectionsService();
    return new Promise((resolve, reject) => {
      directionsService.route({
        origin: 'stuttgart, germany',
        destination: 'hamburg, germany',
        travelMode: 'DRIVING'
      }, (result, status) => validate(result, status, resolve, reject));
    });
  });
}

export function getGeoJSONFromDirection (direction, stroke = null) {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          stroke: stroke
        },
        geometry: polyline.toGeoJSON(direction.routes[0].overview_polyline)
      }
    ]
  };
}

export function updateMapBounds (map, value) {
  if (value.geometry.viewport) {
    map.fitBounds(value.geometry.viewport);
  } else {
    map.setCenter(value.geometry.location);
    map.setZoom(17);  // Why 17? Because it looks good.
  }
}

export function createMarker (map) {
  return maps().then((maps) => {
    return new maps.Marker({
      map: map,
      draggable: true,
      anchorPoint: maps.Point(0, -29)
    });
  });
}

export function updateMarkerOnMap (marker, location) {
  marker.setPosition(location);
}

export function fromEvent (el, eventName) {
  return fromEventPattern(
    function (handler) {
      return el.addListener(eventName, handler);
    },
    function (handler, listener) {
      maps.then((maps) => {
        maps.event.removeListener(listener);
      });
    }
  );
}
