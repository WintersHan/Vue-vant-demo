<template>
  <div id="app">
    <transition-view />
  </div>
</template>

<script>
import TransitionView from '@/components/TransitionView';
import { handleIosInput } from '@/utils';

export default {
  components: {
    TransitionView
  },
  mounted () {
    // ios input
    handleIosInput();
  },
  methods: {
  }
};
</script>

<style lang="less">
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';

* {
  margin: 0;
  padding: 0;
}
*:not(i) {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  color: #666;
  height: 100vh;
  background: #fff;
}
.grey{
  color: #ccc;
  font-weight: 400;
}
</style>
