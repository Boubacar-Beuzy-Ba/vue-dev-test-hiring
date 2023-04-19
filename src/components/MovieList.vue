<template>
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
                movies: []
            }
        },

        mounted() {
            const apiKey = "18951a20"
            const searchQuery = "Marvel"

            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
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