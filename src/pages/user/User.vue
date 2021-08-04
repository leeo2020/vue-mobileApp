<template>
  <div class="lx-user">
    <van-nav-bar title="联系人" left-text="返回" @click-left="goBack" left-arrow>
        <template #right>
          <van-icon name="search" size="18"/>
        </template>
    </van-nav-bar>
    <div class="address">
    <van-row>
      <van-col span="8">
        <p>收货地址</p>
      </van-col>
      <van-col span="16">
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
      </van-col>
    </van-row>
    </div>
    <video-player  class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
    ></video-player>
    <div class="logout">
      <van-button size="mini" type="info" @touchstart="logout">退出登录</van-button>
    </div>

    <TarBar></TarBar>
  </div>
</template>
<script>
import {TarBar} from '@/components/'
import {Col, Row, AddressList, Toast,Button,NavBar,Icon,Dialog} from 'vant'
import {videoPlayer} from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

export default {
  components: {
    TarBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [AddressList.name]: AddressList,
    [Button.name]:Button,
    [NavBar.name]:NavBar,
    [Icon.name]:Icon,
    [Dialog.Component.name]: Dialog.Component,
    videoPlayer
  },
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true
        }
      ],
      disabledList: [],
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',  // 路径
          type: 'video/mp4'  // 类型
        }, {
          src: 'http://vjs.zencdn.net/v/oceans.webm',
          type: 'video/webm'
        }],
        poster: "http://vjs.zencdn.net/v/oceans.png", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true  //全屏按钮
        }
    }

    };
  },
  methods: {
    onAdd() {
      Toast('新增地址');
    },
    onEdit(item, index) {
      Toast('编辑地址:' + index);
    },
    logout(){
      Dialog.confirm({
        title:'确认',
        message:'确认登出'
      }).then(()=>{
        localStorage.setItem('token','')
        this.$router.history.push('/')
      }).catch(()=>{})
    },
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.lx-user{
  h2 {
    font-size: 0.8rem;
  }
  p{
    font-size: 0.5rem;
  }
}

</style>>