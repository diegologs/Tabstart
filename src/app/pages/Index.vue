<template>
    <div class="center content">
        <router-link to="/settings" title="Settings" class="settings_icon"><i class="fas fa-sliders-h"></i></router-link>
	    <timer class="timer"></timer>
	    <sites class="sites"></sites>
    </div>
</template>

<script>
export default {
   
};
</script>

<style lang="scss" scoped>
.content {
	padding-top: 3%;
}

.timer{
    padding-top: 4%;
}

.sites{
    margin-top: 60px;
}

.settings_icon{
    float: right;
    padding-right: 5%;
    color: rgba(255,255,255,0.7) !important;
}

.settings_icon:hover{
    color: white !important;
}

a{
    text-decoration: none;
}

a:focus {
  outline: none;
}

</style>
