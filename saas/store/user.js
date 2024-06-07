import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    isLogged: false,
    data: {
      username: null,
      email: null
    }
  }), actions: {
    async refresh() {
      const headers = useRequestHeaders(['cookie'])

      try {
        const { data: response } = await useFetch('http://localhost:3333/auth', {
          headers, credentials: 'include'
        })
        this.data.username = response.value.username
        this.data.email = response.value.email
        this.isLogged = true
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        this.isLogged = false
      }
    },

    async logOut() {
      await $fetch('http://localhost:3333/auth/sign-out', {
        method: 'POST', credentials: 'include'
      })
      this.isLogged = false
    },

    async signUp(user) {
      await $fetch('http://localhost:3333/auth/sign-up', {
        method: 'POST', body: user, credentials: 'include' // Permet d'inclure les cookies dans la requête
      })
      await this.refresh()
    },

    async signIn(email, password) {
      await $fetch('http://localhost:3333/auth/sign-in',
        {
          method: 'POST', body:
            {
              email: email,
              password: password
            }, credentials: 'include' // Permet d'inclure les cookies dans la requête
        })
      await this.refresh()
    }

  }
})
