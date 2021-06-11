import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '文件目录',
      component: () => import(/* webpackChunkName: "home" */ '@/views/index'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/info-list',
      name: '目录',
      component: () => import(/* webpackChunkName: "info-list" */ '@/views/info-list')
    },
    {
      path: '/image-view',
      name: '标准作业查看',
      component: () => import(/* webpackChunkName: "image-view" */ '@/views/image-view')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    let position = { x: 0, y: 0 }
    if (savedPosition) {
      position = savedPosition
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position)
      }, 300)
    })
  }
})
