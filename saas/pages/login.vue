<script setup lang="ts">
import { useUserStore } from '~/store/user'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login'
})
const userStore = useUserStore()

const state = reactive({
  email: undefined,
  password: undefined
})

const rememberMe = ref(false)

const form = ref()
const error = ref('')

async function onSubmit() {
  form.value.clear()
  error.value = ''
  try {
    // Sign in
    await userStore.signIn(state.email, state.password, rememberMe.value)
    await navigateTo('/app')
  } catch (err: any) {
    if (err.response && err.response.status === 422) {
      // Apply validation
      form.value.setErrors(err.response._data.errors.map((err: any) => ({
        message: err.message,
        path: err.field
      })))
    } else {
      // Invalid credentials
      error.value = err.response._data.errors[0].message
    }
  }
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm mx-auto w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="text-center mb-">
      <p class="text-2xl text-gray-900 dark:text-white font-bold">Welcome back</p>
      <p class="text-gray-500 dark:text-gray-400 mt-1">Don't have an account?
        <NuxtLink
          to="/signup"
          class="text-primary font-medium"
        >Sign up
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
      <UCheckbox
        v-model="rememberMe"
        name="rememberMe"
        label="Remember me"
      />

      <UAlert
        v-if="error"
        color="red"
        icon="i-heroicons-information-circle-20-solid"
        :title="error"
      />
      <UButton
        block
        type="submit"
        class="mt-2"
      >
        Continue
      </UButton>
    </UForm>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">By signing up, you agree to our
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
