<template>
  <div class="app-box">
    <vue-element-loading
      :active="isLoading"
      color="#0099ff"
      is-full-screen
      :text-style="{ fontSize: '.36rem' }"
      spinner="spinner"
      :text="'加载中'"
    />
    <div class="search-box">
      <div class="row-box">
        <div class="form-item">
          <div
            style="display: flex;align-items: center;justify-content: space-between;padding: 5px 10px;box-sizing:border-box;"
          >
            <input
              type="text"
              placeholder="关键字搜索"
              style="flex:1;height: 26px;border-radius: 3px;border: 1px solid #ccc;padding: 3px 10px;outline:none;"
              v-model="keywords"
            />
            <!-- <button class="search-btn" @click="doSearch">查询</button> -->
          </div>
        </div>
      </div>
    </div>
    <ul class="task-list">
      <li style="background: #e6e6e6;height: 40px;">
        <div class="item-index">序号</div>
        <div class="item-title" style="justify-content: center;">文件名称</div>
        <div class="item-operation">操作</div>
      </li>
      <li v-for="(item, i) in taskList" :key="i">
        <div class="item-index">{{ i + 1 }}</div>
        <div class="item-title">{{ item.folderName || '' }}</div>
        <div class="item-operation">
          <button
            data-v-5954443c=""
            class="van-button van-button--primary van-button--small van-button--hairline van-button--plain"
            @click="viewImage(item)"
          >
            <span data-v-5954443c="" class="van-button__text">查阅</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as DingTalkApi from 'dingtalk-jsapi'
import request from '@/utils/httpUtil'
export default {
  data() {
    return {
      isLoading: false,
      taskList: [],
      taskListOrigin: '',
      keywords: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    if (['100', '200'].includes(to.query.type)) {
      next()
    } else {
      next('/')
    }
  },
  watch: {
    keywords() {
      this.doSearch()
    }
  },
  methods: {
    doSearch() {
      let json = JSON.parse(this.taskListOrigin)
      if (this.keywords) {
        let result = json.filter(it => it.folderName.includes(this.keywords))
        this.taskList = result
      } else {
        this.taskList = json
      }
    },
    viewImage(data) {
      this.$vuet.modules.home.setFileData(data)
      this.$router.push('/image-view')
    },
    getList() {
      let params = {
        standardType: this.$route.query.type
      }
      this.isLoading = true
      request
        .get(this.$api.TaskStandardList, { params })
        .then(res => {
          this.isLoading = false
          if (res.data && res.data.success === true) {
            this.taskListOrigin = JSON.stringify(res.data.data || [])
            this.taskList = res.data.data || []
          } else {
            this.taskList = []
          }
        })
        .catch(err => {
          this.isLoading = false
        })
    }
  },
  mounted() {
    this.getList()
    DingTalkApi.ui.webViewBounce.disable()
    DingTalkApi.biz.navigation.setTitle({
      title:
        this.$route.query.type === '100' ? '作业标准查看' : this.$route.query.type === '200' ? '病虫草害参考手册' : ''
    })
  }
}
</script>

<style lang="less" scoped>
input,
button {
  // border: none;
  outline: none;
  // border-radius: initial;
  border-radius: 8px;
  margin: 0;
  padding: 0;
  background: transparent;
}
.app-box {
  height: 100vh;
  width: 100%;
  background: #fff;
  overflow: auto;
  // .search-btn {
  //   padding: 6px 10px;
  //   border: none;
  //   background: #0099ff;
  //   color: #fff;
  //   width: 100px;
  //   border-radius: 3px;
  //   margin-left: 15px;
  //   &:active {
  //     opacity: 0.8;
  //   }
  // }
  .task-list {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      flex-direction: row;
      // min-height: 42px;
      border-bottom: 1px solid #ececec;
      div {
        font-size: 14px;
        display: inline-block;
        padding: 5px 10px;
        justify-content: center;
        align-items: center;
        display: flex;
        &.item-index {
          width: 50px;
          text-align: center;
          border-right: 1px solid #ececec;
        }
        &.item-operation {
          width: 50px;
          text-align: center;
        }
        &.item-title {
          white-space: normal;
          text-align: left;
          border-right: 1px solid #ececec;
          padding: 5px;
          justify-content: left;
          overflow: hidden;
          text-overflow: ellipsis;
          width: calc(100vw - 144px);
        }
      }
    }
  }
}
</style>
