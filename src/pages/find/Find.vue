<template>
  <div class="lx-find">
    <van-nav-bar title="发现好物" left-text="返回" @click-left="goBack" left-arrow>
        <template #right>
          <van-icon name="search" size="18"/>
        </template>
    </van-nav-bar>
    <div class="lx-left">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="item in cates" :key="item.id" :title="item.cate_zh"/>
      </van-sidebar>
      <!-- <Menu :lists="menuList" /> -->
    </div>
    <div class="lx-right">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="item in goodObj[activeKey]" :key="item._id" :text="item.desc"
                       @click="skipToDetail(item._id)">
          <van-image :src="$img.imgBaseUrl+item.img"/>
          <div v-text="item.name" class="lx-goodname"></div>
        </van-grid-item>
      </van-grid>
    </div>
    <TarBar></TarBar>
  </div>
</template>

<script>
import {TarBar} from '@/components/'
import {Grid, GridItem, Image, Sidebar, SidebarItem,NavBar,
  Icon,} from 'vant'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  components: {
    TarBar,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [NavBar.name]:NavBar,
    [Icon.name]:Icon,
  }, data: function () {
    return {
      activeKey: 0,
      cates: [],
      size: 10,
      page: 1,
      cate: '',
      hot: false,
      goodList: [],
      total: 0,
      cateArr: [
        {id: 1, cate: 'a', cate_zh: '手机数码'},
        {id: 2, cate: 'a', cate_zh: '手机数码'},
        {id: 3, cate: 'a', cate_zh: '手机数码'},
        {id: 4, cate: 'a', cate_zh: '手机数码'},
        {id: 5, cate: 'a', cate_zh: '手机数码'},
        {id: 6, cate: 'a', cate_zh: '手机数码'},
        {id: 7, cate: 'a', cate_zh: '手机数码'},
        {id: 8, cate: 'a', cate_zh: '手机数码'},
        {id: 9, cate: 'a', cate_zh: '手机数码'},
        {id: 10, cate: 'a', cate_zh: '手机数码'},
        {id: 11, cate: 'a', cate_zh: '手机数码'},
        {id: 12, cate: 'a', cate_zh: '手机数码'},
        {id: 13, cate: 'a', cate_zh: '手机数码'},
      ],
      menuList:[
        {id: 1, cate: 'a', cate_zh: '手机数码',children:[
          {id: 11, cate: 'a', cate_zh: '华为'}
        ]},
        {id: 2, cate: 'a', cate_zh: '手机数码'},]
    }
  }, computed: {
    ...mapState('cate', ['goodObj'])
  }, watch: {
    activeKey: function () {
      let arr = this.goodObj[this.activeKey]
      if (!(arr && arr.length > 0)) {
        this.init()
      }
    }
  },
  methods: {
    ...mapActions('cate', ['fetchList']),
    ...mapMutations('cate', ['clearGoodObj']),
    async init() {
      //得到所有cate
      this.$api.fetchAllCates().then(res => {
        this.cates = res.list
        //get到品类商品
        let params = {
          page: this.page,
          size: this.size,
          cate: this.cates[this.activeKey].cate,
          hot: false,
          index: this.activeKey
        }
        this.fetchList(params)
      })
    },
    skipToDetail(id) {
      console.log(id)
      this.$router.history.push('/detail/' + id)
    },
    goBack(){
      this.$router.go(-1)
    }
  }, mounted() {
    this.init()
  },
  beforeDestroy() {
    this.clearGoodObj()
  }
}
</script>

<style lang="scss" scoped>
.lx-find {
  .lx-left {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2.667rem;
    font-size: 0.4rem;
    overflow: auto;

    .van-sidebar {
      width: 100%;
      height: 100%;

      .van-sidebar-item {
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0;
        background-color: #f8f8f8;
        color: indianred;
      }
    }
  }

  .lx-right {
    position: absolute;
    width: 7.333rem;
    left: 2.667rem;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;

    .lx-goodname {
      font-size: 0.4rem;
    }
  }
}
</style>>