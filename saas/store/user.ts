import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    isLogged: false,
    data: {
      id: null,
      username: null,
      email: null,
      createdAt: null,
      updatedAt: null
    }
  }), actions: {
    async refresh() {
      const headers = useRequestHeaders(['cookie'])
      const { data: response, status: status }: { data: any, status: any } = await useFetch('http://localhost:3333/auth', {
        headers, credentials: 'include'
      })
      if (status.value === 'error') {
        this.isLogged = false
        return
      }
      this.data = response.value
      this.isLogged = true
    },

    async logOut() {
      await $fetch('http://localhost:3333/auth/sign-out', {
        method: 'POST', credentials: 'include'
      })
      this.isLogged = false
      await navigateTo('/')
    },

    async signUp(user: object) {
      await $fetch('http://localhost:3333/auth/sign-up', {
        method: 'POST', body: user, credentials: 'include' // Permet d'inclure les cookies dans la requête
      })
      await this.refresh()
    },

    async signIn(email: string, password: string, rememberMe: boolean) {
      await $fetch('http://localhost:3333/auth/sign-in',
        {
          method: 'POST', body:
            {
              email: email,
              password: password,
              remember_me: rememberMe
            }, credentials: 'include' // Permet d'inclure les cookies dans la requête
        })
      await this.refresh()
    },

    async deleteUser() {
      await $fetch('http://localhost:3333/auth/delete', {
        method: 'DELETE', credentials: 'include'
      })
      this.isLogged = false
      await navigateTo('/')
    }
  }
})
