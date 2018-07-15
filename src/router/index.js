import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Timer from '../app/Timer.vue'
import Sites from '../app/Sites.vue'
import AddSites from '../app/pages/Settings/AddSites'

Vue.use(VueRouter)
Vue.component('timer', Timer)
Vue.component('sites', Sites)
Vue.component('add-sites', AddSites)

export default new VueRouter({
  routes
})
