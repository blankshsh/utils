<template>
  <div class="wrp userbox">
    <m-header :title="title" :hasBack="false"></m-header>
    <cube-scroll ref="scroll" :listenScroll="true" class="scrollWrp">
      <div class="userHeader">
        <img src="https://source1.suddenfix.com/blank/loginicon.svg" alt="">
      </div>
      <ul>
        <li v-for="item in listData" @click="nav(item.nav)">
          <img :src="item.src"></img>
          <p v-text="item.text"></p>
          <i class="cube-icon cubeic-arrow"></i>
        </li>
      </ul>
    </cube-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import mHeader from 'components/header/header'

export default {
  data() {
    return {
      title: '用户中心',
      listData: [{
        src: 'https://source1.suddenfix.com/blank/myorder.svg',
        text: '我的订单',
        nav: 'order'
      }, {
        src: 'https://source1.suddenfix.com/blank/coupon.svg',
        text: '我的红包',
        nav: 'coupon'
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
    nav: function(id) {
      this.$router.push({ path: '/user/' + id })
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.wrp {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.userbox {
  .scrollWrp {
    position: absolute;
    top: 80/@rem;
    bottom: 120/@rem;
    width: 100%;
    height: auto;
    .userHeader {
      width: 100%;
      height: 450/@rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('https://source1.suddenfix.com/blank/userbg.jpg') no-repeat;
      background-size: 100% 100%;
      img {
        width: 180/@rem;
        height: 180/@rem;
        border-radius: 50%;
      }
    }
    ul {
      margin-top: 30/@rem;
      li {
        display: flex;
        height: 100/@rem;
        padding: 0 30/@rem;
        box-sizing: border-box;
        align-items: center;
        background: #fff;
        margin-bottom: 2/@rem;
        position: relative;
        img {
          width: 50/@rem;
          height: 50/@rem;
          background-size: 100% 100%;
        }
        p {
          font-size: 32/@rem;
          margin-left: 15/@rem;
        }
        .cube-icon {
          position: absolute;
          right: 34/@rem;
          top: 50%;
          transform: translate(0, -50%);
          font-size: 32/@rem;
          color: #c3c3c3
        }
      }
    }
  }
}

</style>
