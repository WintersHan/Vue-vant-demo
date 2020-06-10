// import Home from '@/views/Home'
export default [
  // {
  //   path: '/',
  //   name: 'Home',
  //   meta: {
  //     title: '首页'
  //   },
  //   component: Home
  // },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/index'),
    meta: { title: '首页' },
    redirect: '',
    children: [
      {
        path: 'homeIndex',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/homeIndex/index'),
        name: 'homeIndex',
        meta: { title: '首页' }
      },
      {
        path: 'onlineAsk',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/onlineAsk/index'),
        name: 'onlineAsk',
        meta: { title: '线上问诊' }
      },
      {
        path: 'healthService',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/healthService/index'),
        name: 'healthService',
        meta: { title: '健康服务' }
      },
      {
        path: 'mine',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/mine/index'),
        name: 'mine',
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '**',
    redirect: {
      name: 'Home'
    }
  }
];
