<script setup lang="ts">
import { useAuthStores } from '@/stores/auth.stores'

const authStore = useAuthStores()

const dataMovieWatchlist = ref([])
const getMovieWatchlistLoading = ref(false)
const getMovieWatchlistError = ref<null | string>(null)
const getMovieWatchlist = async () => {
  try {
    const response = await useHttp.get(`/account/${authStore.authData?.id}/watchlist/movies`)
    dataMovieWatchlist.value = response.data.results
  } catch (error) {
    getMovieWatchlistError.value = error as string
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
    getTvWatchlistError.value = error as string
  }
}
onMounted(() => {
  getMovieWatchlist()
  getTvWatchlist()
})
</script>

<template>
  <div>
    <MainNavbar />

    <div class="movie-watchlist p-5 sm:p-10">
      <h2 class="text-xl font-semibold">Your Movie Watchlist</h2>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-5 sm:gap-10 mt-5"
      >
        <template v-if="dataMovieWatchlist">
          <MovieWatchlistCard
            v-for="data in dataMovieWatchlist"
            :data="data"
            @remove-from-watchlist="getMovieWatchlist"
          />
        </template>
      </div>
    </div>

    <div class="tv-watchlist p-5 sm:p-10">
      <h2 class="text-xl font-semibold">Your Tv Watchlist</h2>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-5 sm:gap-10 mt-5"
      >
        <template v-if="dataTvWatchlist">
          <TvWatchlistCard
            v-for="data in dataTvWatchlist"
            :data="data"
            @remove-from-watchlist="getTvWatchlist"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
