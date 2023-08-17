import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';

const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active',
});

router.beforeEach((to, from) => {
    if (to.meta.auth) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath,
            },
        };
    }
});

export default router;
