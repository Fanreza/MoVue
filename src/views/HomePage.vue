<script setup lang="ts">
import { useAuthStores } from '@/stores/auth.stores'

const authStore = useAuthStores()

const dataMovies = ref([])
const getMovieLoading = ref(false)
const getMovieError = ref<null | string>(null)
const getMovies = async () => {
  try {
    const response = await useHttp.get('/movie/popular')
    dataMovies.value = response.data.results
  } catch (error) {
    getMovieError.value = error as string
  }
}

const dataTvs = ref([])
const getTvLoading = ref(false)
const getTvError = ref<null | string>(null)
const getTvs = async () => {
  try {
    const response = await useHttp.get('/tv/popular')
    dataTvs.value = response.data.results
  } catch (error) {
    getMovieError.value = error as string
  }
}

const dataMovieWatchlist = ref([])
const getMovieWatchlistLoading = ref(false)
const getMovieWatchlistError = ref<null | string>(null)
const getMovieWatchlist = async () => {
  try {
    const response = await useHttp.get(`/account/${authStore.authData?.id}/watchlist/movies`)
    dataMovieWatchlist.value = response.data.results
  } catch (error) {
    getMovieError.value = error as string
  }
}

const dataTvWatchlist = ref([])
const getTvWatchlistLoading = ref(false)
const getTvWatchlistError = ref<null | string>(null)
const getTvWatchlist = async () => {
  try {
    const response = await useHttp.get(`/account/${authStore.authData?.id}/watchlist/tv`)
    dataTvWatchlist.value = response.data.results
  } catch (error) {
    getTvError.value = error as string
  }
}

onMounted(() => {
  getMovies()
  getTvs()
  getMovieWatchlist()
  getTvWatchlist()
})
</script>

<template>
  <div class="">
    <MainNavbar />

    <div class="mt-20">
      <MovieWatchlistCarousel
        title="My Movie Watchlist"
        :data-list="dataMovieWatchlist"
        @remove-from-watchlist="getMovieWatchlist"
      />
    </div>
    <div class="mt-20">
      <TvWatchlistCarousel
        title="My TV Watchlist"
        :data-list="dataTvWatchlist"
        @remove-from-watchlist="getTvWatchlist"
      />
    </div>
    <div class="mt-20">
      <MovieCarousel
        title="Popular Movies"
        endpoint="/movies"
        :data-list="dataMovies"
        @add-to-watchlist="getMovieWatchlist"
      />
    </div>
    <div class="mt-20">
      <TvCarousel
        title="Popular TV Show"
        endpoint="/tv-shows"
        :data-list="dataTvs"
        @add-to-watchlist="getTvWatchlist"
      />
    </div>
  </div>
</template>

<style scoped></style>
