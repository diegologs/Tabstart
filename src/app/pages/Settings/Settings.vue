<template>
    <div class="hover_bg">
        <router-link to="/" title="Back to homepage" class="back_icon">
            <i class="fas fa-arrow-left"></i>
        </router-link>
       
        <div class="container section">
            <h1>Settings</h1>
            <div class="content">
                <h2>Edit sites</h2>
                <add-sites />
            </div>
        </div>

        <div class="container section">
            <h1>Display settings</h1>
            <div class="content">
                <display-options></display-options>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.container {
    width: 800px;
    max-width: 92%;
    margin: 0px auto;
}

.section{
    padding-top: 4%;

}

.hover_bg {
    min-width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
}

.back_icon {
    padding-top: 3%;
    float: right;
    padding-right: 5%;
    color: rgba(255, 255, 255, 0.7) !important;
}

.back_icon:hover {
    color: white !important;
}

.content{
    padding: 30px;
    padding-top: 4px;
}

a {
    text-decoration: none;
}

a:focus {
    outline: none;
}
</style>
