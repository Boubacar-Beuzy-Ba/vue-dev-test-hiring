<template>
    <div class="m-4 relative md:max-w-6xl mx-auto">
        <div class="flex flex-col sm:flex-row px-4">
                <img :src="movieDetail.Poster" :alt="movieDetail.Title" class="rounded-lg">
                <p class="rounded-full p-2 w-fit bg-yellow-300 absolute top-1 left-5">{{ movieDetail.imdbRating }}</p>
            <div class="text-center pt-6 flex flex-col justify-center items-center content-center">
                <h1 class="text-3xl">{{ movieDetail.Title }}</h1>
                <p class="text-lg mx-6 my-5">{{ movieDetail.Plot }}</p>
                <p class="badge">{{ movieDetail.Genre }}</p>
                <div class="rating my-4">
                    <input type="radio" name="rating-1" class="mask mask-star bg-warning" id="1" @click="clicked"/>
                    <input type="radio" name="rating-1" class="mask mask-star bg-warning" id="2" checked />
                    <input type="radio" name="rating-1" class="mask mask-star bg-warning" id="3" />
                    <input type="radio" name="rating-1" class="mask mask-star bg-warning" id="4" />
                    <input type="radio" name="rating-1" class="mask mask-star bg-warning" id="5" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useMovieStore } from '../../stores/MovieStore'
import { mapActions, mapState, mapWritableState } from 'pinia'
    export default {
        computed: {
            ...mapWritableState(useMovieStore, ['movieDetail'])
        },
        methods: {
            ...mapActions(useMovieStore, ['getMovie']),
            clicked() {
                if(event) {
                    console.log(event.target.id)
                }
            }
        },
        mounted() {
             this.getMovie(this.$route.params.id)
        },
    }
</script>
