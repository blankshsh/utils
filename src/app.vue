<template>
  <div id="app" @touchmove.prevent>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab></tab>
  </div>
</template>
<script>
import Tab from 'components/tab/tab'
export default {
  components: {
    Tab
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/flex";
.hide {
  display: none !important;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  span {
    margin: 0;
  }
}

input[type="radio"] {
  width: 0;
  height: 0;
  opacity: 0;
  background: transparent;
}

</style>
