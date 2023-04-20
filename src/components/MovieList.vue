<template>
    <div class="flex bg-rose-100 max-w-12 min-h-12 my-4 p-4">
        <input v-model="search" @keyup.enter="searchMovies" type="text" placeholder="Search for a movie" class="w-full h-12 p-4 outline-none md:text-lg text-base text-black">
    </div>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-2 space-y-2 items-center">
        <div v-for="(item, index) in movies" :key="index" class="max-w-96 min-h-full flex flex-col item-center content-center">
            <img :src="item.Poster" :alt="item.Title" class="">
            <div class="text-center">
                <h1>{{ item.Title }}</h1>
                <p>{{ item.Year }}</p>
                <p></p>
            </div>
        </div>
    </div>
</template>

<script>
 import { useMovieStore } from '../stores/MovieStore';
 import { mapState, mapActions, mapWritableState } from 'pinia';

    export default {
        data() {
            return {
                apiKey: '18951a20'
            }
        },
         computed: {
            ...mapState(useMovieStore, ['movies']),
            ...mapWritableState(useMovieStore, ['search'])
        },
        methods: {
            ...mapActions(useMovieStore, ['searchMovies'])
        },
    }
</script>