<template>
  <v-page
    class="ziboWx"
  >
    <router-view />
    <tabBar />
  </v-page>
</template>

<script>
import VPage from '@/components/VPage/index';
import tabBar from '@/views/Home/tabBar/index';
export default {
  name: 'FindDoctor',
  components: {
    VPage,
    tabBar

  },
  data () {
    return {
      active: 0
    };
  },
  computed: {

  },
  mounted () {
  },
  methods: {

  }
};
</script>

<style lang="less" >

</style>
