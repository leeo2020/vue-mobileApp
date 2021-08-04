<template>
  <div class="lx-goodItem">
      <van-img src="//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/125129/23/15666/585032/5f90128aE7954e7a4/4bdd982507698f0c.jpg!q70.dpg.webp"></van-img>
      div
  </div>
</template>

<script>
import {Grid, GridItem, Image} from 'vant'
export default {
  name: "GoodCate",
  components:{
    [Grid.name]:Grid,
    [GridItem.name]:GridItem,
    [Image.name]: Image
  }
}
</script>

<style scoped>

</style>