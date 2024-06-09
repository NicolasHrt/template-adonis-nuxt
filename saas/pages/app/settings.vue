<script setup lang="ts">
import DeleteUserSection from '~/components/Settings/DeleteUserSection.vue'
import { useUserStore } from '~/store/user'
import ManageSubscription from '~/components/Settings/ManageSubscription.vue'

const user = useUserStore()
</script>

<template>
  <div>
    <div
      class="transition duration-150 rounded-lg ring-gray-200 ring-1 dark:ring-transparent bg-white dark:bg-gray-800/50 mb-8 "
    >
      <div class="border-b border-gray-300 dark:border-gray-700 px-4 sm:px-6 py-6">
        <div class="flex items-center gap-6">
          <span
            class="relative inline-flex items-center justi
          fy-center flex-shrink-0 rounded-full h-14 w-14 text-xl"
          ><img
            class="rounded-full h-14 w-14 text-xl"
            :src="user.data.avatarUrl"
          ><!----></span>
          <div class="truncate">
            <p class="font-semibold text-lg">
              {{ user.data.name }}
            </p>
            <p class="text-base text-gray-500 dark:text-gray-400 truncate">
              {{ user.data.email }}
            </p>
          </div>
        </div>
      </div>
      <ManageSubscription />
    </div>
    <DeleteUserSection />
  </div>
</template>

<style scoped>

</style>
