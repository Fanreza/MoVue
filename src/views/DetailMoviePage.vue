<script setup lang="ts">
import type { DetailMovieModel } from '@/models/detailMovie.model'
const route = useRoute()

const dataDetailMovie = ref<DetailMovieModel | null>(null)
const onLoadingDataDetailMovie = ref(false)
const onErrorDataDetailMovie = ref<null | string>(null)
const getDetailMovie = async () => {
  onLoadingDataDetailMovie.value = true
  try {
    const response = await useHttp.get(`/movie/${route.params.id}`)
    dataDetailMovie.value = response.data
  } catch (error) {
    onErrorDataDetailMovie.value = error as string
  } finally {
    onLoadingDataDetailMovie.value = false
  }
}

onMounted(() => {
  getDetailMovie()
})
</script>

<template>
  <div class="pb-10">
    <MainNavbar />

    <div
      class="flex flex-col md:flex-row items-center justify-center mx-auto w-[80%] 2xl:w-[50%] mt-20 gap-x-20"
      v-if="dataDetailMovie"
    >
      <div class="image w-[300px]">
        <img
          :src="`https://image.tmdb.org/t/p/original/${dataDetailMovie?.poster_path}`"
          alt=""
          class="w-full rounded-lg"
        />
      </div>

      <div class="details w-[80%]">
        <h1 class="text-3xl font-bold text-center md:text-left">{{ dataDetailMovie?.title }}</h1>
        <p class="text-base mt-5 text-center md:text-left">{{ dataDetailMovie?.overview }}</p>

        <div class="text-sm opacity-80 mt-10">
          <ul
            class="grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-5 md:gap-3 items-center"
          >
            <div>Released</div>
            <div>{{ dataDetailMovie.release_date }}</div>
            <div>Runtime</div>
            <div>{{ dataDetailMovie.runtime }} minutes</div>

            <div class="my-4">Genre</div>

            <div class="flex flex-wrap gap-1">
              <RouterLink
                v-for="genre in dataDetailMovie.genres"
                :to="`/genre/${genre.id}/movie`"
                class="bg-slate-800 hover:bg-slate-900 p-2.5 rounded text-xs"
                >{{ genre.name }}
              </RouterLink>
            </div>

            <div>Status</div>
            <div>{{ dataDetailMovie.status }}</div>
            <div>Language</div>
            <div>{{ dataDetailMovie.original_language }}</div>
            <div>Production</div>
            <div>
              <span v-for="production in dataDetailMovie.production_companies">
                {{ production.name }},
              </span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
