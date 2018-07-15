<template>
    <div class="add_sites">
        <sites class="settings_sites" :displaySettings="true" />
        <div class="buttons_container">
            <button class="add_site_button" @click="showModal = !showModal">Add site</button>
            <button class="add_site_button">Reorder sites</button>
        </div>

        <div v-if="showModal" class="modal">
            <div class="modal_header">
                <h3>Add site</h3>
                <i class="fa fa-times close_icon" @click="showModal = !showModal"></i>

            </div>

            <div class="modal_content">
                <label for="#add_site_input">Site name</label><br>
                <input type="text" id="add_site_input" class=" input add_site_input" placeholder="Site name">
                <br>
                <label for="#add_icon_input" class="icon_label">Icon URL (optional)</label><br>
                <input type="text" v-model="icon" id="add_icon_input" class=" input add_icon_input" placeholder="Icon URL">

                <div class="icon_container">
                    <img :src="icon" alt="" class="icon"> 
                </div>
            </div>

            <div class="modal_footer">
                <button class="add_site_button_modal">Add site</button>
            </div>
        </div>

        <div v-if="showModal" class="darkbg">
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            icon: ""
        };
    }
};
</script>

<style>
.settings_sites .sites_list {
    justify-content: left !important;
    padding: 0;
    width: 80%;
}

h3 {
    padding: 0;
    margin: 0;
}

.modal_header {
    display: grid;
    grid-template-columns: 95% 5%;
    padding: 20px;
    min-height: 20px;
    background-color: rgba(0, 0, 0, 0.08);
}

.add_site_button {
    padding: 10px;
    background: transparent;
    border: 2px solid aqua;
    color: aqua;
    margin: 1% 0 1% 1.6%;
    cursor: pointer;
}

.add_site_button:hover {
    background: rgb(151, 223, 223);
    color: black;
}

.buttons_container {
    margin-top: 15px;
    width: 76%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.modal {
    position: absolute;
    background-color: rgb(243, 243, 243);
    color: black;
    border-radius: 15px;
    min-width: 500px;
    min-height: 500px;
    z-index: 5;
    top: 20%;
    margin-left: 4%;
}

.modal_content {
    padding: 20px;
}

.close_icon {
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.darkbg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 4;
    top: 0;
    left: 0;
}

.input {
    width: 80%;
    margin-top: 16px;
    padding: 10px;
    border: 0;
    background: rgba(0, 0, 0, 0.09);
    margin-bottom: 20px;
}

.modal_footer {
    position: absolute;
    width: 100%;
    height: 70px;
    bottom: 0;
    text-align: center;
    margin: 0px auto;
}

.add_site_button_modal {
    background: rgb(2, 169, 190);
    color: white;
    padding: 10px 60px;
    cursor: pointer;
    margin-top: 16px;
    border: 2px solid rgb(2, 169, 190);
}

.icon_container{
    margin: 0px auto;
    text-align: center;
    margin-top: 30px;
}

.icon{
    max-width: 100px;
}

@media (max-width: 800px) {
    .modal {
        width: 98%;
        margin: 0px;
        left: 0;
        margin-left: 10px;
        min-width: 0px;
    }
}
</style>
