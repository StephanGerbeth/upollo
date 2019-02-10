// process.env.DEBUG = 'webpack-virtual-modules';

const path = require('path');
// const fs = require('fs');
const opn = require('opn');
const projectID = 'upollo-f0bf6';

module.exports = {
  dev: process.env.NODE_ENV === 'development',
  srcDir: 'src/',
  css: [],
  env: {},

  build: {
    analyze: getAnalyzerConfig(),
    babel: {
      babelrc: true,
      cacheDirectory: undefined
    },
    parallel: true,
    transpile: []
  },

  generate: {
    dir: 'dist/website'
  },

  render: {
    http2: { push: true }
  },

  router: {
    base: '/'
  },

  hooks: {
    build: {
      done: function () {
        if (process.env.NODE_ENV === 'development' && !process.env.TRAVIS) {
          opn('http://localhost:8050', { app: ['google chrome', '--incognito'] });
        }
      }
    }
  },

  plugins: [
    { src: '@/plugins/intersectionObserver' }
  ],

  modules: [
    '@/modules/fix/image',
    '@/modules/virtual',
    '@/modules/svg',
    '@/modules/webp',
    '@/modules/image',
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          iso: 'en-US'
        },
        {
          code: 'de',
          iso: 'de-DE'
        }
      ],
      defaultLocale: 'de',
      strategy: 'prefix_except_default',
      seo: true,
      vueI18n: {
        fallbackLocale: 'de',
        messages: {
          en: require(path.resolve('src/globals/locales/en.json')),
          de: require(path.resolve('src/globals/locales/de.json'))
        }
      },
      vueI18nLoader: true
    }],
    ['nuxt-validate', {
      lang: 'de'
    }],
    ['nuxt-fire', {
      useOnly: ['auth'],
      config: {
        development: {
          apiKey: 'AIzaSyBrKX_6Ikfe_37mSoPQ7VhWabdIaZSZUp0',
          authDomain: `${projectID}.firebaseapp.com`,
          databaseURL: `https://${projectID}.firebaseio.com`,
          projectId: `${projectID}`,
          storageBucket: `${projectID}.appspot.com`,
          messagingSenderId: '999749012759'
        },
        production: {
          apiKey: 'AIzaSyBrKX_6Ikfe_37mSoPQ7VhWabdIaZSZUp0',
          authDomain: `${projectID}.firebaseapp.com`,
          databaseURL: `https://${projectID}.firebaseio.com`,
          projectId: `${projectID}`,
          storageBucket: `${projectID}.appspot.com`,
          messagingSenderId: '999749012759'
        }
      }
    }],
    ['@nuxtjs/pwa', {
      dev: process.env.NODE_ENV === 'development',
      icon: {
        iconSrc: 'src/static/favicon.png',
        sizes: [16, 120, 144, 152, 192, 384, 512]
      },
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
        mobileApp: true,
        mobileAppIOS: true,
        appleStatusBarStyle: 'default',
        favicon: true,
        name: 'TITLE',
        author: '',
        description: '',
        theme_color: 'black',
        lang: 'de',
        ogType: 'website',
        ogSiteName: 'ogSITE_NAME',
        ogTitle: 'ogTITLE',
        ogDescription: 'ogDESCRIPTION',
        ogHost: undefined,
        ogImage: true
      },
      manifest: {
        name: 'Sample MANIFEST',
        short_name: 'Sample',
        lang: 'de'
      }
    }],
    ['@nuxtjs/sitemap', {
      path: '/sitemap.xml',
      hostname: 'https://localhost:8050',
      cacheTime: 1000 * 60 * 15,
      gzip: false,
      generate: true,
      exclude: [],
      routes: []
    }],
    ['nuxt-robots-module', {
      UserAgent: '*',
      Disallow: '',
      Sitemap: 'https://localhost:8050/sitemap.xml'
    }],
    '@/modules/licence'
  ],

  head: {
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
    ],
    link: [],
    script: [
      {
        src:
          'https://cdn.polyfill.io/v2/polyfill.min.js?features=HTMLPictureElement',
        defer: true
      },
      {
        innerHTML:
          'document.createElement( "picture" );document.createElement( "source" );'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  }
};

function getAnalyzerConfig () {
  if (process.env.NODE_ENV === 'static') {
    return {
      analyzerMode: 'static',
      reportFilename: path.resolve('dist/reports/webpack-bundle-analyzer.html'),
      openAnalyzer: true
    };
  } else {
    return false;
  }
}

// function getBrowserslistRC () {
//   return fs.readFileSync(path.resolve('.browserslistrc')).toString().trim().split('\n');
// }
