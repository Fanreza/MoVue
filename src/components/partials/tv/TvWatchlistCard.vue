<script setup lang="ts">
import type { TvWatchlistDataModel } from '@/models/tvWatchlist.model.ts'
import { Icon } from '@iconify/vue'
import { useAuthStores } from '@/stores/auth.stores'
import { toast } from 'vue-sonner'

const props = defineProps<{
  data: TvWatchlistDataModel
}>()

const emit = defineEmits<{
  removeFromWatchlist: [void]
}>()

const authStore = useAuthStores()

const onLoadingWatchlist = ref(false)
const onErrorWatchlist = ref(false)

const handleRemoveFromWatchlist = async (tvId: number) => {
  onLoadingWatchlist.value = true

  try {
    toast.promise(
      useHttp.post(`/account/${authStore.authData?.id}/watchlist`, {
        media_type: 'tv',
        media_id: tvId,
        watchlist: false
      }),
      {
        loading: 'Removing from watchlist...',
        success: (data) => {
          emit('removeFromWatchlist')
          return 'Removed from watchlist!'
        },
        error: (error) => 'Failed to remove from watchlist!'
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
    <CardContent class="flex aspect-square items-center justify-center p-0 relative">
      <img :src="`https://image.tmdb.org/t/p/original/${data.poster_path}`" alt="" />

      <!-- image backdrop -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </CardContent>

    <!-- card footer -->
    <CardFooter class="px-2 py-4">
      <div class="flex justify-between items-center mt-5">
        <div class="details flex flex-col w-[80%]">
          <h3 class="text-sm font-semibold truncate">{{ data.name }}</h3>
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
              <MenubarItem @select="handleRemoveFromWatchlist(data.id)" class="cursor-pointer"
                >Remove from Watchlist</MenubarItem
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
