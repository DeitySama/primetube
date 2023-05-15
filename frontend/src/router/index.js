import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'videos',
      component: () => import('../views/videos.vue')
    },
    {
      path:'/:id',
      component:()=>import('../views/[id].vue')
    }
  ]
})

export default router
