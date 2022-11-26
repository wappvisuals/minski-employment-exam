<template>
    
    <div class="flex flex-wrap">
        <div class="w-full px-3">
          <div class="flex flex-row flex-wrap justify-between mb-5">
            <div class="w-full lg:w-6/12 p:0 md:pr-16">
                <h4 class="font-bold text-white text-2xl">Manage Booking</h4>
            </div>
            <div class="w-full lg:w-6/12 p:0">
              <router-link :to="{name: 'create-client'}" class="btn inline-block text-white text-sm mr-1 bg-[#0437ed] rounded-lg float-right">
                Add Client
              </router-link>
            </div>
          </div>
          <div class="h-full p-6 bg-[#232b3a] rounded-xl">
            <h4 class="text-lg text-gray-100 font-semibold mb-6" data-config-id="auto-txt-40-2">List of your clients</h4>
            <div class="w-full mt-6 pb-4 overflow-x-auto">
              <template v-if="!isLoading && clients.total">
                    <table class="w-full min-w-max">
                      <thead>
                        <tr class="text-left">
                          <th class="p-0">
                            <div class="py-3 px-6 rounded-l-xl bg-[#1e2431]">
                              <span class="text-xs text-gray-300 font-semibold" data-config-id="auto-txt-41-2">ID</span>
                            </div>
                          </th>
                          <th class="p-0">
                            <div class="py-3 px-6 bg-[#1e2431]">
                              <span class="text-xs text-gray-300 font-semibold" data-config-id="auto-txt-42-2">CLIENT NAME</span>
                            </div>
                          </th>
                          <th class="p-0">
                            <div class="py-3 px-6 bg-[#1e2431]">
                              <button class="inline-flex items-center text-xs text-gray-300 font-semibold">
                                <span class="mr-2" data-config-id="auto-txt-43-2">EMAIL</span>
                                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-12-2">
                                  <path d="M7.8598 8.52669L4.9998 11.3934L2.1398 8.52669C2.01426 8.40115 1.844 8.33063 1.66646 8.33063C1.48893 8.33063 1.31867 8.40115 1.19313 8.52669C1.0676 8.65222 0.99707 8.82249 0.99707 9.00002C0.99707 9.17756 1.0676 9.34782 1.19313 9.47335L4.52646 12.8067C4.58844 12.8692 4.66217 12.9188 4.74341 12.9526C4.82465 12.9865 4.91179 13.0039 4.9998 13.0039C5.08781 13.0039 5.17494 12.9865 5.25618 12.9526C5.33742 12.9188 5.41116 12.8692 5.47313 12.8067L8.80646 9.47335C8.86862 9.41119 8.91793 9.3374 8.95157 9.25619C8.98521 9.17497 9.00252 9.08793 9.00252 9.00002C9.00252 8.91211 8.98521 8.82507 8.95157 8.74385C8.91793 8.66264 8.86862 8.58885 8.80646 8.52669C8.7443 8.46453 8.67051 8.41522 8.5893 8.38158C8.50808 8.34794 8.42104 8.33063 8.33313 8.33063C8.24522 8.33063 8.15818 8.34794 8.07696 8.38158C7.99575 8.41522 7.92196 8.46453 7.8598 8.52669ZM2.1398 5.47335L4.9998 2.60669L7.8598 5.47335C7.92177 5.53584 7.99551 5.58544 8.07675 5.61928C8.15799 5.65313 8.24512 5.67055 8.33313 5.67055C8.42114 5.67055 8.50828 5.65313 8.58952 5.61928C8.67075 5.58544 8.74449 5.53584 8.80646 5.47335C8.86895 5.41138 8.91855 5.33764 8.95239 5.2564C8.98624 5.17517 9.00366 5.08803 9.00366 5.00002C9.00366 4.91201 8.98624 4.82488 8.95239 4.74364C8.91855 4.6624 8.86895 4.58866 8.80646 4.52669L5.47313 1.19335C5.41116 1.13087 5.33742 1.08127 5.25618 1.04743C5.17494 1.01358 5.08781 0.996155 4.9998 0.996155C4.91179 0.996155 4.82465 1.01358 4.74341 1.04743C4.66217 1.08127 4.58844 1.13087 4.52646 1.19335L1.19313 4.52669C1.0676 4.65222 0.99707 4.82249 0.99707 5.00002C0.99707 5.17756 1.0676 5.34782 1.19313 5.47335C1.31867 5.59889 1.48893 5.66941 1.66646 5.66941C1.844 5.66941 2.01426 5.59889 2.1398 5.47335Z" fill="currentColor"></path>
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th class="p-0">
                            <div class="py-3 px-6 bg-[#1e2431]">
                              <button class="inline-flex items-center text-xs text-gray-300 font-semibold">
                                <span class="mr-2" data-config-id="auto-txt-43-2">CONTACT NO.</span>
                              </button>
                            </div>
                          </th>
                          <th class="p-0">
                            <div class="py-3 px-6 bg-[#1e2431]">
                              <button class="inline-flex items-center text-xs text-gray-300 font-semibold">
                                <span class="mr-2" data-config-id="auto-txt-43-2">BIRTHDAY</span>
                              </button>
                            </div>
                          </th>
                          <th class="p-0">
                            <div class="py-3 px-5 rounded-r-xl bg-[#1e2431]">
                              <span class="text-xs text-gray-300 font-semibold" data-config-id="auto-txt-44-2">ACTION</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr  v-for="(item, index) in clients.data">
                          <td class="p-0">
                            <div class="h-16 p-6 rounded-l-xl" :class="index % 2 == 1 ? 'bg-[#1e2431]': ''">
                              <h5 class="text-sm font-medium text-gray-100" data-config-id="auto-txt-45-2">{{item.id}}</h5>
                            </div>
                          </td>
                          <td class="p-0">
                            <div class="h-16 p-6" :class="index % 2 == 1 ? 'bg-[#1e2431]': ''">
                              <div class="flex h-full items-center">
                                <span class="text-sm font-medium text-gray-100" data-config-id="auto-txt-46-2">{{item.first_name + ' ' + item.last_name }}</span>
                              </div>
                            </div>
                          </td>
                          <td class="p-0">
                            <div class="h-16 p-6" :class="index % 2 == 1 ? 'bg-[#1e2431]': ''">
                              <span class="text-sm text-gray-100 font-medium" data-config-id="auto-txt-47-2">{{item.email}}</span>
                            </div>
                          </td>
                          <td class="p-0">
                            <div class="h-16 p-6" :class="index % 2 == 1 ? 'bg-[#1e2431]': ''">
                              <div class="flex h-full items-center">
                                <span class="text-sm font-medium text-gray-100" data-config-id="auto-txt-48-2">{{item.contact_no ? item.contact_no : '--' }}</span>
                              </div>
                            </div>
                          </td>
                          <td class="p-0">
                            <div class="h-16 p-6" :class="index % 2 == 1 ? 'bg-[#1e2431]': ''">
                              <div class="flex h-full items-center">
                                <span class="text-sm font-medium text-gray-100" data-config-id="auto-txt-48-2">{{item.birthdate ? $date.formatDate(item.birthdate, 'MMMM DD, YYYY') : '--' }}</span>
                              </div>
                            </div>
                          </td>
                          <td class="p-0">
                            <div class="h-16 p-6 rounded-r-xl" :class="index % 2 == 1 ? 'bg-[#1e2431]': ''">
                              <button @click="editClient(item)" class="inline-block text-white px-4 py-1 text-sm mr-1 bg-green-500 rounded-lg">Edit</button>
                              <button @click="openConfirmation(item.id)" class="inline-block text-white px-4 py-1 text-sm mr-1 bg-red-500 rounded-lg">Delete</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- start of pagination -->
                    <div class="flex flex-row flex-wrap mt-4">
                          <Pagination
                          v-if="clients"
                          :data="clients"
                          @change-page="getClients"></Pagination>
                    </div>
              </template>
              <template v-if="isLoading">
                  <div class="relative w-full border border-gray-800 p-6 mb-6" v-for="index in 5">
                      <div data-placeholder class="p-2 bg-[#1e2431] overflow-hidden relative w-56 h-5 rounded mb-2 block"></div>
                      <div data-placeholder class="p-2 bg-[#1e2431] overflow-hidden relative w-48 h-5 rounded block mb-6"></div>
                      <div data-placeholder class="p-2 bg-[#1e2431] overflow-hidden relative w-36 h-5 rounded mb-2 block"></div>
                  </div>
              </template>
              <template v-if="clients">
                  <div v-if="!clients.total && !isLoading" class="py-32 text-center w-full">
                  <div class="font-normal not-italic text-lg text-gray-600">
                      <span class="mb-2 block text-lg font-semibold">No clients found</span>
                  </div>
                  </div>
              </template>
            </div>
          </div>
        </div>
    </div>
    <Confirmation title="Delete Client" caption="Are you sure you want to delete this client?" :isOpen="confirmation" @confirm="deleteClient($event)" @closeModal="confirmation = $event"></Confirmation>
</template>


<script>
    import { ref, computed  } from 'vue';

    import { mapActions, mapGetters } from "vuex";
    import Pagination from "../../components/Pagination.vue";

    import Confirmation from "../../components/Confirmation.vue";

    export default {
        setup() {
            return {

            };
        },
        data: function() {
            return {
                isLoading: false,
                sort: "created_at",
                sort_dirc: "asc",
                confirmation: false
            };
        },
        components: {
          Pagination,
          Confirmation
        },
        computed: {
            ...mapGetters("client", {
                clients: 'GET_CLIENTS_GETTER',
            }),
        },
        created(){
            this.getClients();
        },
        methods: {
            async getClients(page = 1) {
                this.isLoading = true;
                let params = {
                    limit: 10,
                    page: page,
                    sort: this.sort,
                    sort_dirc: this.sort_dirc,
                };
                await this._getClientList(params);
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            },
            ...mapActions("client", {
                _getClientList: 'GET_CLIENTS_ACTION',
                _deleteClient: 'DELETE_CLIENT_ACTION'
            }),
            deleteClient(){
                let payload = {
                  param : [this.clientToDelete]
                }
                this._deleteClient(payload).then(async () => {
                    this.isRequesting = false
                    setTimeout(() => {
                      this.confirmation = false
                      this.getClients()
                    }, 1500);
                }).catch((err) => {
                    this.isRequesting = false
                });
            },
            editClient(item){

              const { id, contact_no, birthdate, first_name, last_name, email } = item
              const interest = []
              if(item.interests){
                item.interests.forEach((value, index, array) => {
                  interest.push(value.interest);
                });
              }
              

              this.$store.commit("client/SET_CLIENT_DETAILS", {
                id,
                contact_no,
                birthdate,
                first_name,
                last_name,
                email,
                interest
              })
              this.$router.push({ name: 'edit-client', params : {id : item.id} })
            },
            openConfirmation(id){
              this.clientToDelete = id
              this.confirmation = true
            }
        },
    };
</script>