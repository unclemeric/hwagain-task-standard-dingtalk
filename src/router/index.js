import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '文件目录',
      hidden: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/image-view',
      name: '标准作业查看',
      meta: {
        state: 0,
        background: '#18bb4a'
      },
      component: () => import(/* webpackChunkName: "image-view" */ '@/views/home/image-view')
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
