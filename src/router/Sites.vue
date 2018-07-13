<template>
    <div class="row">
        <ul class="sites_list">
            <li v-for="site in sites" :key="site.name" class="site">
                <img v-bind:src="site.icon" class="site_icon">
            </li>
        </ul>
    </div>
</template>

<script>
import SitesProvider from "./SitesProvider";

export default {
    data() {
        return {
            sites: []
        };
    },

    mounted() {
        const sites_provider = new SitesProvider();
        sites_provider.clearSites();
        this.sites = sites_provider.getSites();
    }
};
</script>

<style>
.sites_list {
    display: inline-grid;
    width: 920px;
    margin: 0px auto;
    grid-template-columns: repeat(6, 1fr);
    justify-content: center;
    margin-top: 20px;
}

.sites_list {
    list-style-type: none;
}

.site_icon {
     width: 68%;
    height: auto;
}

@media (max-width: 1000px) {
    .sites_list {
        padding: 0;
        width: 98%;
    }
}
</style>
