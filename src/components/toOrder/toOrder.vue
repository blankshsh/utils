<template>
  <div class="graybox getOrder">
    <m-header :title="title" v-on:back="_back('fix')"></m-header>
    <cube-scroll v-if="show">
      <div class="content">
        <div class="planbox">
          <h1>维修方案</h1>
          <ul>
            <li v-for="(item,index) in planData" v-if="index <= showIndex">
              <div class="info">
                <p v-text="item.planname"></p>
                <p v-text="'保修期：'+ item.warrantydescription"></p>
              </div>
              <div class="price">
                <p v-text="'￥'+ item.planprice"></p>
                <p v-if="item.planprice !== '(待定)'">
                  官方价<span v-text="'￥'+ item.officialprice"></span>
                </p>
              </div>
            </li>
          </ul>
          <div class="showAllPlan" :class="{'active' : AllPlan}" v-if="planData.length>1" @click="showAllPlan()">
            <p>其他可能方案</p>
            <i class="cube-icon cubeic-arrow"></i>
          </div>
        </div>
        <div class="orderinfo">
          <p v-text="'维修设备：' + strmodel"></p>
          <p v-text="'故障：' + mals"></p>
          <span>具体方案以工程师检测为准</span>
          <span>若需邮寄发票，需自行承担邮费</span>
        </div>
        <form class="formbox" v-on:submit.prevent="onSubmit">
          <ul>
            <li>
              <input type="text" name="customername" placeholder="姓名" v-model='formData.customername' v-on:blur="blur">
            </li>
            <li>
              <input type="text" name="customermobilenum" placeholder="手机号" v-model='formData.customermobilenum'>
            </li>
            <li class="getcodebox">
              <input type="text" name="vcode" placeholder="验证码" v-model='formData.vcode'>
              <span class="getcode" :class="{disabled : disabled}" v-text="getcodetext" @click="getcode"></span>
            </li>
            <li class="selectbox">
              <select id="province" ref="province" @change="province" v-model="formData.province">
                <option v-for="(item,index) in provinceData" v-text="item.name" :value="item.name"></option>
              </select>
              <select id="city" ref="city" @change="city" v-model="formData.city">
                <option v-for="item in cityData" v-text="item.name" :value="item.name"></option>
              </select>
              <select id="district" ref="district" @change="district" v-model="formData.district">
                <option v-for="item in districtData" v-text="item.name" :value="item.name"></option>
              </select>
            </li>
            <li class="addressbox">
              <input type="text" name="address" placeholder="详细地址" v-model='formData.address' ref="address">
              <div class="GPSicon" @click="_getGps('btn')">
                <i></i>
              </div>
            </li>
            <li class="GPSloadingText">
              <p v-text="GPSloadingText"></p>
            </li>
            <li class="submitbox">
              <input type="submit" id="submit" value="提交订单" class="submit">
            </li>
          </ul>
        </form>
      </div>
    </cube-scroll>
    <cube-loading v-else :size="40" class="loading"></cube-loading>
  </div>
</template>
<script>
import { sdxiu, getGps, _getAmap } from 'api/sdxiu'
import AMap from 'AMap';
import mHeader from 'components/header/header'
export default {
  data() {
    return {
      title: '订单信息',
      showIndex: 0,
      planData: [],
      strmodel: '',
      mals: '',
      AllPlan: false,
      getcodetext: '获取验证码',
      disabled: false,
      formData: {
        province: '-请选择-',
        city: '-请选择-',
        district: '-请选择-'
      },
      option: [{ name: '-请选择-' }],
      provinceData: [{ name: '-请选择-' }],
      cityData: [{ name: '-请选择-' }],
      districtData: [{ name: '-请选择-' }],
      GPSloading: false,
      GPSloadingText: '打开GPS定位功能以获取更精准位置',
      show: false
    }
  },
  created() {},
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
    if (!this.$store.state.orderinfo) {
      this.$router.push({ path: '/fix' })
    } else {
      sdxiu({
        type: 'Fix',
        key: 'fixInfo',
        data: this.$store.state.orderinfo
      }).then(res => {
        this.show = true
        this._getGps()
        if (res.status = "success") {
          this.planData = res.data[0].planlist
          this.strmodel = res.data[0].strmodel
          this.mals = res.data[0].mals
          console.log(this)
        }
      })
    }
  },
  methods: {
    // 函数
    blur: function() {
      console.log(this.$refs.province.value)
    },
    _getGps: function(type) {
      var that = this
      if (that.GPSloading) {
        return
      }
      that.GPSloading = true
      var GPSloadingText = '定位中'
      var i = 1
      var text = '...'
      var z = setInterval(() => {
        this.GPSloadingText = GPSloadingText + text.substring(0, i)
        i = i + 1
        if (i === 4) { i = 1 }
      }, 1000)
      try {
        var map = new AMap.Map('');
        map.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 5000 //超过10秒后停止定位，默认：无穷大
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
          AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
        });
      } catch (e) {
        console.log(e)
        clearInterval(z)
        that.GPSloadingText = '定位失败'
        getProvince()
      }

      function getProvince() {
        _getAmap('中国').then(res => {
          console.log(res)
          if (res.data.status === '1') {
            that.provinceData = [...that.option, ...res.data.districts[0].districts]
          }
        })
      }

      function onComplete(res) {
        console.log(res)
        if (res.info === "SUCCESS") {
          var $location = res.position.lng + ',' + res.position.lat
          getGps($location).then(res => {
            console.log(res)
            if (res.data.status === '1') {
              if (type === 'btn') {
                that._Toast('success', '定位成功', 1000)
              }
              clearInterval(z)
              that.GPSloadingText = '定位成功'
              that.GPSloading = false
              let $res = res.data.regeocode.addressComponent
              let $country = $res.country
              let $province = $res.province
              let $city = $res.city
              let $district = $res.district
              let $region = [$province, $city, $district]
              //截取除省市区外所需要的地址信息
              let $pcd = $province + $city + $district
              let $address = res.data.regeocode.formatted_address.substr($pcd.length)
              that.$refs.address.value = $address
              that.formData.address = $address
              setSelect($region)
            }
          })
        }
      }

      function setSelect(data) {
        var $provinceData = that.provinceData
        $provinceData.forEach(function(item, index) {
          if (item.name === data[0]) {
            that.$refs.province.options[index].selected = true
          }
        })
        _getAmap('中国').then(res => {
          if (res.data.status === '1') {
            var $provinceData = that.provinceData = [...that.option, ...res.data.districts[0].districts]
            setTimeout(() => {
              $provinceData.forEach(function(item, index) {
                if (item.name === data[0]) {
                  that.$refs.province.options[index].selected = true
                }
              })
            }, 200)
          }
        })
        _getAmap(data[0]).then(res => {
          if (res.data.status === '1') {
            var $cityData = that.cityData = [...that.option, ...res.data.districts[0].districts]
            setTimeout(() => {
              $cityData.forEach(function(item, index) {
                if (item.name === data[1]) {
                  that.$refs.city.options[index].selected = true
                }
              })
            }, 200)
          }
        })
        _getAmap(data[1]).then(res => {
          if (res.data.status === '1') {
            var $districtData = that.districtData = [...that.option, ...res.data.districts[0].districts]
            setTimeout(() => {
              $districtData.forEach(function(item, index) {
                if (item.name === data[2]) {
                  that.$refs.district.options[index].selected = true
                }
              })
            }, 200)
          }
        })
        that.formData.province = data[0]
        that.formData.city = data[1]
        that.formData.district = data[2]
      }

      function onError(data) {
        that._Toast('error', '定位失败')
        clearInterval(z)
        that.GPSloadingText = '定位失败'
        getProvince()
      }
    },
    showAllPlan: function() {
      if (this.AllPlan) {
        this.showIndex = 0
      } else {
        this.showIndex = 99
      }
      this.AllPlan = !this.AllPlan
    },
    getcode: function() {
      var that = this
      if (!this.formData.customermobilenum || this.checkPhoneNum(this.formData.customermobilenum)) {
        that._Toast('error', '请输入正确的手机号')
        return
      }
      if (that.disabled) {
        that._Toast('error', '请勿频繁获取')
        return
      }
      sdxiu({
        type: 'Fix',
        key: 'verificationCode',
        data: this.formData.customermobilenum
      }).then(res => {
        console.log(res)
        if (res.status == "success") {
          that._Toast('success', '获取成功')
          var i = 59
          var t = setInterval(function() {
            that.getcodetext = i-- + 's'
            that.disabled = true
            if (i < 0) {
              clearInterval(t)
              that.disabled = false
              that.getcodetext = '重新获取'
            }
          }, 1000)
        } else if (res.status === 'error') {
          that._Modal(res.msg)
        }
      })
    },
    province: function() {
      if (this.formData.province !== '-请选择-' && this.formData.province) {
        _getAmap(this.formData.province).then(res => {
          console.log(res)
          if (res.data.status === '1') {
            this.cityData = [...this.option, ...res.data.districts[0].districts]
            this.districtData = this.option
            setTimeout(() => {
              this.$refs.city.options[0].selected = true
              this.$refs.district.options[0].selected = true
            }, 200)
          }
        })
      }
    },
    city: function() {
      console.log(this.$refs.city.value)
      if (this.formData.city && this.formData.city !== '-请选择-') {
        _getAmap(this.formData.city).then(res => {
          console.log(res)
          if (res.data.status === '1') {
            this.districtData = [...this.option, ...res.data.districts[0].districts]
            setTimeout(() => {
              this.$refs.district.options[0].selected = true
            }, 200)
          }
        })
      }
    },
    district: function() {

    },
    onSubmit: function(e) {
      console.log(this.formData)
      var that = this
      var $formData = this.formData
      if (!$formData.customername) {
        that._Toast("error", '请输入姓名')
        return
      }
      if (!$formData.customermobilenum || this.checkPhoneNum($formData.customermobilenum)) {
        that._Toast("error", '手机号有误')
        return
      }
      if (!$formData.vcode) {
        that._Toast("error", '请输入验证码')
        return
      }
      if (!$formData.province || !$formData.city || !$formData.district) {
        that._Toast("error", '请选择地址')
        return
      }
      if (!$formData.address) {
        that._Toast("error", '请输入地址')
        return
      }
      this._Modal('模拟提交成功')
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.getOrder {
  .cube-scroll-wrapper {
    position: absolute;
    top: 80/@rem;
    left: 0;
    right: 0;
    bottom: 0;
    width: 750/@rem;
    margin: 0 auto;
    height: auto;
  }
  .content {
    color: #333;
    padding: 0.25rem;
    box-sizing: border-box;
    .planbox {
      background: #fff;
      padding: 0.25rem;
      box-sizing: border-box;
      h1 {
        font-size: 32/@rem;
        color: @blue;
        text-align: center;
        line-height: 1.5
      }
      ul {
        li {
          display: flex;
          justify-content: space-between;
          line-height: 1.2;
          align-items: center;
          margin-bottom: 0.1rem;
          p {
            &:nth-child(1) {
              font-size: 28/@rem;
            }
            &:nth-child(2) {
              font-size: 24/@rem;
            }
          }
          span {
            text-decoration: line-through;
          }
          .info {
            p:first-child {
              line-height: 1.5
            }
          }
          .price {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            p:first-child {
              color: @blue;
            }
          }
          &:first-child {
            padding: 0.2rem 0 0.3rem;
            border-bottom: 2/@rem solid #d4d4d4;
            p {
              font-size: 32/@rem;
              &:last-child {
                font-size: 28/@rem;
                color: #676767
              }
            }
            .price {
              p:first-child {
                font-size: 54/@rem;
              }
            }
          }
        }
      }
      .showAllPlan {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40/@rem;
        margin-top: 20/@rem;
        color: @blue;
        font-size: 28/@rem;
        i {
          margin-left: 10/@rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(90deg);
        }
      }
      .active {
        i {
          transform: rotate(90+180deg)
        }
      }
    }
    .orderinfo {
      margin-top: 20/@rem;
      background: #fff;
      box-sizing: border-box;
      padding: 25/@rem;
      line-height: 1.5;
      padding-bottom: 0;
      p,
      span {
        padding: 10/@rem 0;
        font-size: 28/@rem;
      }
      span {
        display: block;
        color: @blue;
        &:last-child {
          padding-bottom: 30/@rem;
          border-bottom: 2/@rem solid #d4d4d4;
        }
      }
    }
    .formbox {
      background: #fff;
      box-sizing: border-box;
      padding: 25/@rem;
      padding-top: 30/@rem;
      ul {
        padding: 0 20/@rem;
        li {
          margin-bottom: 20/@rem;
          position: relative;
          display: flex;
          justify-content: space-between;
          input {
            width: 100%;
            height: 70/@rem;
            padding: 0.1rem 0.2rem 0.1rem 0.3rem;
            box-sizing: border-box;
            border: 2/@rem solid #d4d4d4;
            font-size: 28/@rem;
            display: flex;
            align-items: center;
          }
          .getcode {
            display: block;
            height: 70/@rem;
            width: 220/@rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: @blue;
            font-size: 28/@rem;
            color: #fff;
          }
          .disabled {
            background: #eee;
            color: #b5b5b5
          }
        }
        .getcodebox {
          input {
            width: 3.6rem;
          }
        }
        .selectbox {
          select {
            appearance: none;
            width: 190/@rem;
            margin-right: 20/@rem;
            height: 70/@rem;
            box-sizing: border-box;
            border-bottom: 2/@rem solid #d4d4d4;
            padding: 0.1rem 0.2rem;
            font-size: 28/@rem;
            text-align: center;
            background: #fff;
            option {
              text-align: center;
              background: #fff;
            }
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .addressbox {
          position: relative;
          input {
            padding-right: 80/@rem;
          }
          .GPSicon {
            position: absolute;
            width: 70/@rem;
            height: 70/@rem;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              height: 40/@rem;
              width: 36/@rem;
              display: block;
              position: relative;
              background: url('https://mfix.suddenfix.com/static/m_fix/img/phone/icon/gps.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .GPSloadingText {
          justify-content: center;
          p {
            text-align: center;
            color: @blue;
            font-size: 28/@rem;
          }
        }
        .submitbox {
          margin: 50/@rem auto;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          input {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.9rem;
            height: 0.75rem;
            border: .04rem solid @blue;
            background: @blue;
            color: #fff;
            font-size: 32/@rem;
            border-radius: 0.05rem;
          }
        }
      }
    }
  }
}

</style>
