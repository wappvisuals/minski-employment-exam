<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-8 md:p-11 text-left align-middle shadow-xl transition-all"
              >
                <svg @click="closeModal()" class="cursor-pointer absolute right-8 top-8" width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.4145 1.81466L12.122 0.522156L6.99784 5.64632L1.87368 0.522156L0.581177 1.81466L5.70534 6.93882L0.581177 12.063L1.87368 13.3555L6.99784 8.23132L12.122 13.3555L13.4145 12.063L8.29034 6.93882L13.4145 1.81466Z" fill="#979797"/>
                </svg>
                <div class="flex flex-1 flex-col justify-center max-full">
                    <div class="flex flex-col space-y-3 text-left mb-10 mt-4 text-center">
                        <h2 class="text-xl md:text-2xl font-bold">Register Account</h2>
                        <p class="text-sm md:text-md text-gray-500">Just a few quick things to set up your account.</p>
                    </div>
                    <div class="flex flex-col space-y-5">
                        <form v-on:submit.prevent="submit($v)" class="space-y-5">
                            <div class="flex flex-row flex-wrap space-y-5 md:space-y-0">
                              <div class="relative w-full md:w-1/2 pr-0 md:pr-2">
                                  <label class="block text-gray-500 text-sm mb-2" for="grid-password">First Name</label>
                                  <div class="relative">
                                      <input type="text" v-model="$v.form.first_name.$model" :class="{ 'has-error': $v.form.first_name.$error  && formSubmitted}" class="placeholder-gray-400 form-control w-full pr-10" placeholder="Enter First Name" style="transition: all 0.15s ease 0s;">
                                  </div>
                                  <div class="input-errors" v-if="$v.form.first_name.$error && formSubmitted">
                                      <div class="text-red-900 text-sm mt-2" v-if="$v.form.first_name.required.$invalid">
                                        {{ $lang.validations.required_first_name }}
                                      </div>
                                  </div>
                              </div>

                              <div class="relative w-full md:w-1/2 pr-0 md:pl-2">
                                <label class="block text-gray-500 text-sm mb-2" for="grid-password">Last Name</label>
                                <div class="relative">
                                    <input type="text" v-model="$v.form.last_name.$model" :class="{ 'has-error': $v.form.last_name.$error  && formSubmitted}" class="placeholder-gray-400 form-control w-full pr-10" placeholder="Enter Last Name" style="transition: all 0.15s ease 0s;">
                                </div>
                                <div class="input-errors" v-if="$v.form.last_name.$error && formSubmitted">
                                    <div class="text-red-900 text-sm mt-2" v-if="$v.form.last_name.required.$invalid">
                                      {{ $lang.validations.required_last_name }}
                                    </div>
                                </div>
                              </div>
                            </div>
                            <div class="flex flex-row flex-wrap space-y-5 md:space-y-0">
                              <div class="relative w-full md:w-1/2 pr-0 md:pr-2">
                                  <label class="block text-gray-500 text-sm mb-2" for="grid-password">Birthdate</label>
                                  <Datepicker class="w-full h-[50px]" :enableTimePicker="false" v-model="$v.form.birthdate.$model">
                                  </Datepicker>
                              </div>

                              <div class="relative w-full md:w-1/2 pr-0 md:pl-2">
                                <label class="block text-gray-500 text-sm mb-2" for="grid-password">Contact No.</label>
                                <div class="relative">
                                    <input type="text" 
                                      v-model="$v.form.contact_no.$model" 
                                      :class="{ 'has-error': $v.form.contact_no.$error && formSubmitted }"
                                      class="placeholder-gray-400 form-control w-full pr-10" 
                                      placeholder="09xxxxxxxxx" 
                                      style="transition: all 0.15s ease 0s;">
                                </div>
                                <template v-if="$v.form.contact_no.$error && formSubmitted">
                                  <div class="text-red-900 text-sm mt-1" v-if="$v.form.contact_no.numeric.$invalid">
                                      Contact number must be numeric
                                  </div>
                                  <div class="text-red-900 text-sm mt-1" v-if="$v.form.contact_no.minLength.$invalid">
                                      Contact number minimum length is 11
                                  </div>
                                </template>
                              </div>
                            </div>
                            <div class="relative w-full">
                                <label class="block text-gray-500 text-sm mb-2" for="grid-password">Email address</label>
                                <input type="text" v-model="$v.form.email.$model" :class="{ 'has-error': $v.form.email.$error && formSubmitted }" maxlength="70" class="placeholder-gray-400 form-control w-full" placeholder="Enter Email Address" style="transition: all 0.15s ease 0s;">
                                <div class="input-errors" v-if="$v.form.email.$error && formSubmitted">
                                    <div class="text-red-900 text-sm mt-2" v-if="$v.form.email.required.$invalid">
                                      {{ $lang.validations.required_email }}
                                    </div>
                                    <div class="text-red-900 text-sm mt-2" v-if="$v.form.email.email.$invalid">
                                      {{ $lang.validations.invalid_email_format }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-row flex-wrap space-y-5">
                              <div class="relative w-full md:w-2/2">
                                  <label class="block text-gray-500 text-sm mb-2" for="grid-password">Password</label>
                                  <div class="relative">
                                      <input v-on:keyup="checkStrength($v)" :type="isUnmask ? 'text' : 'password'" v-model="$v.form.password.$model" :class="{ 'has-error': $v.form.password.$error && formSubmitted }" class="placeholder-gray-400 form-control w-full pr-10" placeholder="Your Password" style="transition: all 0.15s ease 0s;">
                                      <svg v-if="!isUnmask" v-on:click="isUnmask = !isUnmask" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-full px-3 w-12 absolute right-0 top-0 cursor-pointer text-gray-400">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                      </svg>
                                      <svg v-if="isUnmask" v-on:click="isUnmask = !isUnmask" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-full px-3 w-12 absolute right-0 top-0 cursor-pointer text-gray-400">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                      </svg>
                                  </div>
                                  <template v-if="$v.form.password.$model.length">
                                    <div class="flex items-center mt-2 pace-x-1 justify-between">
                                      <small class="text-gray-500 text-xs">Password Strength</small>
                                      <small v-if="passwordStrength <= 2" class="text-red-800 italic text-xs">Weak</small>
                                      <small v-if="passwordStrength == 3" class="text-yellow-500 italic text-xs">Moderate</small>
                                      <small v-if="passwordStrength == 4" class="text-blue-400 italic text-xs">Good</small>
                                      <small v-if="passwordStrength == 5" class="text-green-700 italic text-xs">Strong</small>
                                    </div>
                                    <div class="flex items-center mt-2 pace-x-1">
                                      <div class="relative overflow-hidden h-2 w-full border border-gray-300 rounded">
                                        
                                        <span :style="{width:`${passwordStrengthPerc}%`}" :class="strengthBackground" class="h-full absolute top-0"></span>
                                      </div>
                                    </div>
                                  </template>
                                  <div class="input-errors" v-if="$v.form.password.$error && formSubmitted">
                                      <div class="text-red-900 text-sm mt-2" v-if="$v.form.password.required.$invalid">
                                        {{ $lang.validations.required_password }}
                                      </div>
                                  </div>
                                  <div class="input-errors" v-if="!$v.form.password.required.$invalid && $v.form.password.$error && formSubmitted">
                                      <div class="text-red-900 text-sm mt-1 italic">Your password must contain atlease 1 special character, 1 number, 1 lowercase & 1 uppercase</div>
                                  </div>
                              </div>

                              <div class="relative w-full md:w-2/2">
                                <label class="block text-gray-500 text-sm mb-2" for="grid-password">Confirm Password</label>
                                <div class="relative">
                                    <input v-on:keyup="matchPassword($v)" :type="isUnmask2 ? 'text' : 'password'" v-model="$v.form.confirm_password.$model" :class="{ 'has-error': $v.form.confirm_password.$error && formSubmitted }" class="placeholder-gray-400 form-control w-full pr-10" placeholder="Confirm Password" style="transition: all 0.15s ease 0s;">
                                    <svg v-if="!isUnmask2" v-on:click="isUnmask2 = !isUnmask2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-full px-3 w-12 absolute right-0 top-0 cursor-pointer text-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                    </svg>
                                    <svg v-if="isUnmask2" v-on:click="isUnmask2 = !isUnmask2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-full px-3 w-12 absolute right-0 top-0 cursor-pointer text-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </div>
                                
                                <div class="input-errors" v-if="notMatchPassword">
                                    <div class="text-red-900 text-sm mt-1">{{$lang.validations.notmatch_confirm_password}}</div>
                                </div>
                              </div>
                            </div>
                            <div class="flex flex-wrap justify-between">
                              <div>
                                <label class="inline-flex items-start cursor-pointer justify-center mb-3">
                                  <input v-model="$v.form.tc_agree.$model" value="1" id="customCheckLogin" type="checkbox" class="form-checkbox text-gray-800 ml-1 w-5 h-5" style="transition: all 0.15s ease 0s;">
                                  <p class="ml-2 text-sm"> I have read and agree to the <a href="/termsandcondition" target="_blank" class="font-bold text-primary"> Terms of Service </a> </p>
                                </label>
                              </div>
                              <div class="input-errors" v-if="!$v.form.tc_agree.$model && formSubmitted">
                                  <div class="text-red-900 text-sm mt-1">{{$lang.validations.required_terms}}</div>
                              </div>
                            </div>
                            <button :disabled="isRequesting ? true : false" :class="isRequesting ? 'cursor-not-allowed' : ''" class="btn btn-primary shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full flex item-center justify-center">
                              <span v-if="!isRequesting">Sign up</span>
                              <span v-if="isRequesting" class="w-6 h-6 inline-block">
                                  <svg class="w-full h-full" viewBox="-2 -2 42 42" xmlns="http://www.w3.org/2000/svg" stroke="white"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="4"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
                                    <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g>
                                  </svg>
                              </span>
                            </button>
                        </form>
                        <p class="text-center">Already have an account?<span @click="closeModal()" class="text-primary cursor-pointer font-bold ml-1">Log in</span></p>
                    </div>
                </div>


              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
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
    import { mapActions, mapMutations } from "vuex";
    
    export default {
            props: ['isOpen'],
            setup() {
              return { 
                $v: useVuelidate(),
                notMatchPassword: ref(false),
                passwordStrengthPerc: ref(0),
                passwordStrength: ref(0),
                strengthBackground: ref('bg-red-800')
              };
            },
            components: {
                Datepicker
            },
            data: function() {
                return {
                    isUnmask: false,
                    isUnmask2: false,
                    openRegForm : ref(false),
                    form: {
                        contact_no: "",
                        birthdate: "",
                        first_name: "",
                        last_name: "",
                        email: "",
                        password: "",
                        confirm_password: "",
                        tc_agree: false,
                    },
                    isRequesting: false,
                    formSubmitted: false,
                  };
            },
            validations: {
                form: {
                  contact_no: { numeric, minLength: minLength(11) },
                  birthdate: {},
                  first_name: {required},
                  last_name: {required},
                  email: {required,email},
                  password: {
                    required,
                    min : minLength(8), 
                    containsUppercase: function(value) {
                      return /[A-Z]/.test(value)
                    },
                    containsLowercase: function(value) {
                      return /[a-z]/.test(value)
                    },
                    containsNumber: function(value) {
                      return /[0-9]/.test(value)
                    },
                    containsSpecial: function(value) {
                      return /[#?!@$%^&*-]/.test(value)
                    }
                  },
                  confirm_password: {required},
                  tc_agree: {required},
                },
            },
            components: {
                TransitionRoot,
                TransitionChild,
                Dialog,
                DialogPanel,
                DialogTitle
            },
            methods: {
                submit($v) {
                    this.formSubmitted = true;
                    $v.form.$touch();
                    if ($v.form.$error || this.notMatchPassword || !$v.form.tc_agree.$model) {
                        return false;
                    }

                    this.isRequesting = true
                    let formData = new FormData()
                    for (var key in this.form) {
                        formData.append(key, this.form[key])
                    }

                    this.signUp(formData).then(res => {
                      if(res.status === 200){
                          setTimeout(() => {
                            this.isRequesting = false;
                            localStorage.setItem("_token", res.data.result.token);
                            this.setToken(res.data.result.token);

                            localStorage.setItem("user_data", JSON.stringify(res.data.result.user));
                            this.setUserDetais(res.data.result.user);
                            
                            this.$router.push({ name: 'clients' })
                          }, 1000);
                      }
                      this.isRequesting = false;
                      this.$emit('closeRegistration', false)
                    }).catch(err => {
                      this.isRequesting = false;
                    });
                },
                closeModal(){
                    this.$emit('closeRegistration', false)
                },
                checkStrength($v){
                  this.passwordStrength = 0;

                  if(!$v.form.password.containsUppercase.$invalid){
                    this.passwordStrength++;
                  }
                  if(!$v.form.password.containsLowercase.$invalid){
                    this.passwordStrength++;
                  }
                  if(!$v.form.password.containsNumber.$invalid){
                    this.passwordStrength++;
                  }
                  if(!$v.form.password.containsSpecial.$invalid){
                    this.passwordStrength++;
                  }
                  if(!$v.form.password.min.$invalid){
                    this.passwordStrength++;
                  }

                  console.log(this.passwordStrength);
                  if(this.passwordStrength <= 2){
                    this.strengthBackground = "bg-red-800";
                  }
                  if(this.passwordStrength == 3){
                    this.strengthBackground = "bg-yellow-500";
                  }
                  if(this.passwordStrength == 4){
                    this.strengthBackground = "bg-blue-400";
                  }
                  if(this.passwordStrength == 5){
                    this.strengthBackground = "bg-green-700";
                  }
                  console.log(this.strengthBackground);
                  this.passwordStrengthPerc = (this.passwordStrength / 5) * 100;
                  this.matchPassword($v);
                },
                matchPassword($v) {
                  if($v.form.password.$model === $v.form.confirm_password.$model){
                      this.notMatchPassword = false;
                  }else{
                      this.notMatchPassword = true;
                  }
                },
                ...mapActions("auth", {
                  signUp: 'SIGNUP_ACTION',
                }),
                ...mapMutations("user", {
                    setUserDetais: 'SET_USER_DETAILS',
                }),
                ...mapMutations("auth", {
                    setToken: 'SET_USER_TOKEN',
                }),
            },
    }
  </script>
  