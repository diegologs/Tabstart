import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Timer from './Timer.vue'

Vue.use(VueRouter)
Vue.component('timer', Timer)

export default new VueRouter({
  routes
})
