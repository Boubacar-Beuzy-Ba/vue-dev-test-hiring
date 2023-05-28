import { defineStore } from "pinia";

export const useMovieStore = defineStore("MovieStore", {
    //state
    state: () => {
        return {
            search: '',
            movies: [],
            apiKey: '18951a20',
            releasedYear: '',
            totalResults:'',
            page: 1,
            movieDetail: [],
            numbers: [
                {number: 1, fill: false},
                {number: 2, fill: false},
                {number: 3, fill: false},
                {number: 4, fill: false},
                {number: 5, fill: false}
            ],
            maxRating: 5
        }
    },
    //actions
    actions: {
        fill() {
            const searchQuery = "Marvel";
            fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&s=${searchQuery}&page=${this.page}`)
            .then(res => res.json())
            .then(data => {
                this.totalResults = data.totalResults;
                console.log(data)
                if (data.Response === "True") {
                    this.movies = data.Search;
                    console.log(this.movies);
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
            const q = this.search == 'number' ? 'y' : 's';
            fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&${q}=${this.search}&page=${this.page}`)
            .then(res => res.json())
            .then(data => {
              console.log(data.totalResults)
                if (data.Response === "True") {
                    this.movies = data.Search;
                    this.totalResults = parseInt(data.totalResults);
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
        getMovie(id) {
            fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&i=${id}&page=${this.page}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.Response === "True") {
                    this.movieDetail = data;
                    console.log(this.movieDetail);
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

        rateNumber(index) {
            for (let i = 0; i < index; i++) {
                this.numbers[i].fill = i <= index - 1;
            }
        }
    }

    //getters
})