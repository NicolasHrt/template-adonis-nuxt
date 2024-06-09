<script setup lang="ts">
import { useUserStore } from '~/store/user'

const isDeleting = ref(false)

const user = useUserStore()
</script>

<template>
  <div
    class="transition duration-150 rounded-lg ring-gray-200 ring-1 dark:ring-transparent bg-white dark:bg-gray-800/50 bg-gradient-to-r from-white via-white to-red-400/10 dark:from-gray-800/50 dark:via-gray-800/50 dark:to-red-400/10"
  >
    <div class="border-b border-gray-300 dark:border-gray-700 px-4 sm:px-6 py-6">
      <p class="font-medium text-lg">
        Danger zone
      </p>
      <p class="mt-1 text-sm md:text-base u-text-gray-500">
        Irreversible and destructive actions.
      </p>
    </div>
    <div class="sm:p-6 p-6">
      <UButton
        color="red"
        label="Delete account"
        variant="outline"
        @click="isDeleting = true"
      />
      <UDashboardModal
        v-model="isDeleting"
        title="Delete account"
        description="Are you sure you want to delete your account?"
        icon="i-heroicons-exclamation-circle"
        :ui="{
          icon: { base: 'text-red-500 dark:text-red-400' } as any,
          footer: { base: 'ml-16' } as any
        }"
      >
        <template #footer>
          <UButton
            color="red"
            label="Delete"
            @click="user.deleteUser()"
          />
          <UButton
            color="white"
            label="Cancel"
            @click="isDeleting = false"
          />
        </template>
      </UDashboardModal>
    </div><!---->
  </div>
</template>

<style scoped>

</style>
