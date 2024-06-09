<script setup lang="ts">
import { useUserStore } from '~/store/user'

const user = useUserStore()
</script>

<template>
  <div>
    <p>{{ user.data.id }}</p>
  </div>
</template>

<style scoped>

</style>
