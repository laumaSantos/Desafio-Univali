import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductListView.vue'),
    },
    {
      path: '/products/new',
      name: 'productsNew',
      component: () => import('../views/CreateProductView.vue'),
    },
    {
      path: '/products/:id',
      name: 'productsEdit',
      component: () => import('../views/CreateProductView.vue'),
      props: true,
    },
  ],
})

export default router
