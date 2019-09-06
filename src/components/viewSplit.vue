<template>
  <div class="view-split">
    <div class="left-view"
         ref="leftView"
         v-show="isShow"
         style="width: 270px">
      <slot name="left-view"></slot>
    </div>
    <div class="split-line"
         ref="splitLine">
      <div class="drag"
           ref="drag"
           @mousedown.stop="draging"
           v-show="isShow"></div>
      <div class="toggle"
           @click="toggle">
        <Icon :type="isShow ? 'md-arrow-dropright' : 'md-arrow-dropleft'" />
      </div>
    </div>
    <div class="right-view"
         ref="rightView">
      <slot name="right-view"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: this.show,
    }
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    }
  },
  mounted () {
    window.that = this;
    let w = (document.querySelector('.view-split'.offsetWidth) || 1000) / 2
    this.$refs.splitLine.style.left = w + 'px'
    this.$refs.leftView.style.width = w + 'px'
    this.$refs.rightView.style['padding-left'] = w + 30 + 'px'
  },
  methods: {
    toggle () {
      if (this.isShow) {
        this.left = Number(this.$refs.splitLine.style.left.replace('px', ''));
        this.$refs.splitLine.style.left = 0;
        this.$refs.rightView.style['padding-left'] = 30 + 'px'
      } else {
        this.$refs.splitLine.style.left = this.left + 'px';
        this.$refs.rightView.style['padding-left'] = this.left + 30 + 'px'
      }
      this.isShow = !this.isShow;
    },
    draging (event) {
      let ele = this.$refs.leftView
      let eleWin = parseFloat(ele.style.width)
      let x = event.clientX
      window.onmousemove = e => {
        let cj = e.clientX - x
        let w = eleWin + cj
        if (w >= 270) {
          ele.style.width = w + 'px'
          this.$refs.splitLine.style.left = w + 'px'
          this.$refs.rightView.style['padding-left'] = w + 30 + 'px'
        }
      }
      window.onmouseup = () => {
        window.onmousemove = null
        window.onmouseup = null
      }
    },
  }
}
</script>
<style lang="less">
.view-split {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .split-line {
    width: 18px;
    position: absolute;
    margin-left: 10px;
    height: 100%;
    left: 290px;
    z-index: 11;
    .drag {
      width: 100%;
      height: 100%;
      &:hover {
        cursor: col-resize;
      }
    }
    .toggle {
      cursor: pointer;
      background: #bbb;
      height: 60px;
      line-height: 60px;
      width: 20px;
      text-align: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 0 5px 5px 0;
      z-index: 12;
      i {
        font-size: 30px;
        margin-left: -5px;
        color: #fff;
      }
    }
  }
  .left-view {
    min-width: 270px;
    position: absolute;
    overflow: auto;
    top: 0;
    bottom: 0;
    padding: 10px;
    z-index: 10;
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
  }

  .right-view {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 10px 0 300px;
    overflow: auto;
  }
}
</style>


