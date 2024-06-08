<script setup lang="ts">
import { useUserStore } from '~/store/user'
import AppHeader from '~/components/AppHeader.vue'

const userStore = useUserStore()
userStore.refresh()
</script>

<template>
  <div>
    <AppHeader class="mb-10" />
    <UMain>
      <UContainer>
        <slot />
      </UContainer>
    </UMain>
  </div>
</template>

<style scoped>

</style>
