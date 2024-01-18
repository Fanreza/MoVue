import type { cn } from '@/lib/utils'; import type { cn } from '@/lib/utils';
<script setup lang="ts">
import { Icon } from '@iconify/vue'

const listLink = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Movie',
    path: '/movie'
  },
  {
    name: 'TV Show',
    path: '/tv-show'
  },
  {
    name: 'Genre',
    path: '/genre'
  }
]
</script>

<template>
  <nav class="bg-[#020817] border-b border-white/15 py-4">
    <div class="navbar flex items-center justify-between w-[50%] mx-auto gap-x-10">
      <div class="logo flex-grow">
        <img src="/logo.png" alt="" class="w-11" />
      </div>

      <div class="nav-list">
        <ul class="flex gap-x-10">
          <li v-for="link in listLink" :key="link.name" class="font-medium text-white/70">
            <router-link :to="link.path" class="hover:text-[#42b883]">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- search bar -->
      <div class="search-bar flex justify-end">
        <RouterLink to="/search">
          <Icon
            icon="material-symbols:search"
            class="text-2xl text-white/70 hover:text-[#42b883]"
          />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply text-[#42b883] font-bold;
}
</style>
