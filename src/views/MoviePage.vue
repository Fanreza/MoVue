<script setup lang="ts">
import type { MovieDataModel } from '@/models/movie.model'

const dataMovies = ref<MovieDataModel[] | null>(null)
const getMovieLoading = ref(false)
const getMovieError = ref<null | string>(null)
const getMovies = async () => {
  try {
    const response = await useHttp.get('/discover/movie')
    dataMovies.value = response.data.results
  } catch (error) {
    getMovieError.value = error as string
  }
}

onMounted(() => {
  getMovies()
})
</script>

<template>
  <div>
    <MainNavbar />

    <div class="grid grid-cols-8 gap-10 p-10">
      <template v-if="dataMovies">
        <MovieCard
          v-for="data in dataMovies"
          :data="data"
          @add-to-watchlist="$emit('addToWatchlist')"
        />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
