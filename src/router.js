import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
  import ('@/pages/home/Home.vue')
const Find = () =>
  import ('@/pages/find/Find.vue')
const User = () =>
  import ('@/pages/user/User.vue')
const Regist = () =>
  import ('@/pages/user/Regist.vue')
const Login = () =>
  import ('@/pages/user/Login.vue')
const Cart = () =>
  import ('@/pages/cart/Cart.vue')
const Detail = () =>
  import ('@/pages/cart/Detail')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [{
      path: '/',
      text: '主页',
      component: Home
    }, {
      path: '/find',
      text: '分类',
      component: Find
    }, {
      path: '/cart',
      text: '购物车',
      component: Cart
    }, {
      path: '/user',
      text: '用户中心',
      component: User
    }, {
      path: '/detail/:id',
      component: Detail,
      text: '商品详情'
    }, {
      path: '/login',
      component: Login,
      text: '登陆'
    }, {
      path: '/regist',
      component: Regist,
      text: '注册'
    },
    {
      path: '/menu',
      text: '多级菜单',
      component: () =>
        import ('@/components/common/Menu.vue')
    }, {
      path: '/*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const pageArr = ['/cart', '/user']
  if (pageArr.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router