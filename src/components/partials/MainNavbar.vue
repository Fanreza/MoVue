<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

const listLink = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Movie',
    path: '/movies'
  },
  {
    name: 'TV Show',
    path: '/tv-shows'
  },
  {
    name: 'Watchlist',
    path: '/watchlist'
  }
]
</script>

<template>
  <nav class="bg-[#020817] border-b border-white/15 py-4">
    <div class="navbar flex items-center justify-between w-[80%] xl:w-[50%] mx-auto gap-x-10">
      <div class="logo flex-grow">
        <RouterLink to="/">
          <img src="/logo.png" alt="" class="w-11" />
        </RouterLink>
      </div>

      <div class="nav-list sm:block hidden">
        <ul class="flex gap-x-10">
          <li v-for="link in listLink" :key="link.name" class="font-medium text-white/70">
            <router-link :to="link.path" class="hover:text-[#42b883]">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- search bar -->
      <div class="search-bar sm:flex justify-end hidden">
        <RouterLink to="/search">
          <Icon
            icon="material-symbols:search"
            class="text-2xl text-white/70 hover:text-[#42b883]"
          />
        </RouterLink>
      </div>

      <!-- Mobile Sheet Nav -->
      <Sheet class="sm:hidden" v-if="width < 640">
        <SheetTrigger class="sm:hidden">
          <Icon icon="mingcute:menu-fill" class="text-2xl" />
        </SheetTrigger>
        <SheetContent side="bottom" class="sm:hidden">
          <SheetHeader>
            <SheetDescription>
              <ul class="flex flex-col gap-y-5">
                <li
                  v-for="link in listLink"
                  :key="link.name"
                  class="font-medium text-white/70 text-lg"
                >
                  <router-link :to="link.path" class="hover:text-[#42b883]">
                    {{ link.name }}
                  </router-link>
                </li>
              </ul>

              <!-- search bar -->
              <div class="search-bar flex justify-center mt-5">
                <RouterLink to="/search">
                  <Icon
                    icon="material-symbols:search"
                    class="text-2xl text-white/70 hover:text-[#42b883]"
                  />
                </RouterLink>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  </nav>
</template>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply text-[#42b883] font-bold;
}

.router-link-active {
  @apply text-[#42b883] font-bold;
}
</style>
