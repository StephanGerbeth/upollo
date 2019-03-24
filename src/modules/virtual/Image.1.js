const VirtualModule = require('webpack-virtual-modules');
// const fs = require('fs');
const rp = require('request-promise');
const path = require('path');


class VirtualImage extends VirtualModule {
  constructor() {
    super();
  }

  apply (compiler) {
    super.apply(compiler);

    compiler.hooks.normalModuleFactory.tap('VirtualImagePlugin', (nmf) => {
      nmf.hooks.beforeResolve.tap('ResolveVirtualFile', (request) => {
        if (
          request.request.indexOf('.jpg') != -1 &&
          request.request.indexOf('@/assets/storage/') != -1
        ) {
          console.log(path.relative(process.cwd(), request.request.replace('@/assets', 'src/assets')));


          const srcUrl = 'http://cms.borishorn.de/storage/styles/GPWork/5c068cbb383333788a00003d/75808dfd51d049549e5487fe5c0982ef_1600x904_90_1543932979_fitToWidth_adb115059e28d960fa8badfac5516667.jpg?cimgt=1547559161';
          return requestImage(srcUrl).then((buffer) => {
            this.writeModule(path.relative(process.cwd(), request.request.replace('@/assets', 'src/assets')), buffer);
            return request;
          });
        } else {
          return Promise.resolve(request);
        }
      });
    });
  }
}

module.exports = function (options) {
  console.log(options);
  this.extendBuild(config => {
    config.plugins.push(new VirtualImage());
  });
};

function requestImage (srcUrl) {
  return rp.get({
    url: srcUrl,
    encoding: null
  })
    .then((res) => {
      return Buffer.from(res, 'utf8');
    });
}

// fs.readFileAsync = function (filename) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, (err, buffer) => {
//       if (err) reject(err); else resolve(buffer);
//     });
//   });
// };
