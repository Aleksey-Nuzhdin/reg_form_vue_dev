import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.publicPath = '/portfolio/Fom_reg/';

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
