<template>
	<div class="row">
		<ul>
			<li v-for="site in sites" :key="site.name">{{site.name}}</li>
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
        this.sites = sites_provider.getSites();
    }
};
</script>

<style>
</style>
