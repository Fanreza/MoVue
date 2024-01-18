import { useAuthStores } from '@/stores/auth.stores'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('../views/HomePage.vue')
    },

    {
      path: '/movies',
      name: 'MoviePage',
      component: () => import('../views/MoviePage.vue')
    },

    {
      path: '/search',
      name: 'SearchPage',
      component: () => import('../views/SearchPage.vue')
    },

    {
      path: '/tv-shows',
      name: 'TvPage',
      component: () => import('../views/TvPage.vue')
    },

    {
      path: '/movies/:id',
      name: 'DetailMoviePage',
      component: () => import('../views/DetailMoviePage.vue')
    },

    {
      path: '/tv-shows/:id',
      name: 'DetailTvShowPage',
      component: () => import('../views/DetailTvPage.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useAuthStores()

  await userStore.getAuthDetail()

  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

// temporaly fix vite build error
router.onError((error, to) => {
  const errors = ['dynamically imported module', 'Unable to preload CSS']

  if (errors.some((e) => error.message.includes(e))) {
    window.location.href = to.fullPath
  }
})

export default router
