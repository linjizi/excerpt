import Vue from 'vue';
import App from './App.vue';
// 引入store
import store from './store';
// 引入router
import router from "./router";
// 完整引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
