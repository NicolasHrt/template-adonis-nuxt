<script setup lang="ts">
import DeleteUserSection from '~/components/Settings/DeleteUserSection.vue'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
</script>

<template>
  <div>
    <div
      class="transition duration-150 rounded-lg ring-gray-200 ring-1 dark:ring-transparent bg-white dark:bg-gray-800/50 mb-8 "
    >
      <div class=" px-4 sm:px-6 py-6">
        <div class="flex items-center gap-6">
          <span class="relative inline-flex items-center justify-center flex-shrink-0 rounded-full h-14 w-14 text-xl"><img
            class="rounded-full h-14 w-14 text-xl"
            src="https://avatars.githubusercontent.com/u/72673830?v=4"
          ><!----></span><div class="truncate">
            <p class="font-semibold text-lg">
              Nico
            </p><p class="text-base u-text-gray-500 truncate">
              @{{ userStore.data.username }} - {{ userStore.data.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <DeleteUserSection />
  </div>
</template>

<style scoped>

</style>
