import Vue from 'vue';


import App from './App.vue';
import router from './router';
import './registerServiceWorker';

require('../node_modules/blueprint-css/dist/blueprint.css');

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
