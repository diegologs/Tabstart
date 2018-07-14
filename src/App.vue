<template>
	<div class="bg" v-bind:style="{ background: bg_image}">
		<router-view></router-view>
	</div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            wallpaper: "",
            bg_image: ""
        };
    },

    mounted() {
        axios
            .get(
                "https://www.reddit.com/r/wallpaper/top/.json?count=2?sort=new"
            )
            .then(res => {
                this.wallpaper = res.data.data.children[0].data.url;

                this.bg_image =
                    "linear-gradient( rgba(0, 5, 30, 0.65), rgba(15, 19, 30, 0.25)), url(" +
                    this.wallpaper +
                    ")";
                console.log(this.bg_image);
            });
    }
};
</script>

<style lang="scss" scoped>
.bg {
    font-size: 20px;
    color: white;
    height: 100vh;
    background-size: cover;
    background-position: center;
}

* {
    margin: 0;
    padding: 0;
}

.center{
    margin: 0px auto;
    text-align: center;
}

a{
    text-decoration: none;
}

a:focus {
  outline: none;
}



</style>
