<template>
  <van-empty
    :description="title"
    :image="wxIcon"
  />
</template>

<script>
export default {
  name: '',
  data () {
    return {
      title: '服务正在调试,敬请期待',
      wxIcon: require('@/assests/images/error.png')
    };
  }
};
</script>
<style lang="less" scoped="scoped">
	.van-empty{
		padding-top: 100px;
	}
</style>
