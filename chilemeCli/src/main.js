import Vue from 'vue'
import ElementUI from 'element-ui';               // 导入element-ui插件
import 'element-ui/lib/theme-chalk/index.css';    // 导入element-ui样式表文件
import App from './App.vue';
import router from './router';
import axios from 'axios'                         //  导入axios插件

Vue.prototype.$http = axios                       // 挂载axios到原型链上，方便全局调用
axios.defaults.baseURL = 'http://127.0.0.1:8080'// 默认服务端请求地址
//Vue.prototype.imgUrl = "http://127.0.0.1:8080" // 全局定义站点图片地址

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})