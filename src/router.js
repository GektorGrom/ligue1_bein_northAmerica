import {createRouter, createWebHistory} from 'vue-router';
import RootPage from './views/RootPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: RootPage,
  },
  {
    path: '/matches/:date',
    name: 'particular',
    component: RootPage,
  },
];
export default createRouter({
  history: createWebHistory(),
  routes
})
