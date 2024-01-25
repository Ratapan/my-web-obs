import { createApp } from 'vue'
import App from './App.vue'
import {router} from './config/router';
import './assets/style/main.css'

const app = createApp(App)

app.use(router);

app.mount('#app');
