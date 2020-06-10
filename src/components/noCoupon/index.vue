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
      title: '',
      wxIcon: require('@/assests/images/noCoupon.png')
    };
  }
};
</script>
<style lang="less" >
	.van-empty{
		padding-top: 100px;
       .van-empty__image{
         width: 60%;
         margin: 0 20%;
         height: auto;
       }
	}
</style>
