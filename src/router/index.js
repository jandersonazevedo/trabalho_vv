import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SimularLocacao from '../views/SimularLocacaoView.vue';
import SimularPreAprovacao from '../views/SimularPreAprovacao.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/simular_locacao',
    name: 'simularLocacao',
    component: SimularLocacao
  },
  {
    path: '/simular_pre_aprovacao',
    name: 'simularPreAprovacao',
    component: SimularPreAprovacao
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
