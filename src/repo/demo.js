let total = null;

export default {
  get (index) {
    return new Promise((resolve) => {
      resolve('test ' + index);
    });
  },

  total () {
    if (!total) {
      total = new Promise((resolve) => {
        // setTimeout(() => {
        resolve(50000);
        // }, 3000);

      });
    }
    return total;
  }
};
