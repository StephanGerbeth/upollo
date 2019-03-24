import { getMapService, validate } from '../google';

/*
  getElevation([{ lat: 39.7391536, lng: -104.9847034 }]).then((result) => {
    console.log(result);
  });
*/
export function getElevation (latLng) {
  return getMapService('ElevationService')
    .then((elevator) => {
      return new Promise((resolve, reject) => {
        elevator.getElevationForLocations(
          {
            'locations': latLng
          },
          (result, status) => validate(result, status, resolve, reject)
        );
      });
    });
}

/*
  getElevationAlongPath([
    { lat: 36.579, lng: -118.292 },  // Mt. Whitney
    { lat: 36.606, lng: -118.0638 },  // Lone Pine
    { lat: 36.433, lng: -117.951 },  // Owens Lake
    { lat: 36.588, lng: -116.943 },  // Beatty Junction
    { lat: 36.34, lng: -117.468 },  // Panama Mint Springs
    { lat: 36.24, lng: -116.832 }
  ], 2).then((result) => {
    console.log(result);
  });
*/
export function getElevationAlongPath (path, samples = 256) {
  return getMapService('ElevationService')
    .then((elevator) => {
      return new Promise((resolve, reject) => {
        elevator.getElevationAlongPath(
          {
            'path': path,
            'samples': samples
          },
          (result, status) => validate(result, status, resolve, reject)
        );
      });
    });
}
