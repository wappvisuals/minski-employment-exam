import endpoints from '../config/endpoints'
import axiosinstance from '../config/axiosinstance';
import stringInject from 'stringinject';

export default {
    namespaced: true,
    state:{
        interest: null,
        client_details: null,
    },
    mutations: {
        'SET_INTEREST'(state: any, payload: any){
            state.interest = payload
        }
    },
    getters: {
        'GET_INTEREST_GETTER': (state : any) => {
            if(state.interest){
                return state.interest;
            }
        }
    },
    actions: {
        'GET_INTEREST_ACTION'(context: any){
            return new Promise((resolve, reject) => {
                axiosinstance.get(endpoints.get_interest, {})
                .then(function (response) {
                    if(response.status === 200){
                        context.commit('SET_INTEREST', response.data.result);
                        resolve(response)
                    }
                })
                .catch(function (error : any) {
                    reject(error);
                })
            });
        }
    },
}