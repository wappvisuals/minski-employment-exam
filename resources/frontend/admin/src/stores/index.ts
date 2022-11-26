import { createStore } from 'vuex';
import alerts from './alerts';
import auth from './auth';
import user from './user';
import client from './client';
import interest from './interest';

const store = createStore({
    modules: {
        alerts: alerts,
        auth: auth,
        user: user,
        client: client,
        interest: interest
    },
    state: {

    },
    mutations: {
    
    }
})

export default store;