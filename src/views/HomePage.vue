<script setup lang="ts">
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

const dataWatchlist = ref([])
const getWatchlistLoading = ref(false)
const getWatchlistError = ref<null | string>(null)
const getWatchlist = async () => {
  try {
    const response = await useHttp.get('/discover/movie')
    dataWatchlist.value = response.data.results
  } catch (error) {
    getMovieError.value = error as string
  }
}

onMounted(() => {
  getMovies()
  getTvs()
  getWatchlist()
})
</script>

<template>
  <div>
    <MainNavbar />

    <div class="mt-20">
      <ListCarousel
        title="My Watchlist"
        endpoint="/movies?filter=popular"
        :data-list="dataWatchlist"
      />
    </div>
    <div class="mt-20">
      <ListCarousel
        title="Popular Movies"
        endpoint="/movies?filter=popular"
        :data-list="dataMovies"
      />
    </div>
    <div class="mt-20">
      <ListCarousel
        title="Popular TV Show"
        endpoint="/movies?filter=popular"
        :data-list="dataTvs"
      />
    </div>
  </div>
</template>

<style scoped></style>
