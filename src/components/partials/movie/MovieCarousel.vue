<script setup lang="ts">
import type { MovieDataModel } from '@/models/movie.model'

const props = defineProps<{
  title?: string
  endpoint?: string
  dataList: MovieDataModel[]
}>()

const emit = defineEmits<{
  addToWatchlist: [void]
}>()
</script>

<template>
  <div class="carousel px-5">
    <div class="carousel__header flex justify-between items-center">
      <h2 class="text-xl font-semibold" v-if="title">{{ title }}</h2>

      <!-- see more -->
      <div class="mr-10" v-if="endpoint">
        <RouterLink :to="endpoint" class="text-sm hover:text-[#42b883]">Explore more</RouterLink>
      </div>
    </div>

    <Carousel
      class="relative w-full max-w-[100%] mx-auto mt-5"
      :opts="{
        dragFree: true
      }"
    >
      <CarouselContent>
        <CarouselItem v-for="(data, index) in dataList" :key="index" class="basis-[15%]">
          <div class="p-1">
            <MovieCard :data="data" @add-to-watchlist="$emit('addToWatchlist')" />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
