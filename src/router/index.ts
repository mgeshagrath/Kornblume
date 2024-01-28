import { createRouter, createWebHistory } from 'vue-router'
import { useDataStore } from '../stores/dataStore';
import { useGlobalStore } from '../stores/global';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            meta: {
                requiredJson: []
            }
        },
        {
            path: '/arcanists',
            name: 'arcanists',
            component: () => import('../views/ArcanistsView.vue'),
            meta: {
                requiredJson: ['arcanists', 'items', 'psychubes']
            }
        },
        {
            path: '/tracker',
            name: 'tracker',
            component: () => import('../views/TrackerView.vue'),
            meta: {
                requiredJson: ['arcanists']
            }
        },
        {
            path: '/planner',
            name: 'planner',
            component: () => import('../views/PlannerView.vue'),
            meta: {
                requiredJson: ['arcanists', 'items', 'shops', 'formulas', 'stages', 'stages1_4', 'stages_greedy', 'stages1_4_greedy']
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: {
                requiredJson: []
            }
        },
        {
            path: '/:name',
            name: 'arcanist',
            component: () => import('../components/arcanist/ArcanistInfo.vue'),
            meta: {
                requiredJson: ['arcanists', 'items']
            }
        }
    ]
})

router.beforeEach(async (to) => {
    const dataStore = useDataStore();
    if (to.meta.requiredJson) {
        to.meta.isNavigationPending = true
        await dataStore.checkDataLoaded([...to.meta.requiredJson as string[]]);
    }
})

router.beforeEach((to, from, next) => {
    const globalStore = useGlobalStore();
    globalStore.startLoading();
    next();
});

router.afterEach(() => {
    const globalStore = useGlobalStore();
    globalStore.finishLoading();
});

export default router
