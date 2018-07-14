<template>
	<h1 class="clock">{{h + ':' + m + ':' + s}}</h1>
</template>

<script>
export default {
    data() {
        return {
            today: new Date(),
            h: "",
            m: "",
            s: ""
        };
    },

    methods: {
        startTime() {
            this.today = new Date();
            this.h = this.today.getHours();
            this.m = this.today.getMinutes();
            this.s = this.today.getSeconds();
            this.m = this.checkTime(this.m);
            this.s = this.checkTime(this.s);
        },

        checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
    },

    created() {
        this.startTime();
        setInterval(() => this.startTime(), 1 * 1000);
    },

    mounted() {}
};
</script>

<style lang="scss" scoped>
.clock {
    margin: 0px;
    font-size: 2.5em;
    font-weight: bold;
}
</style>
