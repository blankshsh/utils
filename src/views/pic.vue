<template>
  <view-split>
    <div class="left-content"
         slot="left-view">
      <div style="transform: rotate(0deg)"
           class="base-img-box">
        <img :src="imageList[showIndex].url"
             ref="baseImg">
      </div>
    </div>
    <div slot="right-view"
         ref="rightContent"
         class="right-content">
      <ul>
        <li v-for="(item, index) in imageList"
            :key="index"
            class="imgbox">
          <div style="transform: rotate(0deg)">
            <img :src="item.url"
                 :alt="item.name"
                 ref="imageList">
          </div>
          <div class="imginfo">
            <p>{{item.name}}</p>
          </div>
          <div class="img-drag-box">
            <div @mousedown.stop="imgDrag($event, index)"
                 class="img-drag-mask"></div>
            <div class="img-btn-box">
              <!-- <Icon type="ios-add-circle" /> -->
              <Icon type="ios-undo"
                    @click.native="imgRotate($refs.imageList[index], 90)" />
              <!-- <Icon type="md-eye" @click.native="mStyle($refs.imageList[index].parentNode, 10)"/> -->
              <Icon type="ios-redo"
                    @click.native="imgRotate($refs.imageList[index], -90)" />
              <!-- <Icon type="ios-remove-circle" /> -->
            </div>
          </div>
          <div class="movebox"
               v-show="index === moveIndex"
               ref="movebox">
            <img :src="item.url"
                 :alt="item.name">
            <div class="img-drag-box">
              <div class="img-drag-mask"></div>
              <div class="img-btn-box">
                <Icon type="ios-add-circle" />
                <Icon type="ios-undo" />
                <Icon type="md-eye" />
                <Icon type="ios-redo" />
                <Icon type="ios-remove-circle" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </view-split>
</template>
<script>
import ViewSplit from '../components/viewSplit.vue';
export default {
  name: 'pic',
  components: {
    ViewSplit
  },
  data () {
    return {
      imageList: [
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566818343493&di=3fe38657075947fe3dc4f1bed3b64ff5&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F11a8881842e35c7ff188fbf13f220d5f.jpeg', name: '01.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566818343492&di=6ac93c40c3b09a0e179d50a560578323&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F05%2F20170205203538_FdaP4.jpeg', name: '02.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566818343492&di=95f44dfcf93e4a51d9fb878b82f5d7e1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F05%2F20170205210328_4VCFk.jpeg', name: '03.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566818343492&di=95f44dfcf93e4a51d9fb878b82f5d7e1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F05%2F20170205210328_4VCFk.jpeg', name: '04.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566818343492&di=0613f4c0a7ff2629b2ba5b1dfc2df996&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F05%2F20170205213208_TtEZh.thumb.700_0.jpeg', name: '05.jpg' },
        { url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3315324068,1694602888&fm=26&gp=0.jpg', name: '06.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566818405133&di=0e7fe570d7794de9ff90bd4280c98e64&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F07%2F20160107170247_5GX3k.jpeg', name: '07.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566818405133&di=9542819e54d9b5d53249cfdc1ce430d0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F02%2F20150902134849_J4GWX.jpeg', name: '08.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566818405132&di=cc9aa44a57318c69f626b5f60e17346b&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201407%2F09%2F20140709230429_GGRRE.jpeg', name: '09.jpg' },
      ],
      showIndex: 0,
      show: true,
      moveIndex: null,
    }
  },
  mounted () {
    window._this = this;
  },
  methods: {
    imgRotate (ele, deg) {
      let oldDeg = parseInt(/-?\d{1,3}/.exec(ele.parentNode.style.transform))
      const maxDeg = 359
      const minDeg = -359
      if (oldDeg > maxDeg) {
        oldDeg = 0
      } else if (oldDeg < minDeg) {
        oldDeg = 0
      }
      deg += oldDeg
      this.mStyle(ele.parentNode, deg)
      ele.parentNode.style.transform = 'rotate(' + deg + 'deg)';
    },
    mStyle (ele, deg) {
      let ndeg = deg || parseInt(/-?\d{1,3}/.exec(ele.style.transform))
      let angle = Math.abs(ndeg) / 90
      let w = ele.firstChild.offsetWidth;
      let h = ele.firstChild.offsetHeight;
      if (w > h) {
        if (angle === 1 || angle === 3) {
          ele.style.margin = `0 ${(w - h) / 2 / ele.offsetWidth * 100}%`;
          ele.firstChild.style.left = 0;
        } else {
          ele.style.margin = 0;
          ele.firstChild.style.top = 0
        }
      } else {
        if (angle === 1 || angle === 3) {
          ele.style.margin = `0 ${(h - w) / 2 / ele.offsetHeight * 100}%`;
          ele.firstChild.style.left = 0;
        } else {
          ele.style.margin = 0;
          ele.firstChild.style.top = 0
        }
      }
    },
    draging (event) {
      let ele = this.$refs.leftView
      let drag = event.target || event.srcElement
      let eleWin = parseFloat(ele.style.width)
      let x = event.clientX
      window.onmousemove = e => {
        let cj = e.clientX - x
        let w = eleWin + cj
        if (w >= 270) {
          ele.style.width = w + 'px'
          drag.style.left = w + 'px'
          this.$refs.rightView.style['padding-left'] = w + 30 + 'px'
        }
      }
      window.onmouseup = () => {
        window.onmousemove = null
        window.onmouseup = null
      }
    },
    imgDrag (event, index) {
      if (!this.show) return;
      let ele = this.$refs.imageList[index];
      this.moveIndex = index;
      let disX = event.clientX - ele.offsetLeft;
      let disY = event.clientY - ele.offsetTop;
      window.onmousemove = e => {
        let [l, t] = [e.clientX - disX, e.clientY - disY];
        let $ele = this.$refs.movebox[index];
        $ele.style.left = l + 'px';
        $ele.style.top = t + 'px';
      }
      window.onmouseup = e => {
        let $ele = this.$refs.movebox[index];
        $ele.style.left = 0;
        $ele.style.top = 0;
        this.moveIndex = null;
        if (this.show && e.clientX < Number(this.$refs.rightContent.parentNode.style['padding-left'].replace('px', ''))) {
          this.showIndex = index;
        }
        window.onmouseup = null;
        window.onmousemove = null;
      }
    }
  },
}
</script>
<style lang="less">
img {
  width: 100%;
}
.left-content {
  img {
    z-index: 99;
  }
}
&::-webkit-scrollbar {
  width: 6px;
}
&::-webkit-scrollbar-thumb {
  background: #99a9bf;
  border-radius: 20px;
}
&::-webkit-scrollbar-track-piece {
  background: #f5f5f5;
}
.right-content {
  .imgbox {
    position: relative;
    &:hover {
      .img-drag-box {
        display: block;
      }
    }
    .img-drag-box {
      cursor: move;
      user-select: none;
      text-align: center;
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 9;
      i {
        position: relative;
        font-size: 3em;
        color: #fff;
        cursor: pointer;
        z-index: 21;
      }
      .img-drag-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 20;
      }
    }
    .movebox {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      width: 100%;
      img {
        z-index: 100;
      }
      .img-drag-box {
        display: block;
      }
    }
  }
}
</style>

