<script setup lang="ts">
import { useUserStore } from '~/store/user'

const user = useUserStore()
</script>

<template>
  <div>
    {{ user.data.subscription.status }}
  </div>
</template>

<style scoped>

</style>
