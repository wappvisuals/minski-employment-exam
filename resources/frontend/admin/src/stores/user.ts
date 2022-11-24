import endpoints from '../config/endpoints'
import axiosinstance from '../config/axiosinstance';

export default {
    namespaced: true,
    state:{
        user_data: null,
        get_copy_link_profile: null,
        supplier_details: null
    },
    mutations: {
        'SET_USER_DETAILS'(state: any, payload: any){
            localStorage.setItem("user_data", JSON.stringify(payload));
            state.user_data = payload
        }
    },
    getters: {
        'GET_USER_DETAILS_GETTER': (state : any) => {
            // return state.user_data
            let data = JSON.parse( localStorage.getItem("user_data") || '{}');
            if(state.user_data){
                data = state.user_data;
            }

            if(!data || typeof data === 'undefined'){
                window.location.href = "/login";
            }

            return data;
        },
        'GET_WEB_NOTIFICATION_SETTINGS': (state : any) => {
            if(state.user_data){
                return !!state.user_data.web_notification;
            }
        },
        'GET_MAIL_NOTIFICATION_SETTINGS': (state : any) => {
            if(state.user_data){
                return !!state.user_data.mail_notification;
            }
        }
    },
    actions: {
        'SET_USER_DETAILS_ACTION'(context: any, payload: any){
            return new Promise((resolve) => {
                context.commit('SET_USER_DETAILS', payload);
                resolve('User Data Updated');
            });
        },
        'GET_PROFILE_ACTION'( context : any){
            return new Promise((resolve, reject) => {
                axiosinstance.get(endpoints.get_profile, {})
                .then(function (response) {
                    if(response.status === 200){
                        context.commit('SET_USER_DETAILS', response.data.result.user);
                        resolve(response)
                    }
                })
                .catch(function (error) {
                    reject(error);
                })
            });
        },
        'UPDATE_USER_PROFILE_ACTION'( context: any, payload : any){
            return new Promise((resolve, reject) => {
                axiosinstance.post(endpoints.update_profile, payload)
                .then(function (response) {
                    if(response.status === 200){
                        context.commit('SET_USER_DETAILS', response.data.result.user);
                        resolve(response)
                    }
                })
                .catch(function (error : any) {
                    reject(error);
                })
            });
        },
        'UPDATE_NOTIFICATION_SETTINGS_ACTION'(context : any, payload : any){
            return new Promise((resolve, reject) => {
                axiosinstance.put(endpoints.web_notification_settings, payload)
                .then(function (response) {
                    if(response.status === 200){
                        setTimeout(() => {
                            resolve(response)
                        }, 500);
                    }
                })
                .catch(function (error) {
                    reject(error);
                })
            });
        },
        'UPDATE_MAIL_NOTIFICATION_SETTINGS_ACTION'(context : any, payload : any){
            return new Promise((resolve, reject) => {
                axiosinstance.put(endpoints.mail_notification_settings, payload)
                .then(function (response) {
                    if(response.status === 200){
                        setTimeout(() => {
                            resolve(response)
                        }, 500);
                    }
                })
                .catch(function (error) {
                    reject(error);
                })
            });
        }
    },
}