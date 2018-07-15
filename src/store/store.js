import Vue from 'vue'
import Vuex from 'vuex'

import {default_sites} from '../app/DefaultSettings'

Vue.use(Vuex)

const state = {
    sites: JSON.parse(localStorage.getItem('sites'))
}

const mutations = {
    add_site(state, site) {

        state.sites.push(site);
        localStorage.setItem('sites', JSON.stringify(state.sites));

    },

    delete_site(state, site) {
        const index = state.sites.indexOf(site);
        state.sites.splice(index, 1);
        localStorage.setItem('sites', JSON.stringify(state.sites));

    },

}

export default new Vuex.Store({
    state,
    mutations
})