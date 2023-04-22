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
            page: 1
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

        searchMoviesbyYear() {
            fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&y=${this.releasedYear}`)
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

        searchMoviesByGenre() {
            const apiKey = '18951a20';
            const searchQuery = 'Marvel';
            const genre = 'action'; // Replace with the desired genre
        
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
              .then(res => res.json())
              .then(data => {
                if (data.Response === 'True') {
                  // Filter movies by genre
                  const filteredMovies = data.Search.filter(movie => movie.Genre && movie.Genre.includes(genre)); // Add null/undefined check
                  this.movies = filteredMovies;
                  console.log(this.movies);
                } else {
                  // Handle error response
                  console.error('Error fetching movies:', data.Error);
                }
              })
              .catch(error => {
                // Handle fetch error
                console.error('Error fetching movies:', error);
              });
          },
          
    }

    //getters
})