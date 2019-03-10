<template>
  <div class="wrp">
    <m-header :title="title"
      :hasBack='false'></m-header>
    <cube-scroll :options="scrollOptions"
      ref="scroll"
      :listenScroll="true"
      class="scrollWrp"
      v-if='show'>
      <form v-on:submit.prevent="onSubmit">
        <ul class="formbox">
          <li :style='getHeight(0)'
            ref="brand">
            <div class="title">
              <h1>手机品牌</h1>
            </div>
            <ul>
              <li v-for="(item,index) in fixBrandList">
                <label :for="'brand'+item.fixbrand_id"
                  v-text="item.brandname"
                  @click="brand(item.fixbrand_id)"
                  :class="{'active' : formData.fixbrandid === item.fixbrand_id}"></label>
                <input :id="'brand'+item.fixbrand_id"
                  type="radio"
                  name="fixbrandid"
                  :value="item.fixbrand_id"
                  v-model='formData.fixbrandid'>
              </li>
            </ul>
          </li>
          <li :style='getHeight(1)'
            v-if="fixModelList.length"
            ref="model">
            <div class="title">
              <h1>手机型号</h1>
            </div>
            <ul>
              <li v-for="(item,index) in fixModelList">
                <label :for="'model'+item.fixmodel_id"
                  v-text="item.modelname"
                  @click="model(item)"
                  :class="{'active' : formData.fixmodelid === item.fixmodel_id }"></label>
                <input :id="'model'+item.fixmodel_id"
                  type="radio"
                  name="fixmodelid"
                  :value="item.fixmodel_id"
                  v-model='formData.fixmodelid'>
              </li>
            </ul>
          </li>
          <li :style='getHeight(2)'
            v-if="fixOperatorsList.length"
            ref="operators">
            <div class="title">
              <h1>运营商</h1>
            </div>
            <ul>
              <li v-for="(item,index) in fixOperatorsList">
                <label :for="'operators'+item.modeloperatorsid"
                  v-text="item.operatorsname"
                  @click="operators(item.modeloperatorsid)"
                  :class="{'active' : formData.modeloperatorsid === item.modeloperatorsid }"></label>
                <input :id="'operators'+item.modeloperatorsid"
                  type="radio"
                  name="modeloperatorsid"
                  :value="item.modeloperatorsid"
                  v-model='formData.modeloperatorsid'>
              </li>
            </ul>
          </li>
          <li :style='getHeight(3)'
            v-if="fixColorList.length"
            ref="color">
            <div class="title">
              <h1>颜色</h1>
            </div>
            <ul>
              <li v-for="(item,index) in fixColorList">
                <label :for="'color' + item.fixcolor_id"
                  v-text="item.colorname"
                  @click="color(index)"
                  :class="{'active' : formData.modelcolorid === item.modelcolorid }"></label>
                <input :id="'color' + item.fixcolor_id"
                  type="radio"
                  name="modelcolorid"
                  :value="item.modelcolorid"
                  v-model='formData.modelcolorid'>
              </li>
            </ul>
          </li>
          <li :style='getHeight(4)'
            v-if="fixProblemList.length"
            ref="problem">
            <div class="title">
              <h1>选择问题类型</h1>
            </div>
            <ul>
              <li v-for="(item,index) in fixProblemList">
                <label :for="'problem'+item.fixproblem_id"
                  v-text="item.problemname"
                  @click="problem(item)"
                  :class="{'active' : formData.fixproblemid === item.fixproblem_id }"></label>
                <input :id="'problem'+item.fixproblem_id"
                  type="radio"
                  name="fixproblemid"
                  :value="item.fixproblem_id"
                  v-model='formData.fixproblemid'>
              </li>
            </ul>
          </li>
          <li :style='getHeight(5)'
            v-if="fixMalfunctionList.length"
            ref="getfunction">
            <div class="title">
              <h1>选择故障类型</h1>
            </div>
            <ul class="onelist">
              <li v-for="(item,index) in fixMalfunctionList">
                <label :for="item.fixmalfunction_id"
                  v-text="item.malfunctionname"
                  @click="getfunction(item.fixmalfunction_id)"
                  :class="{'active' : fixmalfunctionid === item.fixmalfunction_id }"></label>
                <input :id="item.fixmalfunction_id"
                  type="radio"
                  name="fixmalfunctionid"
                  :value="item.fixmalfunction_id"
                  v-model='formData.fixmalfunctionid'>
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </cube-scroll>
    <cube-loading v-else
      :size="40"
      class="loading"></cube-loading>
    <router-view></router-view>
  </div>
</template>
<script>
import { sdxiu, getGps } from 'api/sdxiu'
import mHeader from 'components/header/header'
import Vue from 'vue'

export default {
  name: 'fix',
  data() {
    return {
      title: '查价下单',
      show: false,
      minHeight: '',
      showlistNum: 0,
      // minHeightList: [],
      datalist: [
        'fixBrandList',
        'fixModelList',
        'fixOperatorsList',
        'fixColorList',
        'fixProblemList',
        'fixMalfunctionList'
      ],
      formlist: [
        'fixbrandid',
        'fixmodelid',
        'modeloperatorsid',
        'modelcolorid',
        'fixproblemid',
        'modelproblemid',
        'modelmalfunctionid',
        'fixmalfunctionid'
      ],
      refsList: [
        'brand',
        'model',
        'operators',
        'color',
        'problem',
        'getfunction'
      ],
      fixBrandList: [],
      fixModelList: [],
      fixOperatorsList: [],
      fixColorList: [],
      fixProblemList: [],
      fixMalfunctionList: [],
      formData: {},
      functionid: -1,
      options: {},
      scrollOptions: {
        pullUpLoad: {
          threshold: 0
        }
      },
      fixmalfunctionid: null
    }
  },
  created() {
    window._this = this
    this.$store.commit('setData', '')
    // this.setHeight(0)
    sdxiu({
      type: 'Fix',
      key: 'fixBrandList'
    }).then(res => {
      console.log(res)
      this.$nextTick(() => {
        this.show = true
        this.fixBrandList = res.data
        this.$nextTick(() => {
          this.minHeight = this.$refs.scroll.$el.offsetHeight
        })
      })
    })
  },
  activated: function() {
    // 只对vue-router的路由生效
  },
  mounted() {},
  computed: {},
  methods: {
    getHeight(i) {
      return i <= this.showlistNum ? '' : 'min-height:' + this.minHeight + 'px'
    },
    // _Scorll(num) {
    //   var that = this
    //   var $minHeight = this.minHeight
    //   var $height = this.height
    //   var $formData = this.formData
    //   var $datalist = this.datalist
    //   var $formlist = this.formlist

    //   for (var i = 0; i < 6; i++) {
    //     this.minHeight = i <= num ? '' :

    //     if (i <= num) {
    //       $minHeight[i] = ''
    //     } else {
    //       $minHeight[i] = 'min-height:' + $height + 'px'
    //     }
    //     if (i > num) {
    //       this[$datalist[i + 1]] = []
    //       if (num === 4) {
    //         $formData[$formlist[6]] = $formData[$formlist[7]] = 0
    //         this.functionid = -1
    //       } else {
    //         $formData[$formlist[i]] = 0
    //       }
    //     }
    //   }
    //   this.minHeight = $minHeight
    //   this.formData = $formData
    //   this.$nextTick(() => {
    //     this.$refs.scroll.refresh()
    //     var $next = this.$refs[this.refsList[num + 1]] || this.$refs[this.refsList[num + 2]]
    //     this.$refs.scroll.scrollTo(0, -$next.offsetTop, 300)
    //   })
    // },
    brand(id) {
      sdxiu({
        type: 'Fix',
        key: 'fixModelList',
        data: { fixbrandid: id }
      }).then(res => {
        this.fixModelList = res.data
        this.showlistNum = 0
        this.scorllItem()
      })
    },
    model: function(item) {
      let key = item.hasOperators ? 'fixOperatorsList' : 'fixColorList'
      sdxiu({
        type: 'Fix',
        key: key,
        data: { fixmodelid: item.fixmodel_id }
      }).then(res => {
        this.fixOperatorsList = []
        this.fixColorList = []
        this[key] = res.data
        this.showlistNum = key === 'fixOperatorsList' ? 1 : 2
        key === 'fixColorList' && (this.formData[this.formlist[2]] = 0)
      })
    },
    operators: function(id) {
      sdxiu({
        type: 'Fix',
        key: 'fixColorList',
        data: { fixmodelid: this.formData.fixmodelid }
      }).then(res => {
        this.fixColorList = res.data        
        this.showlistNum = 2
      })
    },
    color: function() {
      sdxiu({
        type: 'Fix',
        key: 'fixProblemList',
        data: { fixmodelid: this.formData.fixmodelid }
      }).then(res => {
        this.fixProblemList = res.data
        this.showlistNum = 3
      })
    },
    problem: function(item) {
      sdxiu({
        type: 'Fix',
        key: 'fixMalfunctionList',
        data: { fixproblemid: item.fixproblem_id }
      }).then(res => {
        this.formData.modelproblemid = item.modelproblemid
        this.fixMalfunctionList = res.data
        this.showlistNum = 4
      })
    },
    getfunction: function(id) {
      this.fixmalfunctionid = id
      this._Toast('loading', '加载中', 1000)
      this.$store.commit('setData', this.formData)
      setTimeout(() => {
        this.$router.push({ path: '/fix/toOrder' })
      }, 1000)
    },
    scorllItem() {
      for (var i = 0; i < 6; i++) {
        if (i > this.showlistNum) {
          this[this.datalist[i + 1]] = []
          if (this.showlistNum === 4) {
            this.formData[this.formlist[6]] = this.formData[this.formlist[7]] = 0
            this.functionid = -1
          } else {
            this.formData[this.formlist[i]] = 0
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
        var $next = this.$refs[this.refsList[this.showlistNum + 1]] || this.$refs[this.refsList[this.showlistNum + 2]]
        this.$refs.scroll.scrollTo(0, -$next.offsetTop, 300)
      })
    },
  },
  watch: {
    showlistNum() {
      this.scorllItem()
    }
  }, 
  components: {
    mHeader
  }
}
</script>
<style lang="less" rel="stylesheet/less">
@import '~common/less/size.less';
.wrp {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .scrollWrp {
    position: absolute;
    top: 80 / @rem;
    bottom: 120 / @rem;
    width: 100%;
    height: auto;
  }
  .formbox {
    > li {
      box-sizing: border-box;
      padding: 0.25rem;
      margin-bottom: 0.1rem;
      .title {
        padding: 0 0.25rem;
        background: #fff;
      }
      h1 {
        padding: 0.25rem 0.25rem;
        font-size: 0.3rem;
        line-height: 0.6rem;
        font-weight: 400;
        padding-bottom: 0.3rem;
        border-bottom: 0.02rem solid #d4d4d4;
        color: #4dbdc3;
      }

      ul {
        padding: 0 0.25rem;
        display: flex;
        flex-wrap: wrap;
        padding-top: 0.4rem;
        background: #fff;
        li {
          width: 3.15rem;
          height: 0.7rem;
          position: relative;
          margin-right: 0.2rem;
          margin-bottom: 0.4rem; // padding: .2rem;
          &:nth-child(2n) {
            margin-right: 0;
          }
          label {
            border: 0.02rem solid @blue;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: flex;
            padding: 0 0.1rem;
            justify-content: center;
            align-items: center;
            font-size: 0.26rem; // word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .active {
            background: @blue;
            color: #fff;
          }
        }
      }
      .onelist {
        li {
          width: 100%;
          margin-right: 0;
          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}

.cube-pullup-wrapper {
  display: none !important;
}
</style>
