<template>
  <div class="lx-tarbar">
    <van-tabbar  v-model="active" active-color='#ff4240' router safe-area-inset-bottom>
        <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/find" icon="search">分类</van-tabbar-item>
        <van-tabbar-item to="/cart" icon="friends-o" badge="5">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o" :to="isLogin?'/user':'/login'">{{isLogin?'我的':'请登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data:function(){
    return {
      active:0,
      isLogin:false
    }
  },
  mounted(){
    this.isLogin=localStorage.getItem('token')
  },
  actived(){
    this.isLogin=localStorage.getItem('token')
    }
}
</script>

<style lang="scss" scoped>
</style>