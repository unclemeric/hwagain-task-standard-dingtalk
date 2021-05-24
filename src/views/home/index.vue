<template>
  <div class="app-box">
    <ul class="task-list">
      <li style="background: #e6e6e6;">
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
      taskList: []
    }
  },
  methods: {
    viewImage(data) {
      console.log(this.$vuet.store)
      this.$vuet.modules.home.setFileData(data)
      this.$router.push('/image-view')
    },
    getList() {
      request
        .get(this.$api.TaskStandardList)
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
      title: this.$route.name
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
      min-height: 42px;
      border-bottom: 1px solid #ccc;
      div {
        font-size: 14px;
        display: inline-block;
        padding: 8px 10px;
        justify-content: center;
        align-items: center;
        display: flex;
        &.item-index {
          width: 50px;
          text-align: center;
          border-right: 1px solid #ccc;
        }
        &.item-operation {
          width: 50px;
          text-align: center;
        }
        &.item-title {
          white-space: normal;
          text-align: left;
          border-right: 1px solid #ccc;
          padding: 0 5px;
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
