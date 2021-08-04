import Vue from 'vue'
import App from './App.vue'

import { Lazyload } from 'vant';
Vue.use(Lazyload)

import router from './router'
import store from './store/'

import api from './utils/api'
Vue.prototype.$api=api
import img from './utils/img'
Vue.prototype.$img=img

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')