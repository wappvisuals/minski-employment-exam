import endpoints from '../config/endpoints'
import axiosinstance from '../config/axiosinstance';

export default {
    namespaced: true,
    state:{
        user_data: null,
    },
    mutations: {
        'SET_USER_DETAILS'(state: any, payload: any){
            localStorage.setItem("user_data", JSON.stringify(payload));
            state.user_data = payload
        }
    },
    getters: {
        'GET_USER_DETAILS_GETTER': (state : any) => {
            let data = JSON.parse( localStorage.getItem("user_data") || '{}');
            if(state.user_data){
                data = state.user_data;
            }

            if(!data || typeof data === 'undefined'){
                window.location.href = "/login";
            }

            return data;
        },
    },
    actions: {
        'SET_USER_DETAILS_ACTION'(context: any, payload: any){
            return new Promise((resolve) => {
                context.commit('SET_USER_DETAILS', payload);
                resolve('User Data Updated');
            });
        },
    },
}