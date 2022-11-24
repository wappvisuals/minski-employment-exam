import endpoints from '../config/endpoints'
import axiosinstance from '../config/axiosinstance';

export default {
    namespaced: true,
    state: () => ({
        _token: null
    }),
    getters: {
        IS_USER_AUTHENTICATE_GETTER: (state : any) => {
            return !!(localStorage.getItem('_token') || state._token);
        }
    },
    actions: {
        LOGIN_ACTION(context:any, payload : any) {
            return new Promise((resolve, reject) => {
                axiosinstance.post(endpoints.login, payload).then(function (response) {
                    if(response.status === 200){
                        resolve(response)
                    }
                })
                .catch(function (error) {
                    reject(error);
                })
            });
        },
        SIGNUP_ACTION(context:any, payload:any){
            return new Promise((resolve, reject) => {
                axiosinstance.post(endpoints.signup, payload)
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error);
                })
            });
        },
        LOGOUT_ACTION(context:any){
            return new Promise((resolve) => {
                context.commit('REMOVE_USER_TOKEN');
                resolve('logout')
            });
        }
    },
    mutations: {
        SET_USER_TOKEN(state: any, payload: any){
            state._token = payload
        },
        REMOVE_USER_TOKEN(state: any){
            state._token = null;
            localStorage.removeItem('_token');
            localStorage.removeItem('user_data');
        }
    }
}
