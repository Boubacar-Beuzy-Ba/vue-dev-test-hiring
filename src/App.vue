<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MovieList from './components/MovieList.vue'
</script>

<template>
  <header>
    <div class=" mx-12 mt-12 text-center">
      <movie-list></movie-list>
    </div>
  </header>

  <RouterView />
</template>

