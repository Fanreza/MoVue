import { defineStore } from 'pinia'

import type { AuthModel } from '@/models/auth.model'

export const useAuthStores = defineStore('auth', () => {
  const authData = ref<null | AuthModel>(null)

  const getAuthDetail = async () => {
    try {
      const response: AuthModel = await useHttp.get('/account/20929006')

      authData.value = response
    } catch (error) {
      console.log(error)
    }
  }

  return { authData, getAuthDetail }
})
