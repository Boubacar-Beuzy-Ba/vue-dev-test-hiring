<template>
    <div class="flex bg-rose-100 max-w-12 min-h-12 my-4 p-4">
        <input v-model="search" @keyup.enter="searchMovies" type="text" placeholder="Search for a movie" class="w-full h-12 p-4 outline-none text-lg text-black">
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
    export default {
        data() {
            return {
                movies: [],
                search: '',
                apiKey: '18951a20'
            }
        },
        methods: {
            searchMovies() {
                fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&s=${this.search}`)
                .then(res => res.json())
                .then(data => {
                    if (data.Response === "True") {
                        this.movies = data.Search;
                        console.log(this.movies)
                    } else {
                        // Handle error response
                        console.error("Error fetching movies:", data.Error);
                    }
                })
                .catch(error => {
                    // Handle fetch error
                    console.error("Error fetching movies:", error);
                });
            }
        },

        mounted() {
            const searchQuery = "Marvel"

            fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&s=${searchQuery}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === "True") {
                    this.movies = data.Search;
                    console.log(this.movies)
                } else {
                    // Handle error response
                    console.error("Error fetching movies:", data.Error);
                }
            })
            .catch(error => {
                // Handle fetch error
                console.error("Error fetching movies:", error);
            });
        },
    }
</script>