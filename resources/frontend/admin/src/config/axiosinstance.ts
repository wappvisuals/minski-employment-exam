import axios from 'axios';
import store from '../stores'
import endpoints from './endpoints'

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

const axiosinstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    headers: {
        'Content-Type' : "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
    },
    cancelToken: source.token
});

axiosinstance.interceptors.request.use(
    function(config : any){
        let excluded_url = [endpoints.login, endpoints.signup];
        if(!excluded_url.includes(config.url)){
            config.headers.Authorization = 'bearer '+localStorage.getItem('_token');
        }
        //Do something before request is sent
        return config;   
    },
    function(error){
        //Do something with request error
        console.log('errors', error)
        return Promise.reject(error);
    }
)

axiosinstance.interceptors.response.use(
    function(response){
        // Do something with response data
        let res = {
            data: response.data,
            status: response.status,
            statusText: response.statusText
        }
        if(response.config.method === 'post'){
            let type = 'danger';
            if(res.status === 200){
                type = 'success';
            }

            if(typeof response.data.message !== 'undefined' || response.data.message){
                store.commit('alerts/addAlert', {message: response.data.message, type: type})
            }
        }
        return res;
    },
    function(error){
        //Do something with request error

        if(error.code == 'ERR_NETWORK'){
            let err = {
                data: error.response.data,
                status: error.response.status,
                statusText: error.response.statusText
            };
            store.commit('alerts/addAlert', {message: 'Cannot connect to the network', type: 'danger'})
            localStorage.removeItem('_token');
            return Promise.reject(err);
        }

        let err = {
            data: error.response.data,
            status: error.response.status,
            statusText: error.response.statusText
        }
        
        let message = 'Something went wrong';

        if(typeof err.data.message !== 'undefined'){
            message = err.data.message;
        }

        if(error.response.status === 401 && error.response.config.url !== endpoints.login){
            store.commit('alerts/addAlert', {message: 'Your session has been expired. Please refresh and try to login again.', type: 'danger'})
            localStorage.removeItem('_token');
            setTimeout(() => {
                window.location.href = import.meta.env.VITE_APP_BASEURL+"/login";
            }, 2000);
        }

        if(error.response.config.method === 'post'){
            store.commit('alerts/addAlert', {message: message, type: 'danger'})
        }
        
        return Promise.reject(err);
    }
)


export default axiosinstance;