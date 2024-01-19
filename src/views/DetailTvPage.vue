<script setup lang="ts">
import type { DetailTvModel } from '@/models/detailTv.model'
const route = useRoute()

const dataDetailTv = ref<DetailTvModel | null>(null)
const onLoadingdataDetailTv = ref(false)
const onErrordataDetailTv = ref<null | string>(null)
const getDetailTv = async () => {
  onLoadingdataDetailTv.value = true
  try {
    const response = await useHttp.get(`/tv/${route.params.id}`)
    dataDetailTv.value = response.data
  } catch (error) {
    onErrordataDetailTv.value = error as string
  } finally {
    onLoadingdataDetailTv.value = false
  }
}

onMounted(() => {
  getDetailTv()
})
</script>

<template>
  <div>
    <MainNavbar />

    <div
      class="flex flex-col md:flex-row items-center justify-center mx-auto w-[80%] 2xl:w-[50%] mt-20 gap-x-20"
      v-if="dataDetailTv"
    >
      <div class="image w-[300px]">
        <img
          :src="`https://image.tmdb.org/t/p/original/${dataDetailTv?.poster_path}`"
          alt=""
          class="rounded-lg"
        />
      </div>

      <div class="details w-[80%]">
        <h1 class="text-3xl font-bold text-center md:text-left">{{ dataDetailTv?.name }}</h1>
        <p class="text-base mt-5 text-center md:text-left">{{ dataDetailTv?.overview }}</p>

        <div class="text-sm opacity-80 mt-10">
          <ul
            class="grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-5 md:gap-3 items-center"
          >
            <div>First Air Date</div>
            <div>{{ dataDetailTv.first_air_date }}</div>

            <div class="my-4">Genre</div>

            <div class="flex flex-wrap gap-1">
              <RouterLink
                v-for="genre in dataDetailTv.genres"
                :to="`/genre/${genre.id}/movie`"
                class="bg-slate-800 hover:bg-slate-900 p-2.5 rounded text-xs"
                >{{ genre.name }}
              </RouterLink>
            </div>

            <div>Status</div>
            <div>{{ dataDetailTv.status }}</div>
            <div>Language</div>
            <div>{{ dataDetailTv.original_language }}</div>
            <div>Production</div>
            <div>
              <span v-for="production in dataDetailTv.production_companies">
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
