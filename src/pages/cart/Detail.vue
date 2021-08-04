<template>
  <div class="lx-detail">
    <div v-text="good.name" class="name"></div>
    <div class="img" >
      <van-image :src="$img.imgBaseUrl+good.img"></van-image>
    </div>
    <div class="price">￥<span v-text="good.price"></span></div>

    <van-goods-action class="lx-box">
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5"/>
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buy"/>
    </van-goods-action>
  </div>
</template>

<script>
import {Image, GoodsAction, GoodsActionIcon, GoodsActionButton, Col, Row, Toast} from 'vant'

export default {
  name: "Detail",
  components: {
    [Image.name]: Image,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [Col.name]: Col,
    [Row.name]: Row
  },
  data: function () {
    return {
      good: {},
      timer:null
    }
  },
  mounted() {
    let params = {}
    params.id = this.$route.params.id
    this.$api.fetchGoodInfo(params).then(res => {
      this.good = res
      console.log(res)
      params = {}
    })
  },
  beforeDestroy() {
    this.timer=null
  },
  methods: {
    addToCart() {
      let data = {
        good_id: this.good._id,
        num: 1
      }
      let token = localStorage.getItem('token')
      if (token) {
        console.log(token, data)
        this.$api.fetchAddCart(data).then(() => {
          setTimeout(() => {
            this.$router.push('/cart')
          }, 1500)
        })
      }
    }, buy() {
      let str =";"+this.$route.params.id
      this.$api.fetchOrder({goods: str}).then(() => {
        Toast('下单成功！')
        this.timer=setTimeout(()=>{
          this.$router.push('/cart')
        },2500)

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lx-detail {
  .name{
    font-size: .53rem;
    text-align: center;
  }
  .img {
    &>img{
      display:block;
      width: 90%;
      margin: 0.27rem auto;
      height: 9.33rem;
    }
  }
  .van-goods-action-icon{
    display:inline-block;
  }
  .van-goods-action-button{
    display:inline-block;
  }
}
</style>