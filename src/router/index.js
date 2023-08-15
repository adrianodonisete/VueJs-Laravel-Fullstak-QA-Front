import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';

export default createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active',
});
