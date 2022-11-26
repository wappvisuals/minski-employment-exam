import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from "./stores";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import './assets/main.css'

import lang from './helpers/lang';
import date from './helpers/date';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store);
app.component('Datepicker', Datepicker);

app.mount('#app')

app.config.globalProperties.$lang = lang;
app.config.globalProperties.$date = date;