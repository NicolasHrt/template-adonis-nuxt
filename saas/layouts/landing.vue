<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

import { useUserStore } from '~/store/user'

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)

const userStore = useUserStore()
userStore.refresh()
</script>

<template>
  <div>
    <LandingHeader />
    <UMain>
      <slot />
    </UMain>

    <LandingFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </div>
</template>
