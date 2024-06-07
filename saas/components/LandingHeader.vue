<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import { useUserStore } from '~/store/user'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [{
  label: 'Docs',
  to: '/docs'
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}]

const userStore = useUserStore()
await userStore.refresh()
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Nuxt UI Pro
      <UBadge
        label="SaaS"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <UColorModeButton />
      <UButton
        v-if="userStore.isLogged"
        to="/app"
        label="Dashboard"
      />
      <div
        v-else
        class="flex gap-1.5"
      >
        <UButton
          label="Sign in"
          color="gray"
          to="/login"
        />
        <UButton
          label="Sign up"
          icon="i-heroicons-arrow-right-20-solid"
          trailing
          color="black"
          to="/signup"
          class="hidden lg:flex"
        />
      </div>
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template>
  </UHeader>
</template>
