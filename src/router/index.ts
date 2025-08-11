import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductListView from '@/views/ProductListView.vue'
import CreateProductView from '../views/CreateProductView.vue'

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
      component: ProductListView,
    },
    {
      path: '/products/new',
      name: 'productsNew',
      component: CreateProductView,
    },
    {
      path: '/products/:id',
      name: 'productsEdit',
      component: CreateProductView,
      props: true,
    },
  ],
})

export default router
