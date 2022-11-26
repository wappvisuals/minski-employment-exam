<template>
    <SideNav/>
    <div class="mx-auto lg:ml-80">
        <Navbar/>
        <main  class="main-content px-4 py-8 min-h-full bg-[#1e2431]">
            <router-view/>
        </main>
    </div>
</template>



<script>
    import Navbar  from '../components/Navbar.vue';
    import SideNav  from '../components/SideNav.vue';
    /* VUEX */
    import { mapActions, mapGetters } from "vuex";

    export default {
        setup() {
        },
        components: {
            Navbar,
            SideNav
        },
        computed: {
            ...mapGetters("user", {
                user_data: 'GET_USER_DETAILS_GETTER',
            }),
        },
        methods: {
        },
    }
</script>