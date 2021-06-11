import router from '@/router'
import routerFilter from '@/utils/permission-util'
import * as DingTalkApi from 'dingtalk-jsapi'

router.beforeEach((to, from, next) => {
  DingTalkApi.ui.webViewBounce.disable()
  DingTalkApi.biz.navigation.setTitle({
    title: to.name
  })
  routerFilter(next)
})
