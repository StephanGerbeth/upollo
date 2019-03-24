import { getFirebaseService } from '../firebase';

export function airports (search, max) {
  return getFirebaseService('database').then((database) => {
    return database()
      .ref('airports')
      .orderByChild('ident')
      .startAt(search)
      .endAt(search + '\uf8ff')
      .limitToLast(max)
      .once('value').then((snapshot) => {
        const result = snapshot.val() || [];
        return Object.keys(result).map((key) => {
          return {
            id: result[key].ident,
            name: result[key].name
          };
        });
      });
  });
}

export function aircrafts (search, max) {
  return getFirebaseService('database').then((database) => {
    return database()
      .ref('aircrafts')
      .orderByChild('registration')
      .startAt(search)
      .endAt(search + '\uf8ff')
      .limitToLast(max)
      .once('value').then((snapshot) => {
        const result = snapshot.val() || [];
        return Object.keys(result).map((key) => {
          return {
            id: result[key].registration,
            name: `${result[key].model} | ${result[key].owner}`
          };
        });
      });
  });
}
