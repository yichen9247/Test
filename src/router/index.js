
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/pages/HomeView.vue")
    },
    {
      path: '/screen',
      name: 'screen',
      component: () => import("@/pages/ScreenView.vue")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/pages/LoginView.vue")
    },
    {
      path: '/task',
      name: 'task',
      component: () => import("@/pages/Index/TasklistView.vue")
    },
    {
      path: '/person/:id',
      name: 'person',
      component: () => import("@/pages/Person/Index.vue")
    },
    {
      path: '/classreport/:id',
      name: 'classreport',
      component: () => import("@/pages/ClassReport/Index.vue")
    }
  ]
})

export default router