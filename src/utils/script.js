export default function load (url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script');
    script.onload = function () {
      this.onload = function () { };
      this.parentNode.removeChild(this);
      resolve();
    };
    script.onreadystatechange = function () {
      if (this.readyState === 'complete') {
        this.onload();
      }
    };
    script.onerror = function (e) {
      this.parentNode.removeChild(this);
      reject(e);
    };
    script.async = true;
    script.defer = true;
    script.src = url;
    document.head.appendChild(script);
  });
}
