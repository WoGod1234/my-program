import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "./router/axios";
import VueAxios from "vue-axios";
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: "small",
  menuType: "text"
});


Vue.prototype.$axios = axios
axios.defaults.withCredentials = true
// window.axios = axios;
// Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
