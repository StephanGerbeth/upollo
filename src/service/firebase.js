import loadScript from '../utils/script';

const serviceUrlPattern = 'https://www.gstatic.com/firebasejs/5.8.6/firebase-${service}.js';
const projectID = 'upollo-f0bf6';
const config = {
  apiKey: 'AIzaSyBrKX_6Ikfe_37mSoPQ7VhWabdIaZSZUp0',
  authDomain: `${projectID}.firebaseapp.com`,
  databaseURL: `https://${projectID}.firebaseio.com`,
  projectId: `${projectID}`,
  storageBucket: `${projectID}.appspot.com`,
  messagingSenderId: '999749012759'
};
const services = new Map();

export function getFirebaseService (service) {
  return getService('app').then(() => {
    return getService(service);
  });
}

function getService (service) {
  if (!services.has(service)) {
    services.set(service, loadService(service).then(() => {
      if (!global.firebase.apps.length) {
        global.firebase.initializeApp(config);
      }
      return global.firebase[service];
    }));
  }
  return services.get(service);
}

function loadService (service) {
  return loadScript(new Function('service', 'return `' + serviceUrlPattern + '`;')(service));
}
