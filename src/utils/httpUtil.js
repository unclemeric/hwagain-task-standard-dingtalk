import axios from 'axios'
import * as DingTalkApi from 'dingtalk-jsapi'
import { API } from '@/api'
import vuet from '@/vuet'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '',
  timeOut: 5000
  // onUploadProgress: p=> {
  //     console.log(p)
  //     if (progressEvent.lengthComputable){
  //         return Math.round((p.loaded * 100) / p.total)
  //     }
  // }
})
request.interceptors.request.use(
  config => {
    if (config.url !== API.DINGTALK_USERID) {
      config.headers.common['Authorization'] = vuet.modules.home.token || vuet.modules.home._LOGINUSER_.token
    }
    // config.headers.common['Authorization'] =
    //   'eyJhbGciOiJSUzI1NiJ9.eyJ1c2VySWQiOiJBMjAyNDk0IiwidXNlcm5hbWUiOiLotZbkuInlj5EiLCJleHAiOjE2MTM4NTA0MDR9.ImmQ9VOsTexTjeaMjevCHlZrs2vQ8q0R6jSFeRRs4WKftazJtFUkYGlp9xZegBgHoCcASRTUltyXW0e2P_tSeeOhdfhxQBB6UiAzWSuDDL8oMcoM-qYxo5w-FegMG3HPDoEjfT-v6Vz9z-4sGMFvLNJ8162jIbiS8x1gmTSHXlY'
    return config
  },
  error => {}
)

request.interceptors.response.use(
  res => {
    return res
  },
  error => {
    if (error.response) {
      let errMsg = ''
      switch (error.response.status) {
        // case 401:
        //   console.error('token is out of time');
        //   errMsg = '登录信息获取失败'
        //   break;
        case 500:
          errMsg = '系统异常: errorCode = 500'
          break
        case 503:
          errMsg = '系统异常: 503,后台服务未启动'
          break
        case 401:
          errMsg = '登录失效，将重新获取用户信息'
          DingTalkApi.util.domainStorage.removeItem({ name: 'loginuser' })
          break
      }
      if (error.response.status === 401) {
        window.location.reload()
      } else if (errMsg) {
        dd.device.notification.alert({
          message: errMsg || error.response.msg || '',
          title: '系统提示',
          buttonName: '确定',
          onSuccess: function() {}
        })
      }
    }
    return Promise.reject(error.response)
  }
)
export default request
