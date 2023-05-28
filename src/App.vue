<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MovieList from './components/MovieList.vue'
import { useMovieStore } from './stores/MovieStore';
const movieStore = useMovieStore();
</script>

<template>
  <header>
    <div class="text-center">
      <router-link to="/" class="btn btn-link no-underline text-black dark:text-white mt-2">Home</router-link>
      <RouterView />
    </div>
  </header>
</template>

