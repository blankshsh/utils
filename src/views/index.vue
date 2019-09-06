<style scoped lang="less">
.index {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<template>
  <div class="index">
    <div>
      <Button type="primary"
              @click="jump('pic')">pic</Button>
      <Button type="primary"
              @click="jump('drag')">drag</Button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      src: '',
      alt: '',
      list: ['11', '222']
    };
  },
  created () {
    window._this = this
  },
  methods: {
    add () {

    },
    jump (name) {
      this.$router.push({ name: name, params: { legal: true } })
    }
  }
};
</script>