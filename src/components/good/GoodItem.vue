<template>
  <div class="lx-goodItem" @click="skipToDetail(good._id)">
      <van-image :src="$img.imgBaseUrl+good.img" alt="good.name"></van-image>
      <div v-text="good.desc"></div>
      <div class="lx-price">￥{{good.price}}</div>
  </div>
</template>
<script>
import {Image} from 'vant'
export default {
  name: "GoodItem",
  components:{
    [Image.name]: Image
  },
  props:{
    good:{
      type:Object,
      required:false,
      default:function(){
        return {}
      }
    }
  },
  methods:{
    skipToDetail(id){
      this.$router.history.push('/detail/'+id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .lx-goodItem{
    font-size: .37rem;
    padding: .13rem .2rem;
    background-color: white;
    margin: 0 .13rem;
    border-radius: .13rem;
    img{
      display: block;
      width: 100%;
      height: 3.73rem;
      margin: 0 auto;
    }
    div{
      font-size: 0.4rem;
    }
    div.lx-price{
      color:#ff4240;
    }
  }
</style>