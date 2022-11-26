<template>
    <template v-if="isOpen">
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" class="relative z-50">
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
                      class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 md:p-11 text-left align-middle shadow-xl transition-all"
                    >
                      <svg @click="closeModal()" class="cursor-pointer absolute right-8 top-8" width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.4145 1.81466L12.122 0.522156L6.99784 5.64632L1.87368 0.522156L0.581177 1.81466L5.70534 6.93882L0.581177 12.063L1.87368 13.3555L6.99784 8.23132L12.122 13.3555L13.4145 12.063L8.29034 6.93882L13.4145 1.81466Z" fill="#979797"/>
                      </svg>
                      <div class="flex flex-1 flex-col justify-center max-full">
                          <svg class="mx-auto mt-4 mb-2" width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="0.08" fill-rule="evenodd" clip-rule="evenodd" d="M34 -1.03315e-06C52.7782 -1.03315e-06 68 15.2231 68 33.9992C68 52.7769 52.7782 68 34 68C15.2218 68 0 52.7769 0 33.9992C0 15.2231 15.2218 -1.03315e-06 34 -1.03315e-06Z" fill="#DD1003"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.059 19.0996H40.741L49.7 28.0586V40.7406L40.741 49.6996H28.059L19.1 40.7406V28.0586L28.059 19.0996ZM39.33 46.2996L46.3 39.3296V29.4696L39.33 22.4996H29.47L22.5 29.4696V39.3296L29.47 46.2996H39.33ZM34.4 39.4996C33.4611 39.4996 32.7 40.2607 32.7 41.1996C32.7 42.1385 33.4611 42.8996 34.4 42.8996C35.3389 42.8996 36.1 42.1385 36.1 41.1996C36.1 40.2607 35.3389 39.4996 34.4 39.4996ZM36.1 25.8996H32.7V37.7996H36.1V25.8996Z" fill="#DD1003"/>
                          </svg>
                              
                          <div class="flex flex-col space-y-5 text-left mb-6 mt-4 text-center">
                              <h2 class="text-2xl md:text-2xl font-bold">{{title}}</h2>
                              <p class="text-gray-800 mt-10 ">
                                <div v-html="caption"></div>
                              </p>
                          </div>
                          <div class="flex justify-end items-center mt-2">
                                <button @click="closeModal()" class="btn cursor-pointer mr-2" >Cancel</button>
                                <button @click="confirm()" :disabled="isRequesting ? true : false" :class="isRequesting ? 'cursor-not-allowed' : ''" class="btn btn-primary mt-0 text-white shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 flex item-center justify-center w-[150px]">
                                    <span v-if="!isRequesting">Confirm</span>
                                    <span v-if="isRequesting" class="w-6 h-6 inline-block">
                                        <svg class="w-full h-full" viewBox="-2 -2 42 42" xmlns="http://www.w3.org/2000/svg" stroke="white"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="4"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
                                        <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g>
                                        </svg>
                                    </span>
                                </button>
                          </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
    </template>
</template>

<script>
    import { ref } from 'vue';
    import { useVuelidate } from "@vuelidate/core";
    import { required, email, minLength } from "@vuelidate/validators";
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

    /* VUEX */
    import { mapActions, mapMutations } from "vuex";
    
    export default {
            props: ['isOpen','title','caption'],
            setup() {
              return { 
                $v: useVuelidate(),
              };
            },
            data: function() {
                return {
                    isUnmask: false,
                    form: {
                        password: "",
                    },
                    isRequesting: false,
                    formSubmitted: false,
                  };
            },
            validations: {
                form: {
                  password: { required },
                },
            },
            components: {
                TransitionRoot,
                TransitionChild,
                Dialog,
                DialogPanel,
                DialogTitle
            },
            updated() {
              this.isRequesting = false;
            },
            methods: {
                confirm(){
                  this.isRequesting = true;
                    this.$emit('confirm')
                },
                closeModal(){
                    this.$emit('closeModal', false)
                },
            },
    }
</script>
  