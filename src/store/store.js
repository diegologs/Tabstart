import Vue from 'vue'
import Vuex from 'vuex'

import {default_sites} from '../app/DefaultSettings'

Vue.use(Vuex)

const state = {
    sites: JSON.parse(localStorage.getItem('sites')) ? JSON.parse(localStorage.getItem('sites')) : default_sites,
    options: {
        display_sites: JSON.parse(localStorage.getItem('options')) ? JSON.parse(localStorage.getItem('options')).display_sites : true,
        display_clock: JSON.parse(localStorage.getItem('options')) ? JSON.parse(localStorage.getItem('options')).display_clock : true
    }
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

    changeOptions(state, newOptions){
        state.options.display_sites = newOptions.display_sites;
        state.options.display_clock = newOptions.display_clock;
        localStorage.setItem('options', JSON.stringify(newOptions));

    }

}

export default new Vuex.Store({
    state,
    mutations
})