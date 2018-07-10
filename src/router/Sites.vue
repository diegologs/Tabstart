<template>
	<div class="row">
		<ul>
			<li v-for="site in sites" :key="site.name">{{site.name}}
                <img v-bind:src="site.icon" width="40px">
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
</style>
