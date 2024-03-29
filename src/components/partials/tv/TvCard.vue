<script setup lang="ts">
import type { TvDataModel } from '@/models/tv.model'
import { Icon } from '@iconify/vue'
import { useAuthStores } from '@/stores/auth.stores'
import { toast } from 'vue-sonner'

const props = defineProps<{
  data: TvDataModel
}>()

const emit = defineEmits<{
  addToWatchlist: [void]
}>()

const authStore = useAuthStores()

const onLoadingWatchlist = ref(false)
const onErrorWatchlist = ref(false)

const handleAddToWatchlist = async (movieId: number) => {
  onLoadingWatchlist.value = true

  try {
    toast.promise(
      useHttp.post(`/account/${authStore.authData?.id}/watchlist`, {
        media_type: 'tv',
        media_id: movieId,
        watchlist: true
      }),
      {
        loading: 'Adding to watchlist...',
        success: (data) => {
          emit('addToWatchlist')
          return 'Added to watchlist!'
        },
        error: (error) => 'Failed to add to watchlist!'
      }
    )
  } catch (error) {
    onErrorWatchlist.value = true
  } finally {
    onLoadingWatchlist.value = false
  }
}
</script>

<template>
  <Card>
    <RouterLink :to="`/tv-shows/${data.id}`">
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
    </RouterLink>

    <!-- card footer -->
    <CardFooter class="px-2 py-4">
      <div class="flex justify-between items-center mt-5">
        <div class="details flex flex-col w-[80%]">
          <h3 class="text-sm font-semibold truncate">{{ data.original_name }}</h3>
          <p class="text-xs text-gray-400">{{ data.first_air_date }}</p>
        </div>

        <div class="menu">
          <!-- dot menu -->
          <ActionMenu>
            <template #menu-trigger>
              <MenubarTrigger>
                <Icon
                  icon="bi:three-dots-vertical"
                  class="text-lg hover:text-[#42b883] cursor-pointer"
              /></MenubarTrigger>
            </template>

            <template #menu-content>
              <MenubarItem @select="handleAddToWatchlist(data.id)" class="cursor-pointer"
                >Add to Watchlist</MenubarItem
              >
              <MenubarItem class="opacity-50">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger class="cursor-not-allowed">Add to Favorites</TooltipTrigger>
                    <TooltipContent>
                      <p>Coming soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </MenubarItem>
              <MenubarItem class="opacity-50">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger class="cursor-not-allowed">Rate this</TooltipTrigger>
                    <TooltipContent>
                      <p>Coming soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </MenubarItem>
            </template>
          </ActionMenu>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
