<style lang="less">
.dragbox {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

<template>
  <div ref="dragbox"
       class="dragbox">
    <div class="title"
         @mousedown.stop="draging">我是标题</div>
    <div class="content">
      <p>我是内容一堆</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    draging (ev) {
      let ele = this.$refs.dragbox;
      let disX = ev.clientX - ele.offsetLeft;
      let disY = ev.clientY - ele.offsetTop;
      window.onmousemove = e => {
        [ele.style.left, ele.style.top] = [`${e.clientX - disX}px`, `${e.clientY - disY}px`];
      }
      window.onmouseup = () => {
        window.onmouseup = null;
        window.onmousemove = null;
      }
    }
  }
}
</script>
