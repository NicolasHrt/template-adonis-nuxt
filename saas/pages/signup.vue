<script setup lang="ts">
import { useUserStore } from '~/store/user'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign up'
})
const userStore = useUserStore()

const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined
})

const form = ref()

async function onSubmit() {
  form.value.clear()
  try {
    await userStore.signUp(state)
    await navigateTo('/app')
  } catch (err: any) {
    console.log(err.response)
    if (err.response && err.response.status === 422) {
      form.value.setErrors(err.response._data.errors.map((err: any) => ({
        message: err.message,
        path: err.field
      })))
    }
  }
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm mx-auto w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="text-center mb-">
      <p class="text-2xl text-gray-900 dark:text-white font-bold">Create an account</p>
      <p class="text-gray-500 dark:text-gray-400 mt-1"> Already have an account?
        <NuxtLink
          to="/login"
          class="text-primary font-medium"
        >Login .
        </nuxtlink>
      </p>
    </div>
    <UForm
      ref="form"
      class="max-w-lg mx-auto grid gap-4 mt-6"
      :state="state"
      @submit="onSubmit"
    >
      <UFormGroup
        label="Username"
        name="username"
      >
        <UInput v-model="state.username" />
      </UFormGroup>

      <UFormGroup
        label="Email"
        name="email"
      >
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup
        label="Password"
        name="password"
      >
        <UInput
          v-model="state.password"
          type="password"
        />
      </UFormGroup>

      <UButton
        block
        type="submit"
        class="mt-2"
      >
        Create an account
      </UButton>
    </UForm>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center"> By signing up, you agree to our
      <NuxtLink
        to="/"
        class="text-primary font-medium"
      >Terms
        of Service
      </NuxtLink>
      .
    </p>
  </UCard>
</template>
