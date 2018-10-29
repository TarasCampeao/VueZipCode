import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.productionTip = false;


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
