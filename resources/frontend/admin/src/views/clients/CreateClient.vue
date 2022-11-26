<template>
    <div class="flex flex-wrap">
        <div class="w-full px-3">
            <div class="w-full lg:w-6/12 p:0 md:pr-16 mb-5">
                <h4 class="font-bold text-white text-2xl">Manage Booking</h4>
            </div>
            <div class="flex flex-1 flex-col justify-center max-full bg-[#232b3a] p-6 rounded-xl">
                <h4 class="text-lg text-gray-100 font-semibold mb-6" data-config-id="auto-txt-40-2">Add Client</h4>
                <div class="flex flex-col space-y-5">
                    <form v-on:submit.prevent="submit($v)" class="space-y-5">
                        <div class="flex flex-row flex-wrap space-y-5 md:space-y-0">
                            <div class="relative w-full md:w-1/2 pr-0 md:pr-2">
                                <label class="block text-gray-500 text-sm mb-2" for="grid-password">First Name</label>
                                <div class="relative">
                                    <input type="text" v-model="$v.client.first_name.$model" :class="{ 'has-error': $v.client.first_name.$error  && formSubmitted}" class="placeholder-gray-400 form-control w-full pr-10" placeholder="Enter First Name" style="transition: all 0.15s ease 0s;">
                                </div>
                                <div class="input-errors" v-if="$v.client.first_name.$error && formSubmitted">
                                    <div class="text-red-500 text-sm mt-2" v-if="$v.client.first_name.required.$invalid">
                                    {{ $lang.validations.required_first_name }}
                                    </div>
                                </div>
                            </div>
            
                            <div class="relative w-full md:w-1/2 pr-0 md:pl-2">
                            <label class="block text-gray-500 text-sm mb-2" for="grid-password">Last Name</label>
                            <div class="relative">
                                <input type="text" v-model="$v.client.last_name.$model" :class="{ 'has-error': $v.client.last_name.$error  && formSubmitted}" class="placeholder-gray-400 form-control w-full pr-10" placeholder="Enter Last Name" style="transition: all 0.15s ease 0s;">
                            </div>
                            <div class="input-errors" v-if="$v.client.last_name.$error && formSubmitted">
                                <div class="text-red-500 text-sm mt-2" v-if="$v.client.last_name.required.$invalid">
                                    {{ $lang.validations.required_last_name }}
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="flex flex-row flex-wrap space-y-5 md:space-y-0">
                            <div class="relative w-full md:w-1/2 pr-0 md:pr-2">
                                <label class="block text-gray-500 text-sm mb-2" for="grid-password">Birthdate</label>
                                <Datepicker class="w-full h-[50px]" :class="{ 'has-error': $v.client.birthdate.$error && formSubmitted }" :maxDate="new Date()" :enableTimePicker="false" v-model="$v.client.birthdate.$model">
                                </Datepicker>
                                <template v-if="$v.client.birthdate.$error && formSubmitted">
                                    <div class="text-red-500 text-sm mt-2" v-if="$v.client.birthdate.required.$invalid">
                                        {{ $lang.validations.required_birthday }}
                                    </div>
                                </template>
                            </div>
            
                            <div class="relative w-full md:w-1/2 pr-0 md:pl-2">
                            <label class="block text-gray-500 text-sm mb-2" for="grid-password">Contact No.</label>
                            <div class="relative">
                                <input type="text" 
                                    v-model="$v.client.contact_no.$model" 
                                    :class="{ 'has-error': $v.client.contact_no.$error && formSubmitted }"
                                    class="placeholder-gray-400 form-control w-full pr-10" 
                                    placeholder="09xxxxxxxxx" 
                                    style="transition: all 0.15s ease 0s;">
                            </div>
                            <template v-if="$v.client.contact_no.$error && formSubmitted">
                                <div class="text-red-500 text-sm mt-2" v-if="$v.client.contact_no.required.$invalid">
                                    {{ $lang.validations.required_contact_no }}
                                </div>
                                <div class="text-red-500 text-sm mt-1" v-if="$v.client.contact_no.numeric.$invalid">
                                    Contact number must be numeric
                                </div>
                                <div class="text-red-500 text-sm mt-1" v-if="$v.client.contact_no.minLength.$invalid">
                                    Contact number minimum length is 11
                                </div>
                            </template>
                            </div>
                        </div>
                        <div class="relative w-full">
                            <label class="block text-gray-500 text-sm mb-2" for="grid-password">Email address</label>
                            <input type="text" v-model="$v.client.email.$model" :class="{ 'has-error': $v.client.email.$error && formSubmitted }" maxlength="70" class="placeholder-gray-400 form-control w-full" placeholder="Enter Email Address" style="transition: all 0.15s ease 0s;">
                            <div class="input-errors" v-if="$v.client.email.$error && formSubmitted">
                                <div class="text-red-500 text-sm mt-2" v-if="$v.client.email.required.$invalid">
                                    {{ $lang.validations.required_email }}
                                </div>
                                <div class="text-red-500 text-sm mt-2" v-if="$v.client.email.email.$invalid">
                                    {{ $lang.validations.invalid_email_format }}
                                </div>
                            </div>
                        </div>
            
                        <div class="relative w-full">
                            <label class="block text-gray-500 text-sm mb-2" for="grid-password">Select the interest(of) of this client:</label>
                            <div class="w-full lg:w-12/12 mb-3" v-for="(item, index) in interest" :key="item.name">
                                <label class="flex items-center">
                                    <input type="checkbox" class="w-6 h-6" v-model="client.interest" :value="item"/>
                                    <label class="text-white ml-2">{{item.name}}</label>
                                </label>
                            </div>
                        </div>
            
            
            
                        <button :disabled="isRequesting ? true : false" :class="isRequesting ? 'cursor-not-allowed' : ''" class="btn btn-primary shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 flex item-center justify-center">
                            <span v-if="!isRequesting">Add Client</span>
                            <span v-if="isRequesting" class="w-6 h-6 inline-block">
                                <svg class="w-full h-full" viewBox="-2 -2 42 42" xmlns="http://www.w3.org/2000/svg" stroke="white"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="4"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
                                <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g>
                                </svg>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, numeric } from "@vuelidate/validators";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

/* VUEX */
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
        props: ['isOpen'],
        setup() {
          return { 
            $v: useVuelidate()
          };
        },
        components: {
            Datepicker
        },
        data: function() {
            return {
                client: {
                    contact_no: "",
                    birthdate: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    interest: []
                },
                isRequesting: false,
                formSubmitted: false,
              };
        },
        validations: {
            client: {
              contact_no: { required, numeric, minLength: minLength(11) },
              birthdate: { required },
              first_name: {required},
              last_name: {required},
              email: {required,email},
              interest: {}
            },
        },
        components: {
            TransitionRoot,
            TransitionChild,
            Dialog,
            DialogPanel,
            DialogTitle
        },
        computed: {
            ...mapGetters("interest", {
                interest: 'GET_INTEREST_GETTER',
            }),
        },
        created(){
            this._getInterest()
        },
        methods: {
            submit($v) {
                this.formSubmitted = true;
                $v.client.$touch();
                if ($v.client.$error) {
                    return false;
                }

                this.isRequesting = true
                let formData = new FormData()

                formData.append('contact_no', this.client.contact_no)
                if(this.client.birthdate){
                    formData.append('birthdate', new Date(this.client.birthdate).toUTCString())
                }
                
                formData.append('first_name', this.client.first_name)
                formData.append('last_name', this.client.last_name)
                formData.append('email', this.client.email)

                this.client.interest.forEach((value, index, array) => {
                    formData.append('interest[]', value.id);
                });

                this._createClient(formData).then(res => {
                    this.$router.push({ name: 'clients' });
                })
                this.isRequesting = false
            },
            ...mapActions("auth", {
              signUp: 'SIGNUP_ACTION',
            }),
            ...mapActions("client", {
                _createClient: 'CREATE_CLIENT_ACTION'
            }),
            ...mapActions("interest", {
                _getInterest: 'GET_INTEREST_ACTION'
            }),
        },
}
</script>