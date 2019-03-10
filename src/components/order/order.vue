<template>
  <div class="graybox orderbox">
    <m-header :title="title" v-on:back="_back('user')"></m-header>
    <div class="orderScrollWrp" v-if="show">
      <cube-scroll ref="scroll" v-if="orderList.length">
        <ul>
          <li v-for="item in orderList">
            <h2 v-text='item.time'></h2>
            <div class="iteminfo">
              <p v-text='"订单号：" + item.id'></p>
              <p v-text='"品牌型号：" + item.model' v-if="item.model"></p>
              <p v-text="'品牌型号：暂无'" v-else></p>
              <p v-text='"故障：" + item.problem' v-if="item.problem"></p>
              <p v-text='"故障：暂无"' v-else></p>
              <i class="cube-icon cubeic-arrow"></i>
            </div>
            <span v-text="item.type"></span>
          </li>
        </ul>
      </cube-scroll>
      <div class="noOrder" v-else>
        <i></i>
        <p>暂无订单</p>
      </div>
    </div>
    <cube-loading v-else :size="40" class="loading"></cube-loading>
  </div>
</template>
<script>
import mHeader from 'components/header/header'
import { sdxiu } from 'api/sdxiu'
export default {
  data() {
    return {
      title: '我的订单',
      orderList: [],
      show: false
    }
  },
  created() {
    // 创建实例
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
    sdxiu({
      type: 'order',
      key: 'order'
    }).then(res => {
      console.log(res)
      this.show = true
      this.orderList = res.data
    })
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
.orderbox {
  .orderScrollWrp {
    position: absolute;
    top: 80/@rem;
    bottom: 0;
    width: 100%;
    height: auto;
    .noOrder {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        display: block;
        background: url('https://mfix.suddenfix.com/static/m_fix/img/phone/icon/noorder.png') 100% 100%;
        width: 357/3/@rem;
        height: 438/3/@rem;
        background-size: 100% 100%;
        margin-bottom: 20/@rem;
      }
      p {
        font-size: 30/@rem;
        color: #333
      }
    }
    ul {
      padding: 20/@rem 0;
      li {
        margin-bottom: 20/@rem;
        background: #fff;
        padding: 10/@rem 0;
        box-sizing: border-box;
        position: relative;
        &:last-child {
          margin-bottom: 0
        }
        h2,
        span {
          display: block;
          font-size: 24/@rem;
          color: @blue;
          padding: 10/@rem 20/@rem;
          box-sizing: border-box;
        }
        span {
          border-top: 2/@rem solid #d4d4d4;
          padding-top: 20/@rem;
        }
        .iteminfo {
          position: relative;
          padding: 20/@rem;
          box-sizing: border-box;
          padding-right: 70/@rem;
          p {
            font-size: 28/@rem;
            line-height: 1.4
          }
        }
        .cube-icon {
          position: absolute;
          right: 30/@rem;
          top: 50%;
          transform: translate(0, -50%);
          font-size: 40/@rem;
          color: @blue
        }
      }
    }
  }
}

</style>
