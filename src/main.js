import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import App from './App.vue'
import Emitter from './Emitter.vue'
import Listener from './Listener.vue'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(iView, { locale })

const routes = [
  { path: '/emitter', component: Emitter },
  { path: '/listener', component: Listener },
  { path: '/*', redirect: '/emitter' },
]

const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
