import endpoints from '../config/endpoints'
import axiosinstance from '../config/axiosinstance';
import stringInject from 'stringinject';

export default {
    namespaced: true,
    state:{
        clients: null,
        client_details: null,
    },
    mutations: {
        'SET_CLIENTS'(state: any, payload: any){
            state.clients = payload
        },
        'SET_CLIENT_DETAILS'(state: any, payload: any){
            state.client_details = payload
        }
    },
    getters: {
        'GET_CLIENTS_GETTER': (state : any) => {
            if(state.clients){
                return state.clients;
            }
        },
        'GET_CLIENT_DETAILS_GETTER': (state : any) => {
            if(state.client_details){
                return state.client_details;
            }
        },
    },
    actions: {
        'CREATE_CLIENT_ACTION'(context: any, payload: any){
            return new Promise((resolve, reject) => {
                axiosinstance.post(endpoints.create_client, payload)
                .then(function (response) {
                    if(response.status === 200){
                        resolve(response)
                    }
                })
                .catch(function (error : any) {
                    reject(error);
                })
            });
        },
        'UPDATE_CLIENT_ACTION'(context: any, args: any){
            return new Promise((resolve, reject) => {
                axiosinstance.post(stringInject(endpoints.update_client, args.param), args.payload)
                .then(function (response) {
                    if(response.status === 200){
                        resolve(response)
                    }
                })
                .catch(function (error : any) {
                    reject(error);
                })
            });
        },
        'DELETE_CLIENT_ACTION'(context: any, payload: any){
            return new Promise((resolve, reject) => {
                axiosinstance.delete(stringInject(endpoints.delete_client, payload.param))
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error : any) {
                    reject(error);
                })
            });
        },
        'GET_CLIENTS_ACTION'(context: any, payload: any){
            return new Promise((resolve, reject) => {
                axiosinstance.get(endpoints.get_clients, {params: payload})
                .then(function (response) {
                    if(response.status === 200){
                        context.commit('SET_CLIENTS', response.data.result);
                        resolve(response)
                    }
                })
                .catch(function (error : any) {
                    reject(error);
                })
            });
        },
        'GET_CLIENT_DETAILS_ACTION'(context: any, param: any){
            return new Promise((resolve, reject) => {
                axiosinstance.get(stringInject(endpoints.get_client, param.id))
                .then(function (response) {
                    if(response.status === 200){
                        context.commit('SET_CLIENT_DETAILS', response.data.result);
                    }
                    resolve(response)
                })
                .catch(function (error : any) {
                    reject(error);
                })
            });
        }
    },
}