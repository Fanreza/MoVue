<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import type { TvDataModel } from '@/models/tv.model'

const props = defineProps<{
  title?: string
  endpoint?: string
  dataList: TvDataModel[]
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
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-0 relative">
                <img :src="`https://image.tmdb.org/t/p/original/${data.poster_path}`" alt="" />

                <!-- image backdrop -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <!-- recommended badge -->
                <div
                  class="absolute top-0 left-0 z-10 bg-[#42b883] px-2 py-2 flex items-center"
                  v-if="data.vote_average > 8 && data.vote_count > 1000"
                >
                  <span class="text-white text-xs font-semibold"> Recommended </span>
                </div>
              </CardContent>

              <!-- card footer -->
              <CardFooter class="px-2 py-4">
                <div class="flex flex-col mt-5">
                  <h3 class="text-sm font-semibold truncate">{{ data.original_name }}</h3>
                  <p class="text-xs text-gray-400">{{ data.first_air_date }}</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
