<template>
    <div class="display_options">
        <input type="checkbox" value="displaySites" class="checkbox" v-model="display_sites" @click="sitesHandler()"> Display sites<br>
        <input type="checkbox" value="displayClock" class="checkbox" v-model="display_clock" @click="clockHandler()"> Display clock<br>
        <input type="checkbox" value="displayNfl" class="checkbox" v-model="display_nfl" @click="nflHandler()"> Display NFL calendar<br>
    </div>
</template>

<script>
export default {
  computed: {
    data() {
      return {
        display_sites: true,
        display_clock: true,
        display_nfl: true
      };
    }
  },

  methods: {
    save() {
      this.$store.commit("changeOptions", {
        display_sites: this.display_sites,
        display_clock: this.display_clock,
        display_nfl: this.display_nfl
      });
    },

    sitesHandler() {
      this.display_sites = !this.display_sites;
      this.save();
    },

    clockHandler() {
      this.display_clock = !this.display_clock;
      this.save();
    },
    nflHandler() {
      this.display_nfl = !this.display_nfl;
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

    this.display_nfl =
      typeof this.$store.state.options.display_nfl !== "undefined"
        ? this.$store.state.options.display_nfl
        : false;
  }
};
</script>

<style lang="scss">
.checkbox {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
