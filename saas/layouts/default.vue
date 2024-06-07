<script setup lang="ts">
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
userStore.refresh()
</script>

<template>
  <div>
    <h1 class="text-center text-5xl font-bold">
      Test
    </h1>

    <slot />
  </div>
</template>

<style scoped>

</style>
