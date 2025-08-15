import { createRouter, createWebHashHistory } from 'vue-router'
import { trackPageView } from '@/utils/google.analytics'

const routes = [
  {
    path: '/pay/:id',
    name: 'Pay',
    component: () => import('../views/pay.vue')
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: () => import('../views/result.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由守卫 - 页面访问跟踪
router.afterEach((to) => {
  // 获取页面名称
  const pageName = to.name as string || to.path
  
  // 跟踪页面访问
  trackPageView({
    country: 'KR', // 根据你的应用设置国家代码
    ui_version: import.meta.env.VITE_APP_VERSION || 'v1.0.0', // 从环境变量获取版本号
    page_name: pageName,
    heartbeatIntervalMs: 15000 // 15秒心跳间隔
  })
})

export default router
