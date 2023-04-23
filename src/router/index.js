import { createRouter, createWebHistory } from 'vue-router'
import MovieDetail from '../views/movies/MovieDetail.vue'
import MovieList from '../components/MovieList.vue'
const router = createRouter({
  routes: [
    {
      path: '/',
      component: MovieList 
    },
    {
      path: '/movies/:id',
      component: MovieDetail
    }
  ],

  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router
