<template>
    <div class="mx-12">

        <div class="flex flex-col md:flex-row justify-evenly gap-2 bg-rose-100 max-w-12 md:w-1/2 items-center content-center min-h-12 mx-auto my-4 p-4">
            <input v-model="search" @keyup.enter="searchMovies" type="text" placeholder="Search a movie by Title" class="form-input border-none w-full h-12 p-4 outline-none md:text-lg text-base text-black">
            <!-- <input v-model="releasedYear" @keyup.enter="searchMoviesbyYear" type="text" placeholder="Search a movie by Year" class="border-none form-input w-full h-12 p-4 outline-none md:text-lg text-base text-black">
            <select @change="searchMoviesByGenre" name="genre" id="genre" class="w-full h-12 form-select rounded-lg border-none">
                <option value=""></option>
                <option :value="genre">Action</option>
            </select> -->
        </div>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-2 space-y-2 items-center">
            <div v-for="(item, index) in movies" :key="index" class="max-w-96 min-h-full flex flex-col item-center content-center relative">
                <img :src="item.Poster === 'N/A' ? 'https://media.istockphoto.com/id/1191001701/photo/popcorn-and-clapperboard.jpg?s=612x612&w=0&k=20&c=iUkFTVuU8k-UCcZDxczTWs6gkRa0nAMihp2Jf_2ASKM=': item.Poster" :alt="item.Title" class="w-[500px] rounded-lg">
                <p class="absolute top-1 right-1 bg-yellow-200 p-1 rounded-full">{{ item.Year }}</p>
                <div class="text-center my-2">
                    <h1 class="font-semibold text-lg">{{ item.Title }}</h1>
                    <router-link :to='/movies/+item.imdbID' class="btn btn-outline my-2">More Details ...</router-link>
                </div>
            </div>
        </div>
        <!-- Pagination UI -->
        <div class="btn-group flex justify-center my-4 gap-2 content-center items-center">
          <button
            @click="previous"
            :disabled="page === 1"
            class="btn px-4 py-2  rounded-l"
          >
          «
          </button>
          <button class="btn btn-active">{{ this.page }}</button>
          <button class="btn">{{ parseInt(this.totalResults/10) }}</button>
          <button
            @click="next"
            :disabled="page === totalResults"
            class="btn px-4 py-2  rounded-r"
          >
          »
          </button>
        </div>
    </div>
</template>

<script>
 import { useMovieStore } from '../stores/MovieStore';
 import { mapState, mapActions, mapWritableState } from 'pinia';

    export default {
        data() {
            return {
                genre: 'action'
            }
        },
         computed: {
            ...mapState(useMovieStore, ['movies']),
            ...mapWritableState(useMovieStore, ['search', 'releasedYear', 'page', 'totalResults']),
            pages() {
                console.log(parseInt(this.totalResults/10))
            }
        },
        methods: {
            ...mapActions(useMovieStore, ['searchMovies', 'fill', 'getMovie']),
            previous() {
                if(this.page > 1) {
                    this.page--;
                    this.$nextTick(() => {
                        this.search === '' ? this.fill() : this.searchMovies();
                    });
                }
            },
            next() {
                const currentPage = parseInt(this.page);
                const totalResults = parseInt(this.totalResults);
                if (currentPage < totalResults) {
                    this.page++;
                    this.$nextTick(() => {
                    this.search === '' ? this.fill() : this.searchMovies();
                    });
                } else {
                    this.page = this.totalResults; // set page to totalResults to prevent going over the limit
                }
            }
        },
        mounted() {
            this.fill()
        },
    }
</script>