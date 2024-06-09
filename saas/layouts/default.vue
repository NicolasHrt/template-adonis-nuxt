<script setup lang="ts">
import { useUserStore } from '~/store/user'
import AppHeader from '~/components/AppHeader.vue'

const userStore = useUserStore()
userStore.refresh()
</script>

<template>
  <div>
    <div class="flex flex-col justify-between min-h-screen">
      <div>
        <AppHeader class="mb-10" />
        <UContainer>
          <slot />
        </UContainer>
      </div>

      <Footer />
    </div>
  </div>
</template>

<style scoped>

</style>
