<template>
  <div class="left-layout">
    <ul>
        <li v-for="(item ,index) in menuList" :key="index+'f'" @click="fselect(index)">
        <p class="level-0">{{item.cate_zh}}</p>
        <ul v-show="index===currentIndex" class="font-indent" >
          <li v-for="(el,idx) in item.children" :key="idx+'k'" @click="kselect(el)">
             <p class="level-1">{{el.cate_zh}}</p>
          </li>
        </ul>
        </li>
      </ul>
  </div>
</template>

<script>
import { Sidebar, SidebarItem} from 'vant'
export default {
  components:{
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
  },
  props:{
    lists1:{
    type:Array,
    default:()=>[]
    }
  },data(){
    return{
      currentIndex:0,
       menuList:[
        {id: 1, cate: 'a', cate_zh: '手机数码',children:[
          {id: 11, cate: 'a', cate_zh: '华为'},
          {id: 12, cate: 'a', cate_zh: '爱立信'},
          {id: 13, cate: 'a', cate_zh: '摩托罗拉'}
        ]},
        {id: 2, cate: 'a', cate_zh: '美妆衣服',children:[
          {id: 11, cate: 'a', cate_zh: '路易威登'},
          {id: 12, cate: 'a', cate_zh: '蒂凡尼'},
          {id: 13, cate: 'a', cate_zh: '巴黎春天'}
        ]}]
    }
  },methods:{
    fselect(index){
      this.currentIndex=index
      console.log(index)
    },
     kselect(item,e){
      window.event? window.event.cancelBubble = true : e.stopPropagation();
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.left-layout{
  width: 25%;
  font-size:14px;
  text-align: left;
  .level-0{
    font-weight: 800;
  }
  .level-1{
    font-weight: 400;
  }
  .font-indent{
    text-indent: 10px;
  }
}
</style>