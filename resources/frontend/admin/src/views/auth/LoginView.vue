<template>
    <main>
        <div class="flex min-h-screen">

            <!-- Container -->
            <div class="flex flex-row w-full">
                <!-- Login -->
                <div class="relative flex flex-1 flex-col items-center justify-center px-6 md:px-10 py-10 md:py-20 lg:py-0 relative bg-[#34495e]">
                    <!-- Login box -->
                    <div class="w-full md:w-4/12 bg-white p-6 py-8 md:p-12 rounded z-10">
                        <img alt="Vue logo" class="logo mx-auto" src="./../../assets/logo.svg" width="130" height="130" />
                        <div class="flex flex-col space-y-3 text-left mb-7 text-center">
                            <h2 class="text-xl md:text-2xl font-bold">Admin Dashboard</h2>
                            <p class="text-gray-500 fs-16">Welcome! Please login to get started.</p>
                        </div>
                        <div class="flex flex-col max-w-md space-y-5">
                            <form v-on:submit.prevent="submit($v)" class="space-y-5">
                                <div class="relative w-full mb-6">
                                    <label class="block text-gray-500 text-sm mb-2" for="grid-password"> Email Address </label>
                                    <input type="text" v-model="$v.form.email.$model" :class="{ 'has-error': $v.form.email.$error  && formSubmitted}" maxlength="70" class="placeholder-gray-400 form-control w-full" placeholder="Enter Email Address" style="transition: all 0.15s ease 0s;">
                                    <div class="input-errors" v-if="$v.form.email.$error && formSubmitted">
                                        <div class="text-red-900 text-sm mt-2" v-if="$v.form.email.required.$invalid">
                                          {{ $lang.validations.required_email }}
                                        </div>
                                        <div class="text-red-900 text-sm mt-2" v-if="$v.form.email.email.$invalid">
                                            {{ $lang.validations.invalid_email_format }}
                                        </div>
                                    </div>
                                </div>
                                <div class="relative w-full mb-6">
                                    <label class="block text-gray-500 text-sm mb-2" for="grid-password"> Password </label>
                                    <div class="relative">
                                        <input :type="isUnmask ? 'text' : 'password'" v-model="$v.form.password.$model" :class="{ 'has-error': $v.form.password.$error  && formSubmitted}" class="placeholder-gray-400 form-control w-full pr-10" placeholder="Your Password" style="transition: all 0.15s ease 0s;">
                                        <svg v-if="!isUnmask" v-on:click="isUnmask = !isUnmask" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-full px-3 w-12 absolute right-0 top-0 cursor-pointer text-gray-400">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                        </svg>
                                        <svg v-if="isUnmask" v-on:click="isUnmask = !isUnmask" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-full px-3 w-12 absolute right-0 top-0 cursor-pointer text-gray-400">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </div>
                                    <div class="input-errors" v-if="$v.form.password.$error && formSubmitted">
                                        <div class="text-red-900 text-sm mt-2" v-if="$v.form.password.required.$invalid">
                                          {{ $lang.validations.required_password }}
                                        </div>
                                      </div>
                                </div>
                                <div class="flex flex-wrap justify-between mt-6">
                                    <div class="w-full text-right">
                                        <a class="font-normal">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <button :disabled="isRequesting ? true : false" :class="isRequesting ? 'cursor-not-allowed' : ''" class="btn btn-primary shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full flex item-center justify-center">
                                    <span v-if="!isRequesting">Login</span>
                                    <span v-if="isRequesting" class="w-6 h-6 inline-block">
                                        <svg class="w-full h-full" viewBox="-2 -2 42 42" xmlns="http://www.w3.org/2000/svg" stroke="white"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="4"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
                                          <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g>
                                        </svg>
                                    </span>
                                </button>
                            </form>

                            <p class="text-center">Don't have an account? <span class="text-primary font-bold cursor-pointer" @click="openRegistration()">Sign up now</span></p>
                        </div>
                    </div>
            
                </div>
            </div>
        
          </div>
    </main>
    <RegisterView :isOpen="openRegForm" @closeRegistration="openRegForm = $event"></RegisterView>
</template>

<script>
 import { ref } from 'vue'
    import { useVuelidate } from "@vuelidate/core";
    import { required, email } from "@vuelidate/validators";
    import RegisterView from "@/views/auth/RegisterView.vue";

    /* VUEX */
    import { mapActions, mapMutations } from "vuex";
    
    export default {
        setup() {
            return { 
                $v: useVuelidate(),
                isRequesting: ref(false),
                openRegForm: ref(false),
                isUnmask: ref(false),
                formSubmitted: ref(false),
            };
        },
        data: function() {
            return {
                form: {
                    email: "",
                    password: "",
                },
            };
        },
        components: {
            RegisterView
        },
        validations: {
            form: {
            email: {
                required,
                email,
            },
            password: {
                required,
            },
            },
        },
        methods: {
            submit($v) {
                $v.form.$touch();
                this.formSubmitted = true;
                if ($v.form.$error) {
                    return false;
                }
                
                this.isRequesting = true;
                let formData = new FormData();
                for (var key in this.form) {
                    formData.append(key, this.form[key]);
                }

                this.login(formData).then((res) => {
                    if(res.status === 200){
                        setTimeout(() => {
                            localStorage.setItem("_token", res.data.result.token);
                            this.setToken(res.data.result.token);

                            localStorage.setItem("user_data", JSON.stringify(res.data.result.user));
                            this.setUserDetais(res.data.result.user);

                            this.isRequesting = false;
                            this.$router.push({ name: 'clients' })
                        }, 1000);
                    }
                })
                .catch((err) => {
                    this.isRequesting = false;
                    console.log(err);
                });
            },
            openRegistration(){
                this.openRegForm = true;
            },
            ...mapActions("auth", {
                login: 'LOGIN_ACTION',
            }),
            ...mapMutations("user", {
                setUserDetais: 'SET_USER_DETAILS',
            }),
            ...mapMutations("auth", {
                setToken: 'SET_USER_TOKEN',
            }),
        },
    };
</script>