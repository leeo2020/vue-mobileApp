import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)
import test from './modules/test'
import cate from './modules/cate'

export default new VueX.Store({
    state: {
        msg: 'Hello Vue-webapp'
    },
    modules: {
        test,
        cate
    }
})