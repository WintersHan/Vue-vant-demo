<template>
  <div class="tabBar">
    <van-tabbar
      v-model="active"
      class="active_tab"
    >
      <van-tabbar-item
        v-for="(item,index) in tabbars"
        :key="index"
        @click="tab(index,item.name)"
      >
        <span :class="currIndex == index ? active:''">{{ item.title }}</span>
        <template
          slot="icon"
          slot-scope="props"
        >
          <img :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>

export default {
  name: 'TabBar',

  data () {
    return {
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: 'homeIndex',
          title: '首页',
          normal: require('../../../assests/images/home/home.png'),
          active: require('../../../assests/images/home/home_ac.png')
        },
        {
          name: 'onlineAsk',
          title: '线上问诊',
          normal: require('../../../assests/images/home/message.png'),
          active: require('../../../assests/images/home/message_ac.png')
        },
        {
          name: 'healthService',
          title: '健康服务',
          normal: require('../../../assests/images/home/service.png'),
          active: require('../../../assests/images/home/service_ac.png')
        },
        {
          name: 'mine',
          title: '个人中心',
          normal: require('../../../assests/images/home/mine.png'),
          active: require('../../../assests/images/home/mine_ac.png')
        }
      ]
    };
  },
  created () {
    this.$router.push('homeIndex');
  },
  methods: {
    tab (index, val) {
      this.currIndex = index;
      this.$router.push(val);
    }
  }

};
</script>

<style lang="less" >
  .active_tab img {
    width: 26px;
    height: 26px;
  }

  .van-tabbar-item--active {
    color: #38C1A9;
  }
</style>
