<template>
    <div class="center content">
        <router-link to="/settings" title="Settings" class="settings_icon">
            <i class="fas fa-sliders-h"></i>
        </router-link>
        <timer v-if="display_clock" class="timer"></timer>
        <sites v-if="display_sites" class="sites"></sites>
        <nfl-calendar v-if="display_nfl" class="nfl"></nfl-calendar>
    </div>
</template>

<script>
export default {
  data() {
    return {
      display_clock: Boolean,
      display_sites: Boolean,
      display_nfl: Boolean
    };
  },
  mounted() {
    console.log(this.$store.state.options.display_sites);
    this.display_sites =
      typeof this.$store.state.options.display_sites !== "undefined"
        ? this.$store.state.options.display_sites
        : true;
    this.display_clock =
      typeof this.$store.state.options.display_clock !== "undefined"
        ? this.$store.state.options.display_clock
        : true;
    this.display_nfl =
      typeof this.$store.state.options.display_nfl !== "undefined"
        ? this.$store.state.options.display_nfl
        : true;
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding-top: 3%;
}

.timer {
  padding-top: 4%;
}

.sites {
  margin-top: 60px;
}

.settings_icon {
  float: right;
  padding-right: 5%;
  color: rgba(255, 255, 255, 0.7) !important;
}

.settings_icon:hover {
  color: white !important;
}

a {
  text-decoration: none;
}

a:focus {
  outline: none;
}
</style>
