import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/page'
import bgClock from '@/view/bgClock'
import moFang from '@/view/moFang'
import txMap from '@/view/txMap'
import tableRow from '@/view/tableRow'
import transForm from '@/view/transForm'
import tree from '@/view/tree'
import slideTab from '@/view/slideTab'
import useJs from '@/view/useJs'
import shoppingCart from '@/view/shoppingCart'
import autoPrint from '@/view/autoPrint'

Vue.use(Router)

const routes = [{
  path: '/',
  component: homePage,
  children: [{
    path: '/menu/bgClock',
    component: bgClock,
    meta: {
      title: '时钟八卦图',
      keepAlive: false
    }
  }, {
    path: '/menu/moFang',
    component: moFang,
    meta: {
      title: '魔方',
      keepAlive: false
    }
  },
  {
    path: '/menu/tableRow',
    component: tableRow,
    meta: {
      title: 'table行合并',
      keepAlive: false
    }
  }, {
    path: '/menu/txMap',
    component: txMap,
    meta: {
      title: '腾讯地图',
      keepAlive: false
    }
  }, {
    path: '/menu/transForm',
    component: transForm,
    meta: {
      title: '放假通知',
      keepAlive: false
    }
  }, {
    path: '/menu/tree',
    component: tree,
    meta: {
      title: '树结构',
      keepAlive: false
    }
  },{
    path: '/menu/slideTab',
    component: slideTab,
    meta: {
      title: '滑动效果',
      keepAlive: false
    }
  },{
    path: '/menu/useJs',
    component: useJs,
    meta: {
      title: 'JS实用',
      keepAlive: false
    }
  },{
    path: '/menu/shoppingCart',
    component: shoppingCart,
    meta: {
      title: '购物车',
      keepAlive: false
    }
  },{
    path: '/menu/autoPrint',
    component: autoPrint,
    meta: {
      title: '监控中心',
      keepAlive: false
    }
  }]
}, {
  path: '/404',
  component: () =>
    import( /* webpackChunkName: "page" */ '@/components/error-page/404'),
  name: '404',
  meta: {
    keepAlive: true,
    isTab: false,
    isAuth: true
  }
},
]
const router = new Router({
  routes
})
//路由前置守卫；用来设置元信息
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router