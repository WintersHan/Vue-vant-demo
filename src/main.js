import Vue from 'vue';
import App from './App.vue';
import 'amfe-flexible';
import './plugins/vant';
import 'swiper/dist/css/swiper.min.css';
// import Utils from '@/utils/utils';
// eslint-disable-next-line import/extensions


// vConsole 手机端调试 非生产环境自动开启
import vConsole from 'vconsole';
import store from './store';
import router from './router';

// Vue.prototype.$utils = Utils;
Vue.config.productionTip = false;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line new-cap
  Vue.prototype.$vConsole = new vConsole();
}

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (window.token === '') {
      console.log(1);
    } else {
      next();
    }
  } else {
    next();
  }
});

// FastClick.attach(document.body)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
