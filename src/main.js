// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import './common/less/base.less'

import Vue from 'vue'
import store from './store/state'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './common/less/theme.less'
// import echarts from 'echarts'
// import VueWechatTitle from 'vue-wechat-title'



// Vue.prototype.$echarts = echarts
import Tool from './common/js/common'

Vue.use(iView);
// Vue.use(VueWechatTitle);


Vue.prototype.tool = Tool;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
