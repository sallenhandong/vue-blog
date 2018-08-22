import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import 'vue-social-share/dist/client.css';
Vue.config.productionTip = false;
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
