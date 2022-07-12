import axios from 'axios';
import {createApp} from 'vue'
import App from './App.vue'
import router from './routes'; //설정 라우터 호출

const app = createApp(App);
app.use(router);
app.mount('#app');
app.config.globalProperties.$axios = axios;