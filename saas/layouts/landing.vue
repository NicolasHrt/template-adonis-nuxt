<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { useUserStore } from '~/store/user'

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)

const user = useUserStore()

user.refresh()
</script>

<template>
  <div>
    <div class="flex flex-col justify-between min-h-screen">
      <LandingHeader />
      <slot />

      <Footer />
    </div>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </div>
</template>
