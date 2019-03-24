export const STATUS = {
  PROCESSING: createStatus(102, 'receiving geolocation'),
  OK: createStatus(200, 'geolocation service available'),
  UNAVAILABLE: createStatus(503, 'geolocation service is not available'),
  UNAUTHORIZED: createStatus(401, 'no authorization to access geolocation')
};

export function isAvailable () {
  if (global.navigator && 'geolocation' in global.navigator) {
    return STATUS.OK;
  } else {
    return STATUS.UNAVAILABLE;
  }
}

export function getCurrentPosition (options = {}) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        resolve(createStatus(202, 'received geolocation successful', e));
      },
      () => {
        reject(STATUS.UNAUTHORIZED);
      },
      options);
  });
}

function createStatus (code, message, data = null) {
  return { code, message, data };
}
