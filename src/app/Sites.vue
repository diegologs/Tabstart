<template>
    <div class="row">
        <ul class="sites_list">
            <li v-for="site in sites" :key="site.name" class="site">
                <a :href="site.name"><img v-bind:src="site.icon" class="site_icon"></a>
                <div v-if="displaySettings" class="trash">
                    <i @click="deleteSite(site)" class="far fa-trash-alt"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        displaySettings: Boolean
    },

    computed: {
        sites() {
            return this.$store.state.sites;
        }
    },

    data() {
        return {};
    },

    mounted() {},

    methods: {
        deleteSite(site) {
            this.$store.commit("delete_site", site);
        }
    }
};
</script>

<style>
.sites_list {
    display: inline-grid;
    width: 45%;
    margin: 0px auto;
    grid-template-columns: repeat(6, 1fr);
    justify-content: center;
}

.sites_list {
    list-style-type: none;
}

.site_icon {
    width: 68%;
    height: auto;
}

.trash {
    color: red;
    width: 68%;
    font-size: 0.7em;
    text-align: center;
    margin-top: 5px;
}

@media (max-width: 1000px) {
    .sites_list {
        padding: 0;
        width: 98%;
    }
}
</style>
