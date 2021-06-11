<template>
  <div class="image-view-container">
    <div>
      <img
        v-if="fileData.files && fileData.files.length > currIndex"
        :src="fileData.files[currIndex].filePath"
        style="width: 100%"
        @load="callBtnEnabled"
      />
    </div>
    <footbar>
      <div style="display:flex;">
        <van-button
          style="width:100%;height:40px;"
          type="primary"
          :disabled="isDisabled"
          v-if="fileData.files && fileData.files.length != 0 && currIndex != 0"
          @click="currIndex--"
          >上一页</van-button
        >
        <van-button style="width:100%;height:40px;" type="info" @click="$router.back()">返回首页</van-button>
        <van-button
          style="width:100%;height:40px;"
          type="primary"
          :disabled="isDisabled"
          v-if="fileData.files && fileData.files.length != 0 && currIndex !== fileData.files.length - 1"
          @click="currIndex++"
          >下一页</van-button
        >
      </div>
    </footbar>
  </div>
</template>

<script>
import Footbar from '@/components/Footbar'
export default {
  data() {
    return {
      isDisabled: true,
      fileData: { files: [] },
      currIndex: 0
    }
  },
  watch: {
    currIndex() {
      this.isDisabled = true
      setTimeout(() => {
        if (this.isDisabled) {
          this.isDisabled = false
        }
      }, 5000)
    }
  },
  methods: {
    callBtnEnabled() {
      this.isDisabled = false
    }
  },
  components: {
    Footbar
  },
  mounted() {
    this.fileData = this.$vuet.store.home.fileData
    if (!this.fileData || !this.fileData.files) {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
.image-view-container {
  height: 100vh;
  overflow: hidden;
  background: #fff;
  .van-field__body {
    height: 30px;
  }
  .no_disabled_style * {
    color: #323233 !important;
  }
  .van-field .van-cell__title {
    max-width: 50px;
    line-height: 30px;
    text-align: center;
  }
  .van-cell:not(:last-child)::after {
    display: none;
  }
  // .van-row {
  //   .info-row:not(last-child) {
  //     border-right-width: 1px;
  //     border-right-style: dashed;
  //     border-right-color: rgba(0, 0, 0, 0.1);
  //   }
  // }
}
</style>
