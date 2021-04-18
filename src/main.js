import { createApp } from 'vue';


import App from './App.vue';
import router from './router';

require('../node_modules/blueprint-css/dist/blueprint.css');

createApp(App).use(router).mount('#app');
