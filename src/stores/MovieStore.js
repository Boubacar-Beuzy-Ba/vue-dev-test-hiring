import { defineStore } from "pinia";

export const useMovieStore = defineStore("MovieStore", {
    //state
    state: () => {
        return {
            search: '',
            movies: [],
            apiKey: '18951a20'
        }
    },
    //actions
    actions: {
        fill() {
            const searchQuery = "Marvel";

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
    }

    //getters
})