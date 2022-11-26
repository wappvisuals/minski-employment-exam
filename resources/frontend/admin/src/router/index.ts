import store from '../stores';

import PageNotFound from '@/components/404.vue';

import LoginViewVue from '@/views/auth/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ClientListVue from '@/views/clients/ClientList.vue';
import LayoutVue from '@/layouts/Layout.vue';
import UpdateClientVue from '@/views/clients/UpdateClient.vue';
import CreateClientVue from '@/views/clients/CreateClient.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginViewVue,
      meta: {auth: false},
    },
    {
      path: '/logout',
      name: 'logout',
      meta: {auth: true},
      component: LoginViewVue
    },
    {
      path: '',
      name: 'layout',
      meta: {auth: true},
      component: LayoutVue,
      children: [
        {
          path: "/clients",
          name: "clients",
          component: ClientListVue,
          meta: {auth: true},
        },
        {
          path: "/clients/:id/edit",
          name: "edit-client",
          component: UpdateClientVue,
          meta: {auth: true},
        },
        {
          path: "/clients/create",
          name: "create-client",
          component: CreateClientVue,
          meta: {auth: true},
        }
      ]
    },
    { 
      path: "/:catchAll(.*)",
      name: "notfound",
      component: PageNotFound
    },  
  ]
})

router.beforeEach(async (to, from, next) => {

  if(to.name === 'logout'){
      store.dispatch(`auth/LOGOUT_ACTION`);
      next('/login');
  }else{

        if(to.name && to.name == 'login')
        {
            if(store.getters[`auth/IS_USER_AUTHENTICATE_GETTER`]){
                next(import.meta.env.VITE_APP_BASEURL+'/clients')
            }
        }

      if(typeof to.meta.auth === 'undefined'){
          next();
      }else{
          if(to.meta.auth){
              if(!store.getters[`auth/IS_USER_AUTHENTICATE_GETTER`]){
                  next(import.meta.env.VITE_APP_BASEURL+'/login')
              }else{
                  next();
              }
          }else if(!to.meta.auth){
              next();
          }
      }
  }
  
});
router.afterEach(() => {
  window.scrollTo(0, 0)
});


export default router
