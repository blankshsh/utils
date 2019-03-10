<template>
  <div class="header">
    <i class="cubeic-back" @click='back' v-if="hasBack"></i>
    <p :title='title' class="title">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    hasBack: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {}
  },
  created() {
    // 创建实例
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
  },
  methods: {
    // 函数
    back: function() {
      this.$emit('back', 'back')
    }
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.header {
  height: 80/@rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 2/@rem solid #eee;
  box-sizing: border-box;
  .cubeic-back {
    font-size: 0.48rem;
    position: absolute;
    left: 0.2rem;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 100;
    color: @blue
  }
  .title {
    width: 100%;
    font-size: .32rem;
    line-height: 1.2;
    color: @blue;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
