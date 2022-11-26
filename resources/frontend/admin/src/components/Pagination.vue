<!-- Pagination -->
<template>
    <div v-if="data.last_page > 1" class="transition-all duration-150 flex items-center w-full px-4 pb-6 w-2/2 md:w-1/2">
        <div class="my-3">
            <div class="flex items-center justify-end">
                <span class="text-gray-600">Showing {{data.from}} to {{data.to}} of {{data.total}} entries</span>
            </div>
        </div>
    </div>
    <div v-if="data.last_page > 1" class="transition-all duration-150 flex justify-end items-center w-full px-4 pb-6 w-2/2 md:w-1/2">
        <div class="my-3">
            <div class="flex items-center justify-end text-gray-700">
                <button :disabled="data.current_page == 1? true:false"  :class="data.current_page == 1? 'text-gray-400 cursor-not-allowed':''" v-on:click="changePage(data.current_page-1)"  class="flex items-center">
                    <span>Previous</span>
                    <div class="h-8 w-8 mr-1 flex justify-center items-center rounded-full cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left w-4 h-4">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </div>
                </button>
                <div class="flex h-8 font-medium rounded-full pagination">
                    <template v-if="data.current_page !== 1">
                        <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 rounded-full" v-on:click="changePage(1)">1</div>
                        <template v-if="data.current_page - 1 !== 1">
                            <template v-if="data.current_page - 2 !== 1">
                                <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 rounded-full  ">...</div>
                            </template>                                                        
                                <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 rounded-full" v-on:click="changePage(data.current_page-1)">{{data.current_page - 1}}</div>
                        </template>
                    </template>
                    
                    <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 rounded-full active text-white">{{data.current_page}}</div>
                    
                    <template v-if="data.current_page !== data.last_page">
                        <template v-if="data.current_page + 1 !== data.last_page">
                            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 rounded-full" v-on:click="changePage(data.current_page+1)" >{{data.current_page + 1}}</div>
                            <template v-if="data.current_page + 2 !== data.last_page">
                                <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 rounded-full  ">...</div>
                            </template>
                        </template>
                        <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 rounded-full" v-on:click="changePage(data.last_page)">{{data.last_page}}</div>
                    </template>
                </div>
                <button :disabled="data.current_page == data.last_page? true:false"  :class="data.current_page == data.last_page? 'text-gray-400 cursor-not-allowed':''" v-on:click="changePage(data.current_page+1)"  class="flex items-center">
                    <div class="h-8 w-8 ml-1 flex justify-center items-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right w-4 h-4">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                    <span>Next</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default({
    name: 'Pagination',
    props: ['data'],
    components: {
    },
    methods: {
      changePage(page = 1){
          this.$emit('change-page',page);
      }
    },
})
</script>