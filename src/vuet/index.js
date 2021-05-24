import Vue from 'vue'
import Vuet from 'vuet'
import * as DingTalkApi from 'dingtalk-jsapi'

Vue.use(Vuet)

const userStorage = function() {
  return DingTalkApi.util.domainStorage.getItem({ name: 'loginuser' }).then(res => {
    return JSON.parse(res.value || '{}')
  })
}

const publicModules = {
  _LOGINUSER_: {},
  checkLogin: function() {
    return new Promise(async resolve => {
      let loginuser = await userStorage()
      this._LOGINUSER_ = loginuser
      resolve(loginuser)
    })
  },
  doLogin: function(userInfo) {
    this._LOGINUSER_ = userInfo || '{}'
  }
}

Vuet.options.module = publicModules
const modules = {
  home: {
    data() {
      return {
        token: '',
        fileData: {}
      }
    },
    setFileData(data) {
      this.fileData = data
    },
    SETTOKEN(val) {
      this.token = val
    }
  }
}
const vuet = new Vuet({
  modules
})

export default vuet
