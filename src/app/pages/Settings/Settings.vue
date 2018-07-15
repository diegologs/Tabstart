<template>
    <div class="hover_bg">
        <router-link to="/" title="Back to homepage" class="back_icon">
            <i class="fas fa-arrow-left"></i>
        </router-link>
       
        <div class="container">
            <h1>Settings</h1>
            <div class="section">
                <h2>Edit sites</h2>
                <add-sites />
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.container {
    padding-top: 5%;
    width: 800px;
    max-width: 92%;
    margin: 0px auto;
}

.hover_bg {
    min-width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
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

.section{
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
