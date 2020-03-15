import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store/index'

// this line allows sending cookies to http://localhost:3000
axios.defaults.withCredentials = true // this line here !
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

/*
new Vue({
  data: state,
  router: createRouter(state),
  vuetify,
  devServer: {
    proxy: 'http://localhost:3000/'
  },
  render: h => h(App)
}).$mount('#app')
*/
