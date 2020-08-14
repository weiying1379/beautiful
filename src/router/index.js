import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import { checktoken } from '@/api/apis'
Vue.use(VueRouter)



let router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: '/main',
      component: () => import('../pages/Main'),
      
      children: [
        {
          path: '/main/index',
          name: '/main/index',
          component: () => import('../pages/main/Index'),
          meta:{breadName:['首页']},
        },
        {
          path: '/main/statistics',
          name: '/main/statistics',
          component: () => import('../pages/main/Statistics'),
          meta:{breadName:['商品管理','订单统计']},

        },
        {
          path: '/main/acct',
          name: '/main/acct',
          component: () => import('../pages/main/Acct'),
          meta:{breadName:['订单管理']},

        },
        {
          path: '/main/shopment',
          name: '/main/shopment',
          component: () => import('../pages/main/Shopment'),
        },
        {
          path: '/main/management',
          name: '/main/management',
          component: () => import('../pages/main/Management'),
          meta:{breadName:['店铺管理']},

        },
        {
          path: '/main/my',
          name: '/main/my',
          component: () => import('../pages/main/My'),
        },
        {
          path: '/main/classification',
          name: '/main/classification',
          component: () => import('../pages/main/Classification'),
          meta:{breadName:['商品管理','商品分类']},

        },
        {
          path: '/main/lst',
          name: '/main/lst',
          component: () => import('../pages/main/Lst'),
          meta:{breadName:['商品管理','商品列表']},

        },
        {
          path: '/main/addTo',
          name: '/main/addTo',
          component: () => import('../pages/main/AddTo'),
          meta:{breadName:['商品管理','商品添加']},

        },
        {
          path: '/main/statiSstics2',
          name: '/main/statiSstics2',
          component: () => import('../pages/main/StatiSstics2'),
          meta:{breadName:['商品统计']},

        },
        {
          path: '/main/addAcct',
          name: '/main/addAcct',
          component: () => import('../pages/main/AddAcct'),
          meta:{breadName:['账户管理','添加账号']},

        },
        {
          path: '/main/modify',
          name: '/main/modify',
          component: () => import('../pages/main/Modify'),
          meta:{breadName:['账户管理','修改密码']},

        },
        {
          path: '/main/acctLst',
          name: '/main/acctLst',
          component: () => import('../pages/main/AcctLst'),
          meta:{breadName:['账户管理','账号列表']},

        },
        {
          path: '/main/my',
          name: '/main/my',
          component: () => import('../pages/main/My'),
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    checktoken(localStorage.token).then(res => {
      if (res.data.code == 0) 
        next()
       else
        next('/')
    })
  } else
    next()
})
export default router


//------------------------------不报错 迷惑自我------------------------//
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}