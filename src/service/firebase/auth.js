import { getFirebaseService } from '../firebase';
import { fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';
import User from './auth/User';

export let user = new User();

export const observer = fromEventPattern(
  function (handler) {
    return getFirebaseService('auth').then((auth) => {
      return auth().onAuthStateChanged(handler);
    });
  },
  function (handler, listener) {
    listener.then((unsubscribe) => {
      unsubscribe();
    });
  }
).pipe(
  createUser()
);

export function authorize () {
  return getFirebaseService('auth').then((auth) => {
    return auth().signInWithRedirect(new auth.GoogleAuthProvider());
  });
}

export function unauthorize () {
  return getFirebaseService('auth').then((auth) => {
    return auth().signOut();
  });
}

function createUser () {
  return map(data => {
    user = new User(data);
    return user;
  });
}
