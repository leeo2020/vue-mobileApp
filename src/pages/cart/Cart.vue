<template>
  <div class="lx-cart">
    <div class="lx-top">
      <van-nav-bar title="购物车" left-text="返回" @click-left="goBack" left-arrow>
        <template #right>
          <van-icon name="search" size="18"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="lx-good">
      <van-swipe-cell v-for="item in list" :key="item._id">
        <van-row type="flex" align="center">
          <!--第一列-->
          <van-col span="4">
            <van-checkbox @click="checkOne" v-model="item.checked"></van-checkbox>
          </van-col>
          <!--第二列-->
          <van-col span="20">
            <van-card
                :num="item.num"
                :price="item.good.price"
                :desc="item.good.desc"
                :title="item.good.name"
                class="goods-card"
                :thumb="$img.imgBaseUrl+item.good.img"
            >
              <template #footer>
                <van-button plain type="info" size="mini" @touchstart="updCart(item,'sub')">-</van-button>
                <van-button plain type="info" size="mini" @touchstart="updCart(item,'add')">+</van-button>
              </template>
            </van-card>
          </van-col>
        </van-row>
        <template #right>
          <van-button square text="删除"
                      type="danger"
                      class="delete-button"
                      @touchstart="remove(item)"/>
        </template>
      </van-swipe-cell>
    </div>
    <van-radio-group>
      <TarBar></TarBar>
    </van-radio-group>

    <div class="lx-order">
      <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="fullChecked" @click="checkAll">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送, <span>修改地址</span>
        </template>
      </van-submit-bar>
    </div>

  </div>
</template>

<script>
import {TarBar} from '@/components/'
import {
  NavBar,
  Icon,
  Card,
  RadioGroup,
  Radio,
  SwipeCell,
  Button,
  Col,
  Row,
  Checkbox,
  SubmitBar,
  Toast
} from 'vant'

export default {
  components: {
    TarBar,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
  }, data: function () {
    return {
      fullChecked: false,
      list: [],
      timer: null
    }
  },
  computed: {
    total: function () {
      let t = 0
      this.list.map(elem => {
        if (elem.checked) {
          t += elem.num * elem.good.price
        }
      })
      return t * 100
    }
  },

  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.timer = null
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onSubmit() {
      let str = ''
      this.list.map(elem => {
        if (elem.checked) {
          str += ';' + elem._id
        }
      })
      this.$api.fetchOrder({goods: str}).then(() => {
        Toast('下单成功！')
        this.timer = setTimeout(function () {
          this.init()
        }, 1500)
      })
    },
    //初始查询显示
    init() {
      this.$api.fetchCart({}).then(res => {
        this.list = res
      })
    },
    //删除
    remove(item) {
      let params = {id: item._id}
      this.$api.fetchDelCart(params).then(() => {
        this.init()
      })
    },
    //+_号调整
    updCart(item, flag) {
      let data = {
        id: item._id,
        num: flag === 'sub' ? item.num - 1 : item.num + 1
      }
      if (data.num < 1) {
        return Toast('商品数量不能小于1！')
      } else {
        this.$api.fetchUpdCart(data).then(() => {
          Toast('修改成功')
          this.list.map((elem, index, arr) => {
            if (elem._id === data.id) {
              arr[index].num = data.num
            }
          })
        })
      }
    },
    //checkbox值调整
    checkOne(bol) {
      console.log(bol)
      let arr = this.list.filter(ele=>ele.checked)
      if(arr && arr.length === this.list.length) {
        this.fullChecked = true
      } else {
        this.fullChecked = false
      }
    },
    checkAll() {
      this.list.map((ele,idx,arr)=>{
        arr[idx].checked = this.fullChecked
      })
      this.list = JSON.parse(JSON.stringify(this.list))
    }
  }
}
</script>

<style lang="scss" scoped>
.lx-good {
  .van-swipe-cell {
    width: 100%;

    img {
      width: 100%;
    }

    .van-col {
      box-sizing: border-box;
      padding-left: 0.667rem;
    }
  }
}
</style>