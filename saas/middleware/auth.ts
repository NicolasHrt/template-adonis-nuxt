import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  if (!userStore.isLogged) {
    return navigateTo('/login')
  }
})
