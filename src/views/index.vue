<template>
  <div class="app-box">
    <ul class="menu-list">
      <li>
        <div class="item-menu" @click="$router.push('/info-list?type=100')">1、作业标准查看</div>
      </li>
      <li>
        <div class="item-menu" @click="$router.push('/info-list?type=200')">2、病虫草害参考手册</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.app-box {
  height: 100vh;
  width: 100%;
  background: #fff;
  overflow: auto;
  .menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      flex-direction: row;
      height: 50px;
      border-bottom: 1px solid #ececec;
      div {
        font-size: 14px;
        display: inline-block;
        padding: 8px 20px;
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
