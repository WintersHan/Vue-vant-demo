<template>
  <div style="width: 100%;text-align: center;">
    <img
      :src="imgUrl"
      alt=""
      style="width: 60%;margin-top: 50px"
    >
  </div>
</template>

<script>

export default {
  name: 'VIcon',
  data () {
    return {
      imgUrl: require('../../assests/images/findDoctor/nodata.png')
    };
  },
  methods: {

  }
};
</script>
<style lang="less" scoped="scoped">
	img{
		width: 60%;
	}
</style>
