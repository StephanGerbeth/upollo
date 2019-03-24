import { getMapService, validate } from '../google';

/*
  getGeocode('Reussensteinstr. 33, Fellbach').then((result) => {
    console.log(result);
  });
*/
export function getGeocode (address) {
  return request({ 'address': address });
}

/*
  getAddressLookup({ lat: 39.7391536, lng: -104.9847034 }).then((result) => {
    console.log(result);
  });
*/
export function getAddressLookup (latLng) {
  console.log(latLng);
  return request({ 'location': latLng });
}

/*
  getGeocodeByPlaceId('ChIJrTLr-GyuEmsRBfy61i59si0').then((result) => {
    console.log(result);
  });
*/
export function getGeocodeByPlaceId (placeId) {
  return request({ 'placeId': placeId });
}

function request (options) {
  return getMapService('Geocoder')
    .then((geocoder) => {
      return new Promise((resolve, reject) => {
        geocoder.geocode(
          options,
          (result, status) => validate(result, status, resolve, reject)
        );
      });
    });
}
