<template>
  <div class="lx-home">
    <!--顶部消息框-->
    <div class="lx-tip">
      <van-notice-bar
          :autoplay="5000"
          :scrollable="true"
          left-icon="volume-o"
          text="双12，京东好物全场一折，欢迎选购！"
      />
    </div>
    <!--搜索栏-->
    <div class="lx-search">
      <van-search
          shape="round"
          background="#ff4240"
          disabled
          show-action
          :placeholder="holdTxt"
      >
        <template #action>
          <div class="login" @touchstart="login">登陆</div>
        </template>
      </van-search>
    </div>
    <!--轮播图-->
    <div class="lx-swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index" class="lx-swiper-item">
          <img v-lazy="image.src"/>
        </van-swipe-item>
      </van-swipe>

    </div> <!--商品列表图示-->
    <div class="lx-goods">
      <!--推荐图提示-->
      <div class="lx-recommend">
        <van-image
            src="//img12.360buyimg.com/img/s750x70_jfs/t1/124583/37/16524/12470/5f9bc181E48c91215/cac00c52cb0b2fa4.png"
            width="100%"
            height="0.933rem"
        ></van-image>
      </div>
      <!--商品列表-->
      <div class="lx-list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              :immediate-check='false'
              finished-text="没有更多了"
          >
            <van-cell v-for="item in length" :key="item" class="lx-cell">
              <GoodItem :good="goodArr[2*item-2]"></GoodItem>
              <GoodItem :good="goodArr[2*item-1]"></GoodItem>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>

    <!--底部按钮-->
    <TarBar></TarBar>
  </div>
</template>

<script>
import {TarBar,GoodItem} from '@/components/'
import {Search, NoticeBar, Swipe, SwipeItem, Image, List, PullRefresh, Cell} from 'vant'

export default {
  components: {
    TarBar,GoodItem,
    [Search.name]: Search,
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell
  }, data: function () {
    return {
      placeTxt: [
        {id: 1, text: '自动麻将机'},
        {id: 2, text: '格兰仕空调'},
        {id: 3, text: '小米手机'},
        {id: 4, text: '哈雷机车'}
      ],
      images: [
        {
          id: 1,
          src: '//imgcps.jd.com/ling4/100008348530/5pyJ5rCn5YGl6Lqr/5pyJ5rCn5a6k5YaF5a6k5aSW5pm66IO95YGl6Lqr/p-5d91a4f642dd5b7c7d52cbbd/18b27099/cr/s1125x690/q70.jpg'
        },
        {
          id: 2,
          src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/140769/39/5942/100174/5f3e702cE3557e661/878c69028abb6384.jpg!cr_1125x445_0_171!q70.jpg.dpg'
        },
        {
          id: 3,
          src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/139252/6/13093/165885/5fa119b3Ee33c98ec/eeb7feca847ad5e8.jpg!q70.jpg.dpg'
        },
        {
          id: 4,
          src: '//imgcps.jd.com/ling4/100008348530/5pyJ5rCn5YGl6Lqr/5pyJ5rCn5a6k5YaF5a6k5aSW5pm66IO95YGl6Lqr/p-5d91a4f642dd5b7c7d52cbbd/18b27099/cr/s1125x690/q70.jpg'
        }
      ],
      list: 0,
      loading: false,
      finished: false,
      refreshing: false,
      page:1,
      total:0,
      goodArr:[],
    }
  }, computed: {
    holdTxt() {
      return this.placeTxt[Math.floor(Math.random() * this.placeTxt.length)].text
    },
    length:function(){
      return Math.floor(this.goodArr.length/2)
    },
  },
  mounted(){
    this.getGoodList()
  },
  methods: {
    //得到商品列表
    getGoodList(){
      let params={
        page:this.page,
        size:10,
        hot:false
      }
      this.$api.fetchGoodList(params).then(res=>{
        this.total=res.total
        if(this.page===1){
          this.goodArr=res.list
          this.finished=false
          this.loading=false
          this.refreshing=false
        }else{
          this.goodArr=[...this.goodArr,...res.list]
          this.loading=false
        }
      })
    },
    //跳转登陆页面
    login() {
      this.$router.push('/login')
    },
    //触底更新
    onLoad() {
        if(this.goodArr.length<this.total){
            this.loading = false;
            this.page++
            this.getGoodList()
        }else{
          this.finished=true
        }
    },
    onRefresh() {
      this.page=1;
      this.getGoodList()
      this.loading = false
      this.finished=false
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  color: #ffffff;
}

.lx-swiper {
  width: 100%;
  height: 3.333rem;

  .lx-swiper-item {
    width: 100%;
    height: 3.333rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.lx-goods {
  padding: 0.2rem 0;
  .lx-cell>div {
    display: flex;
    &>div{
      flex:1;
    }
  }
}
</style>