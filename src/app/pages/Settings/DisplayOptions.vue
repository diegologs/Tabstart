<template>
    <div class="display_options">
        <input type="checkbox" value="displaySites" class="checkbox" v-model="display_sites" @click="sitesHandler()"> Display sites<br>
        <input type="checkbox" value="displayClock" class="checkbox" v-model="display_clock" @click="clockHandler()"> Display clock<br>
    </div>
</template>

<script>
export default {
    computed: {
        data() {
            return {
                display_sites: true,
                display_clock: true
            };
        }
    },

    methods: {
        save() {
            this.$store.commit("changeOptions", {
                display_sites: this.display_sites,
                display_clock: this.display_clock
            });
        },

        sitesHandler() {
            this.display_sites = !this.display_sites;
            this.save();
        },

        clockHandler() {
            this.display_clock = !this.display_clock;
            this.save();
        }
    },

    beforeMount() {
        this.display_clock =
             typeof this.$store.state.options.display_clock !== "undefined"
                ? this.$store.state.options.display_clock
                : true;

        this.display_sites =
            typeof this.$store.state.options.display_sites !== "undefined"
                ? this.$store.state.options.display_sites
                : true;

    }
};
</script>

<style lang="scss">
.checkbox {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
