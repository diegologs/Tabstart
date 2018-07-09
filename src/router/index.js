import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Timer from './Timer.vue'
import Sites from './Sites.vue'

Vue.use(VueRouter)
Vue.component('timer', Timer)
Vue.component('sites', Sites)

export default new VueRouter({
  routes
})
