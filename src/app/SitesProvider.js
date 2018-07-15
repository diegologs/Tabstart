import {
    default_sites
} from './DefaultSettings'

export default class SitesProvider {

    constructor() {

        this.stored_sites = JSON.parse(localStorage.getItem('sites'));
        console.log(JSON.parse(localStorage.getItem('sites')));

        if (this.stored_sites && this.stored_sites.length !== 0) {

            this.sites = this.default_sites;

        } else {

            this.sites = default_sites;
            localStorage.setItem('sites', JSON.stringify(default_sites));

        }
    }

    getSites() {
        return this.sites;
    }

    saveSite(s) {
        this.sites.push(s);
        localStorage.setItem('sites', JSON.stringify(this.sites));
    }

    clearSites() {
        localStorage.setItem('sites', JSON.stringify([]));
    }

    deleteSite(site) {

        const index = this.sites.indexOf(site);
        this.sites.splice(index, 1);
        localStorage.setItem('sites', JSON.stringify(this.sites));


    }


}