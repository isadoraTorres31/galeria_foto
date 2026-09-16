import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { estaAutenticado } from '@/services/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/cadastro',
    component: () => import('@/views/CadastroPage.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/HomePage.vue'),
    meta: { requerAuth: true }
  },
  {
    path: '/sobre',
    component: () => import('@/views/SobrePage.vue'),
    meta: { requerAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guarda de rota: bloqueia acesso a telas que exigem login
router.beforeEach((to) => {
  if (to.meta.requerAuth && !estaAutenticado()) {
    return '/login';
  }

  return true;
});

export default router