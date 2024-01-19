<script setup lang="ts">
import type { SearchModel, SearchDataModel } from '@/models/search.model'
import { useDebounceFn } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const searchString = ref((route.query.query as string) || '')

const searchData = ref<SearchDataModel[] | null>(null)

const handleSearch = useDebounceFn(async (value: string) => {
  searchString.value = value
  if (value.length > 0) {
    const response = await useHttp.get<SearchModel>('/search/multi', {
      params: {
        query: value
      }
    })
    searchData.value = response.data.results

    router.push({
      query: {
        query: value
      }
    })
  } else {
    searchData.value = null
  }
}, 500)

onMounted(() => {
  handleSearch(searchString.value)
})
</script>

<template>
  <div>
    <div>
      <MainNavbar />

      <div class="search-content p-10">
        <div class="searchbar mx-auto w-[90%] sm:w-[80%] md:w-[50%]">
          <!-- search bar -->
          <p>You search : {{ searchString }}</p>
          <Input
            class="mt-2"
            placeholder="Search movie, tv, people"
            @input="handleSearch($event.target.value)"
            :model-value="searchString"
          />
        </div>

        <div
          class="search-result grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-5 p-5 sm:gap-10 sm:p-10"
        >
          <div class="search-result__item" v-for="item in searchData" :key="item.id">
            <SearchCard :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
