<template>
  <div class="tabbox">
    <router-link tag="div" v-for="(item,key) in tabList" class="tab-item" :key="item.class" :to="item.to">
      <i class="icon" :class="item.class"></i>
      <span class="tab-link" v-text="item.title"></span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tabList: [{
        title: '查价下单',
        to: '/fix',
        class: 'fix'
      }, {
        title: '用户中心',
        to: '/user',
        class: 'user'
      }]
    }
  },
  created() {
    // 创建实例
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
  },
  methods: {
    // 函数
  },
  components: {}
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.tabbox {
  position: fixed;
  width: 750/@rem;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120/@rem;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  border-top: 2/@rem solid #eee;
  display: flex;
  .tab-item {
    width: 50%;
    display: flex;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      display: block;
      width: 60/@rem;
      height: 60/@rem;
      margin-bottom: 10/@rem;
    }
    span {
      font-size: 24/@rem;
    }
    .fix {
      background: url('~common/image/fix_gray.png') 100% 100%;
      background-size: 100% 100%;
    }
    .user {
      background: url('~common/image/user_gray.png') 100% 100%;
      background-size: 100% 100%;
    }
    &:first-child {
      border-right: 2/@rem solid #eee;
    }
  }
  .router-link-active {
    .fix {
      background: url('~common/image/fix_blue.png') 100% 100%;
      background-size: 100% 100%;
    }
    .user {
      background: url('~common/image/user_blue.png') 100% 100%;
      background-size: 100% 100%;
    }
    span {
      color: @blue
    }
  }
}

</style>
