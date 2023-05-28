<template>
  <div class="m-4 relative md:max-w-6xl mx-auto">
    <div class="flex flex-col sm:flex-row px-4">
      <img
        :src="movieDetail.Poster"
        :alt="movieDetail.Title"
        class="rounded-lg"
      />
      <p class="rounded-full p-2 w-fit dark:text-black bg-yellow-300 absolute top-1 left-5">
        {{ movieDetail.imdbRating }}
      </p>
      <div
        class="text-center pt-6 flex flex-col justify-center items-center content-center dark:text-white"
      >
        <h1 class="text-3xl">{{ movieDetail.Title }}</h1>
        <p class="text-lg mx-6 my-5">{{ movieDetail.Plot }}</p>
        <p class="badge">{{ movieDetail.Genre }}</p>
        <div class="mx-auto mb-8 mt-8 flex flex-row justify-around">
          <button
            v-for="(number) in numbers"
            @click="rateNumber(number.number)"
            :key="number"
            class="btnClicked w-auto h-12 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              :class="[
                number.fill ? 'w-6 h-6 text-black fill-yellow-300' : 'w-6 h-6 text-black hover:fill-yellow-300 hover:text-yellow-300'
                ]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMovieStore } from "../../stores/MovieStore";
import { mapActions, mapState, mapWritableState } from "pinia";
export default {
  computed: {
    ...mapWritableState(useMovieStore, ["movieDetail", ["numbers"]]),
  },
  methods: {
    ...mapActions(useMovieStore, ["getMovie", "rateNumber"]),
    clicked() {
      if (event.type === "click") {
        localStorage.setItem("checked", true);
      }
    },
  },
  mounted() {
    this.getMovie(this.$route.params.id);
  },
};
</script>
