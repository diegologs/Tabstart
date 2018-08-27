import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Timer from '../app/Timer.vue'
import Sites from '../app/Sites.vue'
import NflCalendar from '../app/NflCalendar.vue'

import AddSites from '../app/pages/Settings/AddSites'
import DisplayOptions from '../app/pages/Settings/DisplayOptions'

Vue.use(VueRouter)
Vue.component('timer', Timer)
Vue.component('sites', Sites)
Vue.component('add-sites', AddSites)
Vue.component('display-options', DisplayOptions)
Vue.component('nfl-calendar', NflCalendar)

export default new VueRouter({
  routes
})
