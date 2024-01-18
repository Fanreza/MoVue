import { defineStore } from 'pinia'

import type { AuthModel } from '@/models/auth.model'

export const useAuthStores = defineStore('auth', () => {
  const authData = ref<null | AuthModel>(null)

  const getAuthDetail = async () => {
    try {
      const response = await useHttp.get('/account/20929006')

      authData.value = response.data as AuthModel
    } catch (error) {
      console.log(error)
    }
  }

  return { authData, getAuthDetail }
})
