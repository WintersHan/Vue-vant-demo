const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path');

const DEV_KEY = process.env.DEV_KEY;

let url = 'http://xuchengli.mynatapp.cc/';
// 某些接口需要特殊转发 写在specialProxyApi中 结构为proxy中的
let specialProxyApi = {};
if (DEV_KEY === 'pro') {
  url = 'https://jmapp.bailingjk.net/';
  specialProxyApi = {};
}

console.log('TargetUrl =======>START');
console.log(url);
console.log('TargetUrl =======>END');

module.exports = {
  publicPath: '/',
  productionSourceMap: false, lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      ...specialProxyApi,
      '/': {
        target: url,
        changeOrigin: true
      }
    }
  },
  configureWebpack (config) {
    // 不将AMap打进包
    config.externals = {
      'AMap': 'AMap' // 高德地图配置
    };
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ],
        pluginOptions: {
          'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, '/src/assests/common.less')]
          }
        }
      }
    }
  }
};
