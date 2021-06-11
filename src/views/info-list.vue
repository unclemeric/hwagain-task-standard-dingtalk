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
      taskList: []
    }
  },
  beforeRouteEnter(to, from, next) {
    if (['100', '200'].includes(to.query.type)) {
      next()
    } else {
      next('/')
    }
  },
  methods: {
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
.app-box {
  height: 100vh;
  width: 100%;
  background: #fff;
  overflow: auto;
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
