import loadScript from '../utils/script';

const key = 'AIzaSyDurWIHQsnB-l3dTE0ZjOZ5H2C6CbeUPi0';
const api = {
  instance: null,
  services: new Map()
};

export function maps () {
  if (global.google && global.google.maps) {
    return Promise.resolve(global.google.maps);
  } else {
    return getInstance(loadMapScript)
      .then(() => {
        return global.google.maps;
      });
  }
}

export function getMapService (service) {
  if (!api.services.has(service)) {
    api.services.set(service, maps()
      .then((maps) => {
        return new maps[service]();
      })
    );
  }
  return api.services.get(service);
}

export function validate (result, status, resolve, reject) {
  if (status === 'OK') {
    resolve(result);
  } else {
    reject(status);
  }
}

function getInstance (load) {
  if (!api.instance) {
    api.instance = load();
  }
  return api.instance;
}

function loadMapScript () {
  return Promise.all([
    new Promise((resolve) => {
      global.initMap = function () {
        global.initMap = undefined;
        resolve();
      };
    }),
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`)
  ]);
}
