<script setup lang="ts">
import type { TvDataModel } from '@/models/tv.model'

const dataTv = ref<TvDataModel[] | null>(null)
const getTvLoading = ref(false)
const getTvError = ref<null | string>(null)
const getTv = async () => {
  try {
    const response = await useHttp.get('/discover/tv')
    dataTv.value = response.data.results
  } catch (error) {
    getTvError.value = error as string
  }
}

onMounted(() => {
  getTv()
})
</script>

<template>
  <div>
    <MainNavbar />

    <div class="grid grid-cols-8 gap-10 p-10">
      <template v-if="dataTv">
        <TvCard v-for="data in dataTv" :data="data" @add-to-watchlist="$emit('addToWatchlist')" />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
