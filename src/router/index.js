import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Request from '@/utils/request';
import routes from './routes';
import { checkLogin } from '@/api/common';
Vue.use(VueRouter);
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePosition = 100;
      }
      return { x: 0, y: to.meta.savePosition || 0 };
    }
  }
});

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  // 如果存在title，则赋值
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  Request.cancel();
  // 进度条
  NProgress.start();
  if (to.meta.requireAuth) {
    checkLogin(to.fullPath).then(res => {
      // 检查登录状态为true时，next,否则重定向到登录页
      // console.log(res, 'login')
      next();
    }).catch(err => {
      console.log(err);
    });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
