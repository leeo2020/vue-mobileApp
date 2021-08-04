@vue/cli
```bash
vue create vue-webapp
```
click事件ain改为touchstart事件


//用户中心logout事件
//goback 路由守卫

debug
//1. checkbox单选
//2. find mutations无变化

### 1. 路由安装
```bash
npm install vue-router
```
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue use(VueRouter)
const router =new VueRouter({
mode:'hash',
routes:[{
id:1,
path:'/',
comonent:Home
}]
})
```