import { createStore } from 'vuex';
import alerts from './alerts';
import auth from './auth';
import user from './user';


const store = createStore({
    modules: {
        alerts: alerts,
        auth: auth,
        user: user,
    },
    state: {

    },
    mutations: {
    
    }
})

export default store;