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
            fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&${q}=${this.search}`)
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
            searchMoviesByIds(ids) { // Pass an array of IDs as argument
            const apiKey = '18951a20';
        
            // Map array of IDs to an array of fetch promises
            const fetchPromises = ids.map(id =>
              fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
                .then(res => res.json())
            );
        
            // Wait for all promises to resolve
            Promise.all(fetchPromises)
              .then(data => {
                // Process movie details for each movie
                const movies = data.map(movieData => {
                  if (movieData.Response === 'True') {
                    return movieData;
                  } else {
                    // Handle error response
                    console.error(`Error fetching movie with ID ${movieData.imdbID}: ${movieData.Error}`);
                    return null;
                  }
                });
        
                // Filter out null values (error responses)
                const filteredMovies = movies.filter(movie => movie !== null);
        
                this.movies = filteredMovies;
                console.log(this.movies);
              })
              .catch(error => {
                // Handle fetch error
                console.error('Error fetching movies:', error);
              });
          }
    }

    //getters
})