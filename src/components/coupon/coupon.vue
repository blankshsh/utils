<template>
  <div class="graybox couponbox">
    <m-header :title="title" v-on:back="_back('user')"></m-header>
    <div class="couponScrollWrp">
      <div class="noCoupon" v-if="!couponList.length">
        <p>暂无红包</p>
      </div>
    </div>
  </div>
</template>
<script>
import mHeader from 'components/header/header'

export default {
  data() {
    return {
      title: '我的红包',
      couponList: []
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
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.couponScrollWrp {
  position: absolute;
  top: 80/@rem;
  height: auto;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
