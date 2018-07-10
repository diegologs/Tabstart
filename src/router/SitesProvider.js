import { default_sites } from './DefaultSettings'

export default class SitesProvider {



    constructor() {
        let stored_sites = JSON.parse(localStorage.getItem('sites'));

        if (stored_sites !== null && stored_sites.length !== 0) {
            console.log(stored_sites);
            
            this.sites = stored_sites;
        } else {
            this.sites = default_sites;
        }
    }

    getSites() {
        return this.sites;
    }

    saveSite(s) {
        this.sites.push(s);
        localStorage.setItem('sites', JSON.stringify(this.sites));
    }

    clearSites(){
        localStorage.setItem('sites', JSON.stringify([]));
    }


}